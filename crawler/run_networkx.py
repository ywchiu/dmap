from model import webapp_ptt_main, webapp_news_main, webapp_facebook_main, keyword_author_relation, keywords_relation, keywords_list
from peewee import fn, DoesNotExist
import jieba
from gensim.models import word2vec
import re
import os
import pytz
from datetime import datetime,date
from tzlocal import get_localzone
import calendar
import networkx
# path settings
from path_settings import BASE_PATH,DIC_PATH
local_tz = get_localzone()
FROMTZ =  pytz.timezone('Asia/Taipei')
TOTZ   =  pytz.timezone(local_tz.zone)

today = date.today()
year = today.year
month = today.month
duration = '{:04d}{:02d}'.format(year,month)
source = 'facebook'
#try:
#    k_list = keywords_list.get(keywords_list.duration == duration,\
#                               keywords_list.source == source)
#    list_id = k_list.id
#    n = networkx.networkx()
#    n.delete_data(list_id)
#except DoesNotExist:
#    pass
#kl = keywords_list.create(duration = duration, source = source)
#list_id = kl.id
#fromtm = int(FROMTZ.localize(datetime(year,month,1)).astimezone(TOTZ).strftime('%s'))
#totm = int(FROMTZ.localize(datetime(year,month,calendar.monthrange(year,month)[1])).astimezone(TOTZ).strftime('%s'))+86400
#todaytm = int(date.today().strftime('%s'))+86400
#if todaytm != totm:
#    totm = todaytm
#n = networkx.networkx()
#model = n.create_keyword(source,'origin',fromtm,totm)
#n.get_keyword_keyword(source,list_id,model)
#n.get_keyword_author(source,fromtm,totm,list_id)

year = 2015
for i in xrange(9,13):
    month = i
    duration = '{:04d}{:02d}'.format(year,month)
    try:
        k_list = keywords_list.get(keywords_list.duration == duration,\
                                   keywords_list.source == source)
        list_id = k_list.id
        n = networkx.networkx()
        n.delete_data(list_id)
    except DoesNotExist:
        pass
    kl = keywords_list.create(duration = duration, source = source)
    list_id = kl.id
    fromtm = int(FROMTZ.localize(datetime(year,month,1)).astimezone(TOTZ).strftime('%s'))
    totm = int(FROMTZ.localize(datetime(year,month,calendar.monthrange(year,month)[1])).astimezone(TOTZ).strftime('%s'))+86400
    n = networkx.networkx()
    model = n.create_keyword(source,'origin',fromtm,totm)
    n.get_keyword_keyword(source,list_id,model)
    n.get_keyword_author(source,fromtm,totm,list_id)
    
