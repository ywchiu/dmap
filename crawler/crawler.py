# -*- coding: utf-8 -*-
import requests
import json
import sys
import logging
import time
import psycopg2
import  peewee
import urllib
from peewee import fn
from model import webapp_crawl_config, webapp_board_keyword, webapp_keygrp, webapp_keyword
from model import webapp_job_queues, webapp_job_batch, webapp_ptt_main, webapp_ptt_push, webapp_keyword_match, webapp_keyword_stat, webapp_alert_email, psql_db
import ahocorasick
from datetime import datetime, timedelta
from bs4 import BeautifulSoup
import re
import os
import traceback
import pytz
from datetime import datetime,date
import dateutil.parser as dateparser
from peewee import DoesNotExist

# path settings
from path_settings import BASE_PATH,DIC_PATH

class StopException(Exception):
    pass

class crawler(object):
    def __init__(self):
        self.FROMTZ =  pytz.timezone('Asia/Taipei')
        self.TOTZ =  pytz.timezone('Asia/Taipei')
        self.ptt_domain = 'https://www.ptt.cc'
        self.PTTBOARD = []
        self.KEYWORD = []
        self.SESSION_DIC = {}
        self.tree = [] 
        
        self.setup_ptt_board()

    def setup_ptt_board(self):
        for board in ['Gossiping','HatePolitics','BabyMother','PublicIssue','Tainan']:
            self.PTTBOARD.append(board)

    def setup_keyword(self, board_type):
        config_list = webapp_keyword.select(fn.Distinct(webapp_keyword.keyword).alias('keyword'))
        for config in config_list:
            self.KEYWORD.append(config.keyword)
            self.tree.add(config.keyword.encode('utf-8'))
        for kw in ['疫情', '流感', 'A肝', 'A型肝炎', '登革熱', '腸病毒']:
            self.tree.append(kw)
    

    # get ptt session for 18 age
    def get_ptt_session(self, url):
        payload = {'from':'/bbs' + url.split('/bbs')[1],'yes':'yes'}
        rs = requests.session()
        response = rs.post('https://www.ptt.cc/ask/over18', \
                      data=payload, verify=False)
        return rs
    
    def get_max_batch(self, source):
        max_id = webapp_job_batch.select(fn.Max(webapp_job_batch.id).alias('max')).where(webapp_job_batch.crawler_source == source )
        if (max_id[0].max is None):
            return 1
        else:
            return max_id[0].max + 1

    # get link page from index page
    def get_link_session(self):
        link_urls = []
        content_urls = []
        max_id = self.get_max_batch('ptt')
        dt  = webapp_job_batch.get_or_create(\
              create_time = datetime.now(),crawler_source='ptt')
        batch_id = dt.id 
        for board in self.PTTBOARD:
            index_url = 'https://www.ptt.cc/bbs/%s/index.html'%(board)
            rs = requests.session()
            rs.mount("http://", requests.adapters.HTTPAdapter(max_retries=3))
            rs.mount("https://", requests.adapters.HTTPAdapter(max_retries=3))

            response = rs.get(index_url, verify=False)
            soup = BeautifulSoup(response.text)
            if (len(soup.select('button')) > 0):
                rs = self.get_ptt_session(index_url)
            self.SESSION_DIC[board] = rs
            jq  = webapp_job_queues.create(\
                 url_link = index_url,\
                 job_status = 'c',\
                 board = board,\
                 source = 'ptt',\
                 batch_id = batch_id)
        return batch_id

    # retrieve link of each ptt board
    def crawl_ptt_link(self, batch_id):
        for board in self.PTTBOARD:
            try: 
                self.process_ptt_index_page(board, batch_id)
            except StopException:
                continue

    def reconnect_page(self,board):
        url = 'https://www.ptt.cc/bbs/%s/index.html'%(board)
        response = self.SESSION_DIC[board].get(url, verify=False)
        soup = BeautifulSoup(response.text)
        last_page = 1 
        for i in range(1,5): 
            if len(soup.select('.wide')) > 0: 
                page_info = soup.select('.wide')[1]['href']
                m = re.search('index(\d+).html', page_info)
                if m:
                    last_page = int(m.group(1)) + 1
                break
            else:
                time.sleep(0.1)
                response = self.SESSION_DIC[board].get(url, verify=False)
                soup = BeautifulSoup(response.text)
        return soup, last_page


    def process_ptt_content_page(self, board, response, batch_id, last):
        soup = BeautifulSoup(response.text)

        content_link = []
        for alink in soup.select('.r-ent a')[::-1]:
            if alink.has_attr('href'):
                link = self.ptt_domain + alink['href']
                #print link
                res = self.SESSION_DIC[board].get(link, verify=False) 
                time.sleep(0.1)
                getptt = self.process_ptt_content(res, board)
                if 'url' in getptt:
                    content_link.append(getptt)
                if 'time' in getptt:
                    t = getptt['time']
                else:
                    t = datetime.now().today()
                if (datetime.now().today() - t).days >= 1 and \
                   last == False :
                    raise StopException   
        return content_link

    def ptt_push_generator(self, dt, response, pushs):
        for push in pushs:
            if len(push.select('span')) == 4:
                tm = int(self.pttTimeProcess(\
                 push.select('span')[3].text.encode('utf-8'), dt)[1])
                pushdate = str(datetime.fromtimestamp(tm))
                #print response.url,pushdate,tm
                yield {'url':response.url, \
                       'pushtype'   :push.select('span')[0].text.encode('utf-8').strip(), \
                       'pushauthor' :push.select('span')[1].text.encode('utf-8'), \
                       'pushcontent':push.select('span')[2].text.encode('utf-8'), \
                       #'pushdate'   :pushdate, \
                       'tm'         :tm}

    def process_ptt_content(self, response, board):
        #print response.url
        return_dic = {} 
        author  = None
        tile    = None
        dt = datetime.now().today() 
        content = None
        soup   = BeautifulSoup(response.text.encode('utf-8'))
        soup2  = BeautifulSoup(response.text.encode('utf-8'))
        meta   = soup.select('.article-meta-value')
        return_dic['likes']    = 0
        return_dic['comments'] = 0
        return_dic['dislikes'] = 0
        if len(meta) > 0:
            try:
                if(len(meta) == 4):
                    author = meta[0].text.encode('utf-8') 
                    title  = meta[2].text.encode('utf-8')
                    try:  
                        dt = datetime.strptime(meta[3].text.encode('utf-8'),\
                             '%a %b %d %H:%M:%S %Y')
                    except:
                        dt = datetime.now().today()
                else:
                    author = meta[0].text.encode('utf-8') 
                    title  = meta[1].text.encode('utf-8') 
                    try:  
                        dt = datetime.strptime(meta[2].text.encode('utf-8'),\
                             '%a %b %d %H:%M:%S %Y')
                    except:
                        dt = datetime.now().today()
                content_v = soup.select('#main-content')[0]
                try:
                    mc = soup.select('#main-content')[0]
                    [i.decompose() for i in mc.select('span .f2')]
                    [i.decompose() for i in mc.select('div')]
                    content = mc.text.encode('utf-8')             
                except:
                    content = soup.select('#main-content')[0].text.encode('utf-8')
                return_dic['time'] = dt
                tm = self.FROMTZ.localize(dt).astimezone(self.TOTZ\
                               ).strftime('%s')
                try:
                    wpm = webapp_ptt_main.get(\
                          url=response.url,\
                          date=dt.replace(tzinfo=self.FROMTZ), tm = tm)
                except DoesNotExist:
                    stm = posneg(content)
		    wpm = webapp_ptt_main.create(\
                          url=response.url,\
                          date=dt.replace(tzinfo=self.FROMTZ),\
                          tm = tm,\
                          author = author,\
                          title=title,\
                          replies=0,\
                          content=content,\
                          negative = stm["neg"],\
                          positive = stm["pos"],\
                          board = board,\
                          match_flag = 0,\
                          keywords = json.dumps(jieba.analyse.extract_tags(\
                                   title+" "+content),ensure_ascii=False))
                    for kw in self.tree:
                        if (kw in content) or (kw in title):
                            title_m = [{'f':ele[0], 't':ele[1] , 'type':'title'} \
                                for ele in self.tree.findall(title)]
                            content_m = [{'f':ele[0], 't':ele[1], 'type':'content'} \
                                for ele in self.tree.findall(content)]
                            wpm.keyword_match = json.dumps(title_m + content_m)
                            wpm.match_flag = 1
                            return_dic['title'] = title
                            return_dic['content'] = content 
                            return_dic['url'] = response.url
                            wpm.save()
                            break
            except:
	    	print traceback.format_exc() + "\n"
        return return_dic

    def pttTimeProcess(self, time_str, dt):
        '''
           Process Ptt push time
           return date, timestamp
        '''
        ele = time_str.strip()
        getYear = dt.year
        try:
            ymd = datetime.strptime(str(dt.year) + '/' + ele, \
                  '%Y/%m/%d %H:%M')
        except:
            ymd = dt
        if (dt - ymd).days > 200:
            ymd = datetime.strptime(str(dt.year + 1 ) + '/' + \
                  ele, '%Y/%m/%d %H:%M')
        elif (dt - ymd).days < -200:
            ymd = datetime.strptime(str(dt.year - 1 ) + '/' + \
                  ele, '%Y/%m/%d %H:%M')
        tm = self.FROMTZ.localize(ymd).astimezone(self.TOTZ\
             ).strftime('%s')
        return ymd.replace(tzinfo=self.FROMTZ), tm

    def getLinkPage(rs, link):
        response = rs.get(link)
        soup = BeautifulSoup(response.text)
        link_page    = soup.select('.wide')[1]['href']
        content_page = soup.select('.wide')[1]['href']

    def get_keyword(self):
        print self.KEYWORD

    def close_conn(self):
        if not psql_db.is_closed():
            psql_db.close()
