# -*- coding: utf-8 -*-
from peewee_read import webapp_ptt_main, webapp_ptt_push, webapp_news_main, webapp_news_push, webapp_facebook_main, webapp_facebook_push, webapp_alert_settings
from peewee import fn, DoesNotExist
from playhouse.shortcuts import case

# datetime
from datetime import datetime, time
import pytz

# setting SMTP
from smtplib import SMTP
from email.mime.text import MIMEText

# other packages
import types
import json

# attributes
FROMTZ =  pytz.timezone('Asia/Taipei')
was = webapp_alert_settings.select()
for w in was:
    vars()[w.key] = w.value    

def alert_ptt(difftime,criteria,count_by):
    criteria = int(criteria)
    difftime = int(difftime)*60
    totm = datetime.now().strftime('%s')
    todt = datetime.fromtimestamp(\
                int(totm),FROMTZ\
            ).strftime('%Y-%m-%d %H:%M:%S')
    fromtm = int(totm) - difftime
    fromdt = datetime.fromtimestamp(\
                fromtm,FROMTZ\
            ).strftime('%Y-%m-%d %H:%M:%S')
    wpp = webapp_ptt_push\
              .select(\
                  webapp_ptt_push.url,\
                  webapp_ptt_main.title,\
                  webapp_ptt_main.date,\
                  fn.sum(case(webapp_ptt_push.pushtype,((u'推',1),(None,0)),0)).alias('like'),\
                  fn.sum(case(webapp_ptt_push.pushtype,((u'→',1),(None,0)),0)).alias('comment'),\
                  fn.sum(case(webapp_ptt_push.pushtype,((u'噓',1),(None,0)),0)).alias('dislike')\
                     )\
              .join(\
                  webapp_ptt_main,\
                  on = (webapp_ptt_push.url == webapp_ptt_main.url)\
                    )\
              .where(\
                  webapp_ptt_main.tm > fromtm,\
                  webapp_ptt_push.tm > fromtm,\
                    )\
              .group_by(\
                  webapp_ptt_push.url,\
                  webapp_ptt_main.title,\
                  webapp_ptt_push.pushtype,\
                  webapp_ptt_main.date\
                       )\
              .naive()
    dic = {}
    alert_list = list()
    for w in wpp:
        url = w.url
        dic[url] = {\
                      'like':w.like,\
                      'comment':w.comment,\
                      'dislike':w.dislike,\
                      'title':w.title,\
                      #'date':w.date.strftime('%Y-%m-%d %H:%M:%S')\
                      'date':fromdt + ' 至 ' + todt \
                    }
        record = dic[url]
        if count_by == 'all':
            cnt = record['like']+record['comment']+record['dislike']
        if cnt >= criteria:
            alert_list.append(url)
    alert_list = set(alert_list)
    result_dic = {}
    if len(alert_list) == 0:
        return None
    else:
        for url in alert_list:
            result_dic[url] = dic[url]
        return result_dic

def alert_news(difftime,criteria,count_by):
    criteria = int(criteria)
    difftime = int(difftime)*60
    totm = datetime.now().strftime('%s')
    todt = datetime.fromtimestamp(\
                int(totm),FROMTZ\
            ).strftime('%Y-%m-%d %H:%M:%S')
    fromtm = int(totm) - difftime
    fromdt = datetime.fromtimestamp(\
                fromtm,FROMTZ\
            ).strftime('%Y-%m-%d %H:%M:%S')
    wnp = webapp_news_push\
              .select(\
                  webapp_news_push.url,\
                  webapp_news_main.title,\
                  webapp_news_main.date,\
                  fn.count(1).alias('counts')
                     )\
              .join(\
                  webapp_news_main,\
                  on = (webapp_news_push.url == webapp_news_main.url)\
                    )\
              .where(\
                  webapp_news_main.tm > fromtm,\
                  webapp_news_push.tm > fromtm,\
                    )\
              .group_by(\
                  webapp_news_push.url,\
                  webapp_news_main.title,\
                  webapp_news_main.date\
                       )\
              .naive()
    dic = {}
    alert_list = list()
    for w in wnp:
        url = w.url
        dic[url] = {\
                      'counts':w.counts,\
                      'title':w.title,\
                      #'date':w.date.strftime('%Y-%m-%d %H:%M:%S')\
                      'date':fromdt + ' 至 ' + todt \
                    }
        record = dic[url]
        if count_by == 'comments':
            cnt = record['counts']
        if cnt >= criteria:
            alert_list.append(url)
    alert_list = set(alert_list)
    result_dic = {}
    if len(alert_list) == 0:
        return None
    else:
        for url in alert_list:
            result_dic[url] = dic[url]
        return result_dic

def alert_facebook(difftime,criteria,count_by):
    criteria = int(criteria)
    difftime = int(difftime)*60
    totm = datetime.now().strftime('%s')
    todt = datetime.fromtimestamp(\
                int(totm),FROMTZ\
            ).strftime('%Y-%m-%d %H:%M:%S')
    fromtm = int(totm) - difftime
    fromdt = datetime.fromtimestamp(\
                fromtm,FROMTZ\
            ).strftime('%Y-%m-%d %H:%M:%S')
    wfm = webapp_facebook_main\
              .select(\
                  webapp_facebook_main.content,\
                  webapp_facebook_main.url,\
                  webapp_facebook_main.date,\
                  fn.count(1).alias('counts')
                     )\
              .join(\
                  webapp_facebook_push,\
                  on = (webapp_facebook_push.url == webapp_facebook_main.url)\
                    )\
              .where(\
                  webapp_facebook_main.tm > fromtm,\
                    )\
              .group_by(\
                  webapp_facebook_main.content,\
                  webapp_facebook_main.url,\
                  webapp_facebook_main.date,\
                       )\
              .naive()
    dic = {}
    alert_list = list()
    for w in wfm:
        url = w.url
        dic[url] = {\
                      'title':''.join(w.content[:40].split('\n')).strip()+ '...',\
                      'counts':w.counts,\
                      #'date':w.date.strftime('%Y-%m-%d %H:%M:%S')\
                      'date':fromdt + ' 至 ' + todt \
                    }
        record = dic[url]
        if count_by == 'comments':
            cnt = record['counts']
        if cnt >= criteria:
            alert_list.append(url)
    alert_list = set(alert_list)
    result_dic = {}
    if len(alert_list) == 0:
        return None
    else:
        for url in alert_list:
            result_dic[url] = dic[url]
        return result_dic

def create_content(records,difftime,criteria,source):
    difftime = int(difftime)*60
    criteria = int(criteria)
    if records is None:
        print 'nothing to alert'
        return None
    else:
        if source == 'ptt':
            text_list = [\
                         '觀察來源: {0}'.format(source),\
                         '觀察區間: {0}分鐘'.format(difftime/60),\
                         'Criteria: 總討論數 {0}則'.format(criteria),\
                         '=========================',\
                         '\n'
                        ]    
            for url,record in records.items():
                text = '{0}\n{1}\n{2}\n{3}:{4};  {5}:{6};  {7}:{8}\n\n'.format(\
                    record['title'].encode('utf-8'),\
                    url,\
                    record['date'],\
                    '新增推數',record['like'],\
                    "新增'→'數",record['comment'],\
                    '新增噓數', record['dislike']\
                    )
                text_list.append(text)
        elif source == 'news':
            text_list = [\
                         '觀察來源: {0}'.format(source),\
                         '觀察區間: {0}分鐘'.format(difftime/60),\
                         'Criteria: 總評論數 {0}則'.format(criteria),\
                         '=========================',\
                         '\n'
                        ]
            for url,record in records.items():
                text = '{0}\n{1}\n{2}\n{3}:{4}\n\n'.format(\
                    record['title'].encode('utf-8'),\
                    url.encode('utf-8'),\
                    record['date'],\
                    '新增評論數',record['counts'],\
                    )
                text_list.append(text)
        elif source == 'facebook':
            text_list = [\
                         '觀察來源: {0}'.format(source),\
                         '觀察區間: {0}分鐘'.format(difftime/60),\
                         'Criteria: 總評論數 {0}則'.format(criteria),\
                         '=========================',\
                         '\n'
                        ]
            for url,record in records.items():
                text = '{0}\n{1}\n{2}\n{3}:{4}\n\n'.format(\
                    record['title'].encode('utf-8'),\
                    url.encode('utf-8'),\
                    record['date'],\
                    '新增評論數',record['counts'],\
                    )
                text_list.append(text)
        return '\n'.join(text for text in text_list)
    
def sendMsg(text,source):
    if text is not None:
        SMTPserver = 'smtp.gmail.com'
        sender = 'ilovelargitdata@gmail.com'
        recipients = ['david@largitdata.com', 'jojotenya@largitdata.com']
        USER = "ilovelargitdata@gmail.com"
        PASSWORD = "ASUS8888"
        debuglevel = 0
        smtp = SMTP(SMTPserver,587)
        smtp.set_debuglevel(debuglevel)
        smtp.starttls()
        smtp.ehlo()
        smtp.login(USER, PASSWORD)
        msg = MIMEText(text)
        msg['Subject'] = "[輿情警報系統] {0} 警報提示".format(source)
        msg['From'] = sender
        msg['To'] = ", ".join(recipients)
        smtp.sendmail(sender, recipients, msg.as_string())
        #print text 
    else:
        print 'None'
        pass

ptts = alert_ptt(difftime_ptt,criteria_ptt,count_by_ptt)
news = alert_news(difftime_news,criteria_news,count_by_news)
fbs = alert_facebook(difftime_facebook,criteria_facebook,count_by_facebook)
text_ptt = create_content(ptts,difftime_ptt,criteria_ptt,'ptt')
text_news = create_content(news,difftime_news,criteria_news,'news')
text_facebook = create_content(fbs,difftime_facebook,criteria_facebook,'facebook')
sendMsg(text_ptt,'ptt')
sendMsg(text_news,'news')
sendMsg(text_facebook,'facebook')


