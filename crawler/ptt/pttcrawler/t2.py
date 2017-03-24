# -*- coding: utf-8 -*-

import psycopg2
import sys
import requests
from BeautifulSoup import BeautifulSoup
import time
from datetime import datetime, date, time

#cur.execute('create table ptt_main(id integer primary key, author varchar(256), title varchar(256), time datetime)')          
url = 'https://www.ptt.cc/bbs/DC/M.1403371338.A.D71.html'
#url = 'https://www.ptt.cc'+line.strip()
rs = requests.get(url, verify=False)
soup = BeautifulSoup(rs.text)
print rs.text
