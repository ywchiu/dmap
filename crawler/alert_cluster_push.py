# -*- coding: utf-8 -*-
from peewee_read import webapp_ptt_main, webapp_ptt_push, webapp_news_main, webapp_news_push, webapp_facebook_main, webapp_facebook_push
from peewee_write import webapp_alert_log
from datetime import date, datetime, timedelta
import pytz
FROMTZ =  pytz.timezone('Asia/Taipei')
import jieba.analyse
import jieba
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import DBSCAN
import os
from path_settings import BASE_PATH, DIC_PATH
# setting SMTP
from smtplib import SMTP
from email.mime.text import MIMEText

class Alert_push(object):

    def __init__(self):
        jieba.set_dictionary(os.path.join(DIC_PATH,"dictbig.txt"))
        jieba.load_userdict(os.path.join(DIC_PATH,"dictionary.txt"))
        self.titles_ptt= []
        self.urls_ptt = []
        self.contents_ptt = []
        self.titles_news= []
        self.urls_news = []
        self.contents_news = []
        self.titles_facebook= []
        self.urls_facebook = []
        self.contents_facebook = []
        self.difftime = 3600
        self.totm = int(datetime.now().strftime('%s'))
        self.fromtm = self.totm - self.difftime
        self.fromdt =  datetime.fromtimestamp(\
                                               self.fromtm,FROMTZ\
                                             ).strftime('%Y-%m-%d %H:%M') 
        self.todt = datetime.fromtimestamp(\
                                           self.totm,FROMTZ\
                                           ).strftime('%Y-%m-%d %H:%M')

    def getCorpus(self):
        corpus_ptt = []
        wpm = webapp_ptt_main\
            .select(\
                    webapp_ptt_main.url,\
                    webapp_ptt_main.title,\
                    webapp_ptt_main.content\
                   )\
            .where(\
                    webapp_ptt_main.tm >= self.fromtm,\
                    webapp_ptt_main.tm < self.totm\
                  )
        for elem in wpm:
            title = elem.title.encode('utf-8')
            description = elem.content.encode('utf-8')
            self.urls_ptt.append(elem.url)
            self.titles_ptt.append(title)
            self.contents_ptt.append(description)
            keywords = ' '.join(jieba.analyse.extract_tags(description, 20))
            corpus_ptt.append(' '.join(jieba.analyse.extract_tags(keywords, 20,\
                          allowPOS=('ns','vn','nr','nt','nz','an','n'))))

        corpus_news = []
        wnm = webapp_news_main\
            .select(\
                    webapp_news_main.url,\
                    webapp_news_main.title,\
                    webapp_news_main.content\
                   )\
            .where(\
                    webapp_news_main.tm >= self.fromtm,\
                    webapp_news_main.tm < self.totm\
                  )
        for elem in wnm:
            title = elem.title.encode('utf-8')
            description = elem.content.encode('utf-8')
            self.urls_news.append(elem.url.encode('utf-8'))
            self.titles_news.append(title)
            self.contents_news.append(description)
            keywords = ' '.join(jieba.analyse.extract_tags(description, 20))
            corpus_news.append(' '.join(jieba.analyse.extract_tags(keywords, 20,\
                          allowPOS=('ns','vn','nr','nt','nz','an','n'))))

        corpus_facebook = []
        wfm = webapp_facebook_main\
            .select(\
                    webapp_facebook_main.url,\
                    webapp_facebook_main.content\
                   )\
            .where(\
                    webapp_facebook_main.tm >= self.fromtm,\
                    webapp_facebook_main.tm < self.totm\
                  )
        for elem in wfm:
            description = elem.content.encode('utf-8')
            title = description.decode('utf-8')[:40].encode('utf-8') + '...' 
            self.urls_facebook.append(elem.url)
            self.titles_facebook.append(title)
            self.contents_facebook.append(description)
            keywords = ' '.join(jieba.analyse.extract_tags(description, 20))
            corpus_facebook.append(' '.join(jieba.analyse.extract_tags(keywords, 20,\
                          allowPOS=('ns','vn','nr','nt','nz','an','n'))))
        return corpus_ptt,corpus_news,corpus_facebook

    def getCluster(self, corpus):
        vectorizer = TfidfVectorizer()
        tfidf  = vectorizer.fit_transform(corpus)
        word   = vectorizer.get_feature_names()
        weight = tfidf.toarray()
        db = DBSCAN(eps=0.3, min_samples=2)
        db_data = db.fit_predict(weight)
        print db_data
        return db_data

    def create_text(self, db_data, urls, titles, source):
        groups = {} 
        for id, index in enumerate(db_data): 
            if index not in groups:
                groups[index] = ['<a href="{0}">{1}</a>'.\
                                 format(urls[id],titles[id])]
            else:
                groups[index].append(\
                                      '<a href="{0}">{1}</a>'.\
                                      format(urls[id],titles[id])
                                    )
        text = '<h1>來源: {}</h1>'.format(source)
        for i,g in enumerate(groups):
            text += '<h3>第 {} 群</h3>'.format(i+1)
            for t in groups[g]:
                text += '{}<br>'.format(t)
            text += '<p></p>'
        return text 

    def sendMsg(self,text):
        if text is not None:
            SMTPserver = 'smtp.gmail.com'
            sender = 'ilovelargitdata@gmail.com'
            #recipients = ['david@largitdata.com', 'jojotenya@largitdata.com']
            recipients = ['jojotenya@largitdata.com']
            USER = "ilovelargitdata@gmail.com"
            PASSWORD = "ASUS8888"
            debuglevel = 0
            smtp = SMTP(SMTPserver,587)
            smtp.set_debuglevel(debuglevel)
            smtp.starttls()
            smtp.ehlo()
            smtp.login(USER, PASSWORD)
            msg = MIMEText(text,'html')
            msg['Subject'] = "[議題分群] {0} ~ {1} ".format(self.fromdt, self.todt)
            msg['From'] = sender
            msg['To'] = ", ".join(recipients)
            smtp.sendmail(sender, recipients, msg.as_string())
            #print text
        else:
            print 'None'
            pass

    def save_log(self,text):
        wal = webapp_alert_log.create(\
            log = text,\
            category = 'cluster',\
            created_time = datetime.strptime(self.todt,'%Y-%m-%d %H:%M')\
            )

def main():
    alerts = Alert_push() 
    corpus_ptt,corpus_news,corpus_facebook = alerts.getCorpus() 
    cluster_ptt = alerts.getCluster(corpus_ptt)
    #cluster_news = alerts.getCluster(corpus_news)
    #cluster_facebook = alerts.getCluster(corpus_facebook)
    text_ptt = alerts.create_text(cluster_ptt,alerts.urls_ptt,alerts.titles_ptt,'ptt')
    #text_news = alerts.create_text(cluster_news,alerts.urls_news,alerts.titles_news,'news')
    #text_facebook = alerts.create_text(cluster_facebook,alerts.urls_facebook,alerts.titles_facebook,'facebook')
    alerts.sendMsg(text_ptt)
    #alerts.sendMsg(text_news)
    #alerts.sendMsg(text_facebook)
    #alerts.save_log(text_ptt)
    #alerts.save_log(text_news)
    #alerts.save_log(text_facebook)

main()
    
