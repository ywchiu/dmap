# -*- coding: utf-8 -*-
import json
import logging
import psycopg2
import  peewee
from peewee import fn
from model import webapp_crawl_config, webapp_board_keyword, webapp_keygrp, webapp_keyword, webapp_facebook_main, webapp_news_main
from model import webapp_job_queues, webapp_job_batch, webapp_ptt_main, webapp_ptt_push, webapp_keyword_match
from model import webapp_keyword_stat
import ahocorasick
from datetime import datetime, timedelta
import pytz
from tzlocal import get_localzone # $ pip install tzlocal

class aggregator(object):
    def __init__(self):
        local_tz = get_localzone()
        FROMTZ =  pytz.timezone('Asia/Taipei')
        TOTZ   =  pytz.timezone(local_tz.zone)
        self.dt = datetime.today().strftime('%Y-%m-%d')
        self.fromdt = datetime.strptime(self.dt, '%Y-%m-%d')-timedelta(days=5)
        self.fromts = FROMTZ.localize(self.fromdt).astimezone(TOTZ).strftime('%s')

    def aggregate_ptt_board(self):
        config_list = webapp_ptt_main\
                .select(webapp_keyword_match.kwgrp, fn.date_trunc('day', webapp_ptt_main.date),fn.Count(1),fn.Sum(webapp_ptt_main.positive).alias('positive'),fn.Sum(webapp_ptt_main.negative).alias('negative'))\
                .join(webapp_keyword_match, on=(webapp_ptt_main.url == webapp_keyword_match.guid).alias('km'))\
                .where(webapp_ptt_main.tm >= self.fromts, webapp_keyword_match.tm >= self.fromts )\
                .group_by(webapp_keyword_match.kwgrp, fn.date_trunc('day', webapp_ptt_main.date))
        print config_list
        for c in config_list:
            wks =webapp_keyword_stat.get_or_create(kwgrp = c.km.kwgrp, date =c.date_trunc,source= 'ptt')
            wks.cnt = c.count
            wks.positive = c.positive
            wks.negative = c.negative
            wks.save()

    def aggregate_news_board(self):
        config_list = webapp_news_main\
                .select(webapp_keyword_match.kwgrp,  fn.date_trunc('day', webapp_news_main.date),fn.Count(1),fn.Sum(webapp_news_main.positive).alias('positive'),fn.Sum(webapp_news_main.negative).alias('negative'))\
                .join(webapp_keyword_match, on=(webapp_news_main.url == webapp_keyword_match.guid).alias('km'))\
                .where(webapp_news_main.tm >= self.fromts, webapp_keyword_match.tm >= self.fromts )\
                .group_by(webapp_keyword_match.kwgrp, fn.date_trunc('day', webapp_news_main.date))
        for c in config_list:
            wks =webapp_keyword_stat.get_or_create(kwgrp = c.km.kwgrp, \
                 date =c.date_trunc, source= 'news')
            wks.cnt = c.count
            wks.positive = c.positive
            wks.negative = c.negative
            wks.save()

    def aggregate_fb_board(self):
        config_list = webapp_facebook_main\
                .select(webapp_keyword_match.kwgrp,  fn.date_trunc('day', webapp_facebook_main.date),fn.Count(1),fn.Sum(webapp_facebook_main.positive).alias('positive'),fn.Sum(webapp_facebook_main.negative).alias('negative'))\
                .join(webapp_keyword_match, on=(webapp_facebook_main.url == webapp_keyword_match.guid).alias('km'))\
                .where(webapp_facebook_main.tm >=self.fromts, webapp_keyword_match.tm >= self.fromts)\
                .group_by(webapp_keyword_match.kwgrp, fn.date_trunc('day', webapp_facebook_main.date))
        for c in config_list:
            wks =webapp_keyword_stat.get_or_create(kwgrp = c.km.kwgrp, \
                 date =c.date_trunc, source= 'facebook')
            wks.cnt = c.count
            wks.positive = c.positive
            wks.negative = c.negative
            wks.save()

def main():
    a = aggregator()
    a.aggregate_ptt_board()
    a.aggregate_news_board()
    a.aggregate_fb_board()

if __name__ == "__main__":
    main()
