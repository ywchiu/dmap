# -*- coding: utf-8 -*-

import psycopg2
import sys
import grequests
import requests
from bs4 import BeautifulSoup
import time
import re
from datetime import datetime, date, time

#ptt_domain = 'https://www.ptt.cc'
## should select from database
#urls = ['https://www.ptt.cc/bbs/Gossiping/index.html', 'https://www.ptt.cc/bbs/HatePolitics/index.html']
#article_link = []
#previous_page = []
#rs = (grequests.get(u, verify=False) for u in urls)
#rs_get  = grequests.map(rs)
#for r in  rs_get:
#    soup = BeautifulSoup(r.text)
#    print soup.select('.wide')
    #previous_page + soup.select('.wide')[1]['href']
#print previous_page
    
def getSession(url):
    payload = {'from':'/bbs' + url.split('/bbs')[1],'yes':'yes'}
    rs = requests.session()
    response = rs.post('https://www.ptt.cc/ask/over18', data=payload, verify=False)
    return rs

#def getContentPage(boardname):
# get link page from index page
def getLinkRS(boardname):
    index_url = 'https://www.ptt.cc/bbs/%s/index.html'%(boardname)
    rs = requests.session()
    response = rs.get(index_url, verify=False)
    soup = BeautifulSoup(response.text)
    if (len(soup.select('button')) > 0):
        rs = getSession(index_url)
    return rs
    #    response = rs.get(index_url, verify=False)
    #    soup = BeautifulSoup(response.text)
    #last_page = soup.select('.wide')[1]['href']
    #return last_page

link_urls = []
content_urls = []
def getLinkPage(rs, link):
    response = rs.get(link)
    soup = BeautifulSoup(response.text)
    link_page    = soup.select('.wide')[1]['href']
    link_urls 
    content_page = soup.select('.wide')[1]['href']
    
    

rs1 =  getLinkPage("Gossiping")

#rs2 =  getLinkPage("food")

#grequests.map(rs)
#print rsmap
#for i in range(2517,2399,-1):
#	url = template_url % i
#	#print url
#	rs = requests.get(url, verify=False)
#	soup = BeautifulSoup(rs.text)
#	ents = soup.select('.r-ent')
#	for ent in ents:
#		a =  ent.select('a')
#		if len(a) > 0:
#			print a[0]['href']
		#if 'href' in a:
		#	print a['href']
#print rs.text
