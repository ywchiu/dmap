# -*- coding: utf-8 -*-

import psycopg2
import sys
import requests
from bs4 import BeautifulSoup
import time
from datetime import datetime, date, time

url = 'https://www.ptt.cc/bbs/HatePolitics/index2517.html'
template_url = 'https://www.ptt.cc/bbs/HatePolitics/index%d.html'

for i in range(2517,2399,-1):
	url = template_url % i
	#print url
	rs = requests.get(url, verify=False)
	soup = BeautifulSoup(rs.text)
	ents = soup.select('.r-ent')
	for ent in ents:
		a =  ent.select('a')
		if len(a) > 0:
			print a[0]['href']
		#if 'href' in a:
		#	print a['href']
#print rs.text
