# -*- coding: utf-8 -*-
import json
import logging
from peewee import Expression
from peewee import Model, PostgresqlDatabase, CharField, IntegerField, TextField, DateField, DateTimeField, BigIntegerField, FloatField
from playhouse.postgres_ext import *
from playhouse.pool import PooledPostgresqlDatabase

# Config Postgresql Write
#psql_db_write = PostgresqlDatabase('infominerdb', user='ubuntu', password='m6fu/6ru0dj/4', host='master')
psql_db_write = PooledPostgresqlDatabase('dmapdb', user='ubuntu',host='localhost', max_connections=32, stale_timeout=300)
#psql_db_write = PostgresqlDatabase('infominerdb', user='ubuntu', password='m6fu/6ru0dj/4', host='master', autocommit=True, autorollback=True)
psql_db_write.get_conn().set_client_encoding('UTF8')

logger = logging.getLogger('peewee')
logger.addHandler(logging.StreamHandler())

class PostgresqlWrite(Model):
    """A base model that will use our Postgresql database"""
    class Meta:
        database = psql_db_write

class webapp_crawl_config(PostgresqlWrite):
    SOURCE_CHOICES = (
        ('ptt', 'ptt'),
        ('facebook', 'facebook'),
    )
    board_name = CharField(max_length = 100)
    source     = CharField(max_length=10, choices = SOURCE_CHOICES, default="ptt")
    extra    = CharField(max_length=20, null=True)
    username = CharField(max_length=100, null=True)

class webapp_board_keyword(PostgresqlWrite):
    bid = IntegerField(null=False)
    kid = IntegerField(null=False)

class webapp_alert_email(PostgresqlWrite):
    email = CharField(null=True, max_length=1000)
    username = CharField(max_length=100, null=True)

class webapp_keyword(PostgresqlWrite):
    keyword = CharField(max_length=100, null=True)
    kwgrp   = IntegerField(null=True)

class webapp_keygrp(PostgresqlWrite):
    grpname  = CharField(max_length=100, null=True)
    username = CharField(max_length=100, null=True)

class webapp_keyword_match(PostgresqlWrite):
    guid        = CharField(max_length=1000)
    kwgrp       = IntegerField()
    board_name  = CharField(max_length=100, null=True)
    tm          = BigIntegerField(null=True)

class webapp_keyword_stat(PostgresqlWrite):
    SOURCE_CHOICES = (
        ('ptt', 'ptt'),
        ('facebook', 'facebook'),
        ('news', 'news'),
    )
    kwgrp      = IntegerField(null=True)
    date       = DateField(null=True)
    #board_name = CharField(max_length=100, null=True)
    source     = CharField(max_length=10, choices=SOURCE_CHOICES, default="ptt", null=True)
    cnt        = IntegerField(null=True)
    positive   = IntegerField(null=True)
    negative   = IntegerField(null=True)

class webapp_topics(PostgresqlWrite):
    group       = IntegerField(null=True)
    title       = CharField(max_length = 1000, null=True)
    description = TextField(null=True)
    url         = CharField(max_length= 1000, null=True)
    fromtm      = IntegerField(null=True)
    totm        = IntegerField(null=True)
    source      = CharField(max_length = 10, null=True)
    keywords    = CharField(max_length = 200, null=True)
    topicid     = IntegerField(null=True)

class webapp_topics_stat(PostgresqlWrite):
    group         = IntegerField()
    word          = CharField(max_length=100, null=True)
    frequency     = IntegerField(null=True)
    fromtm        = IntegerField(null=True)
    totm          = IntegerField(null=True)
    source        = CharField(max_length = 10, null=True)
    keywords      = CharField(max_length = 200, null=True)
    topicid       = IntegerField(null=True)

class webapp_topics_list(PostgresqlWrite):
    created_tm    = BigIntegerField(null=True)
    fromtm        = BigIntegerField(null=True)
    totm          = BigIntegerField(null=True)
    source        = CharField(max_length = 10, null=True)
    keywords      = CharField(max_length = 200, null=True)
    username      = CharField(max_length=100, null=True)

class opinionleader(PostgresqlWrite):
    author = CharField(max_length=100, null=True)
    dislikes_count = IntegerField(null=True)
    likes_count = IntegerField(null=True)
    comments_count = IntegerField(null=True)
    replies = IntegerField(null=True)
    title = TextField(null=True)
    keywords  = TextField(null=True) 

class opinion_leader_v(PostgresqlWrite):
    author = CharField(max_length=100, null=True, primary_key=True)
    dislikes_count = IntegerField(null=True)
    likes_count = IntegerField(null=True)
    comments_count = IntegerField(null=True)
    replies = IntegerField(null=True)
    posts = IntegerField(null=True)
    opldegree = FloatField(null=True)

class fb_leader_v(PostgresqlWrite):
    author = CharField(max_length=100, null=True, primary_key=True)
    count = IntegerField(null=True)

class webapp_job_queues(PostgresqlWrite):
    JOB_STATUS_CAT = (
        ('complete',   'c'),
        ('unfinish',   'u'),
    )
    SOURCE_CHOICES = (
        ('ptt', 'ptt'),
        ('facebook', 'facebook'),
        ('news', 'news'),
        ('topics', 'topics'),
        ('traceback', 'traceback'),
    )
    url_link   = CharField(max_length=1000)
    extra_url   = CharField(max_length=1000, null=True)
    job_status = CharField(max_length=1, choices = JOB_STATUS_CAT, default="u")
    board = CharField(max_length=100, null=True)
    source = CharField(max_length=10, choices = SOURCE_CHOICES, default="ptt", null=False)
    batch_id   = IntegerField(null = False)

class webapp_job_batch(PostgresqlWrite):
    CRAWL_SOURCE = (
        ('ptt',   'ptt'),
        ('news',   'news'),
        ('facebook',   'facebook'),
    )
    create_time      = DateTimeField(null=True)
    crawler_source   = CharField(max_length= 20, choices= CRAWL_SOURCE,null=True)

class webapp_background_queues(PostgresqlWrite):
    JOB_STATUS_CAT = (
        ('complete',   'complete'),
        ('unfinished',   'unfinished'),
    )
    JOB_CHOICES = ( ('topic', 'topic'),
        ('traceback', 'traceback'),
        ('file', 'file'),
    )
    SOURCE_CHOICES = (
        ('ptt', 'ptt'),
        ('facebook', 'facebook'),
        ('news', 'news'),
        ('all', 'all'),
    )
    job_status        = CharField(max_length=10, choices = JOB_STATUS_CAT, default="unfinished")
    job_type          = CharField(max_length=10, choices = JOB_CHOICES, default="traceback", null=True)
    source            = CharField(max_length=10, choices = SOURCE_CHOICES, default="ptt", null=True)
    kwgrp             = CharField(max_length=1000, null=True)
    fromdate          = DateTimeField(null=True)
    todate            = DateTimeField(null=True)
    keywords          = CharField(max_length=1000, null=True)
    extra_info        = CharField(max_length=1000, null=True)
    user              = CharField(max_length = 100, null=True)
    account_username  = CharField(max_length = 30, null=True)

class webapp_s3_files(PostgresqlWrite):
    STATUS_CHOICES = ( ('exist', 'exist'),
        ('delete', 'delete'),
    )
    key = CharField(max_length=150)
    status = CharField(max_length=10,choices = STATUS_CHOICES,default="exist")
    username = CharField(max_length = 20, null=True)
    created_time = IntegerField(null=True) 

class keyword_attributes(PostgresqlWrite):
    word = CharField(max_length = 20, null=True)
    category = CharField(max_length = 20, null=True)
    part = CharField(max_length = 5, null=True)
    sugg_freq = IntegerField(null=True)

class keywords_relation(PostgresqlWrite):
    node1 = CharField(max_length = 20, null=True)
    node2 = CharField(max_length = 20, null=True)
    category = CharField(max_length = 20, null=True)
    source = CharField(max_length = 20, null=True)
    fromtm = IntegerField(null=True)
    totm = IntegerField(null=True)

class webapp_ptt_main_classify(PostgresqlWrite):
    url = CharField(max_length=1000)
    predict = CharField(max_length=15)
    correct_class = CharField(max_length=15)
