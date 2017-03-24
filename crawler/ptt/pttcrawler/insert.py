# -*- coding: utf-8 -*-

import psycopg2
import sys
import requests
from bs4 import BeautifulSoup
import time
from datetime import datetime, date, time

con = None

try:
     
    con = psycopg2.connect(database='infominerdb', user='ubuntu', password='cd5438') 
    cur = con.cursor()
    #cur.execute('create table ptt_main(id integer primary key, author varchar(256), title varchar(256), time datetime)')          
    #url = 'https://www.ptt.cc/bbs/DC/M.1403371338.A.D71.html'
    f = open('link.txt', 'r')
    for line in f.readlines():
        try:
            url = 'https://www.ptt.cc'+line.strip()
            rs = requests.get('https://www.ptt.cc'+line.strip(), verify=False)
            soup = BeautifulSoup(rs.text)
            meta = soup.findAll('div', {'class':'article-metaline'})
            print url
            author = None
            tile = None
            time = None
            content = None
            author_v = meta[0].find('span', {'class':'article-meta-value'})
            if author_v:
                author = author_v.text.encode('utf-8')
            title_v = meta[1].find('span', {'class':'article-meta-value'})
            if title_v:
                title = title_v.text.encode('utf-8')
            time_v = meta[2].find('span', {'class':'article-meta-value'})
            if time_v:
                time = datetime.strptime(time_v.text.encode('utf-8'), '%a %b %d %H:%M:%S %Y')
            content_v = soup.find('div', {'id':'main-content'}).contents
            try:
                content = content_v[4].strip().encode('utf-8')
            except:
                content = content_v[5].strip().encode('utf-8') 
            cur.execute('insert into  webapp_ptt_main(url, author, title, content, date) VALUES(\'%s\',\'%s\',\'%s\',\'%s\',\'%s\')'%(url,author, title, content, time))        
            pushs = soup.findAll('div', {'class':'push'})
            for push in pushs:
                    pushins     = push.findAll('span')
                    pushtype    = pushins[0].text.encode('utf-8')
                    pushuser    = pushins[1].text.encode('utf-8')
                    pushcontent = pushins[2].text.encode('utf-8')
                   # pushtime    = datetime.strptime(pushins[3].text.encode('utf-8'), '%m/%d %H:%M')
                    cur.execute('insert into  webapp_ptt_push(url, pushtype, pushauthor, pushcontent, pushdate) VALUES(\'%s\',\'%s\',\'%s\',\'%s\',\'%s\')'%(url, pushtype, pushuser, pushcontent, time))        
            con.commit()  
        except:
            pass
    

except psycopg2.DatabaseError, e:
    print 'Error %s' % e    
    sys.exit(1)
    
    
finally:
    
    if con:
        con.close()
