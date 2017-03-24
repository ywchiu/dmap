# -*- coding: utf-8 -*-
import json
import logging
from peewee import Expression
from peewee import Model, PostgresqlDatabase, CharField, IntegerField, TextField, DateField, DateTimeField, BigIntegerField, FloatField

from playhouse.postgres_ext import JSONField
from playhouse.pool import PooledPostgresqlDatabase
# Config Postgresql Database
#psql_db = PostgresqlDatabase('infominerdb', host='master', user='ubuntu', autocommit=True, autorollback=True, password='m6fu/6ru0dj/4')
psql_db = PooledPostgresqlDatabase('dmapdb', host='localhost', user='ubuntu', autocommit=True, autorollback=True, max_connections=32, stale_timeout=300, password='largitdata' )
psql_db.get_conn().set_client_encoding('UTF8')
logger = logging.getLogger('peewee')
logger.addHandler(logging.StreamHandler())

class PostgresqlModel(Model):
    """A base model that will use our Postgresql database"""
    class Meta:
        database = psql_db

class webapp_crawl_config(PostgresqlModel):
    SOURCE_CHOICES = (
        ('ptt', 'ptt'),
        ('facebook', 'facebook'),
    )
    board_name = CharField(max_length = 100)
    source     = CharField(max_length=10, choices = SOURCE_CHOICES, default="ptt")
    extra= CharField(max_length=20, null=True)

class webapp_alert_email(PostgresqlModel):
    email = CharField(null=True, max_length=1000)

class webapp_board_keyword(PostgresqlModel):
    bid = IntegerField(null=False)
    kid = IntegerField(null=False)

class webapp_keyword(PostgresqlModel):
    keyword = CharField(max_length=100, null=True)
    kwgrp   = IntegerField(null=True)

class webapp_keygrp(PostgresqlModel):
    grpname = CharField(max_length=100, null=True)
    username = CharField(max_length=100, null=True)

class webapp_facebook_main(PostgresqlModel):
    url            = CharField(max_length=1000)
    from_id        = CharField(max_length=100, null=True)
    from_name      = CharField(max_length=100, null=True)
    content        = TextField(null=True)
    date           = DateTimeField(null=True)
    tm             = BigIntegerField(null=True)
    update_date    = DateTimeField(null=True)
    likes_count    = IntegerField(null=True)
    comments_count = IntegerField(null=True)
    shares_count   = IntegerField(null=True)
    board = CharField(max_length = 100, null=True)
    match_flag  = IntegerField(null=True)
    positive       = IntegerField(null=True)
    negative       = IntegerField(null=True)

class webapp_facebook_push(PostgresqlModel):
    url            = CharField(max_length=1000)
    parent_id      = CharField(max_length=100, null=True)
    push_id        = CharField(max_length=100, null=True)
    pushauthor     = TextField(null=True)
    pushcontent    = TextField(null=True)
    pushdate       = DateTimeField(null=True)
    tm             = BigIntegerField(null=True)
    like_count     = IntegerField(null=True)
    positive       = IntegerField(null=True)
    negative       = IntegerField(null=True)

class webapp_news_main(PostgresqlModel):
    url         = CharField(max_length=1000, primary_key=True)
    title       = CharField(max_length=1000, null=True)
    content     = TextField(null=True)
    date        = DateTimeField(null=True)
    tm          = BigIntegerField(null=True)
    source      = CharField(max_length = 20, null=True)
    match_flag  = IntegerField(null=True)
    from_id       = CharField(max_length=100, null=True)
    view_count    = IntegerField(null=True)
    comment_count = IntegerField(null=True)
    share_count   = IntegerField(null=True)
    like_count = IntegerField(null=True)
    positive       = IntegerField(null=True)
    negative       = IntegerField(null=True)

class webapp_job_queues(PostgresqlModel):
    JOB_STATUS_CAT = ( 
        ('complete',   'c'),
        ('unfinish',   'u'),
    )
    SOURCE_CHOICES = (
        ('ptt', 'ptt'),
        ('facebook', 'facebook'),
        ('news', 'news'),
    )
    url_link   = CharField(max_length=1000)
    extra_url   = CharField(max_length=1000, null=True)
    job_status = CharField(max_length=1, choices = JOB_STATUS_CAT, default="u")
    board = CharField(max_length=100, null=True)
    source = CharField(max_length=10, choices = SOURCE_CHOICES, default="ptt", null=False)
    batch_id   = IntegerField(null = False)

class webapp_job_batch(PostgresqlModel):
    CRAWL_SOURCE = (
        ('ptt',   'ptt'),
        ('news',   'news'),
        ('facebook',   'facebook'),
    )
    create_time      = DateTimeField(null=True)
    crawler_source   = CharField(max_length= 20, choices= CRAWL_SOURCE,null=True)

class webapp_ptt_main(PostgresqlModel):
    url     = CharField(max_length=1000, unique=True)
    author  = CharField(max_length=100, null=True)
    title   = TextField(null=True)
    content = TextField(null=True)
    board = CharField(max_length = 100, null=True)
    date    = DateTimeField(null=True)
    tm      = BigIntegerField(null=True)
    update_tm      = BigIntegerField(null=True)
    likes_count = IntegerField(null=True)
    comments_count = IntegerField(null=True)
    dislikes_count = IntegerField(null=True)
    keyword_match  = CharField(null=True)
    match_flag     = IntegerField(null=True)
    positive       = IntegerField(null=True)
    negative       = IntegerField(null=True)
    keywords       = JSONField(null=True)
    replies        = IntegerField(null=True)

class webapp_ptt_main_201511(PostgresqlModel):
    url     = CharField(max_length=1000, unique=True)
    author  = CharField(max_length=100, null=True)
    title   = TextField(null=True)
    content = TextField(null=True)
    board = CharField(max_length = 100, null=True)
    date    = DateTimeField(null=True)
    tm      = BigIntegerField(null=True)
    update_tm      = BigIntegerField(null=True)
    likes_count = IntegerField(null=True)
    comments_count = IntegerField(null=True)
    dislikes_count = IntegerField(null=True)
    keyword_match = CharField(null=True)
    match_flag    = IntegerField(null=True)
    positive   = IntegerField(null=True)
    negative   = IntegerField(null=True)
    keywords  = JSONField(null=True)
    replies  = IntegerField(null=True)

class webapp_ptt_push(PostgresqlModel):
    url         = CharField(max_length=1000)
    pushtype    = CharField(max_length=20, null=True)
    pushauthor  = TextField(null=True)
    pushcontent = TextField(null=True)
    pushdate    = DateTimeField(null=True)
    tm          = BigIntegerField(null=True)
    positive       = IntegerField(null=True)
    negative       = IntegerField(null=True)

class webapp_news_push(PostgresqlModel):
    url            = CharField(max_length=1000)
    parent_id      = CharField(max_length=100, null=True)
    push_id        = CharField(max_length=100, null=True)
    pushauthor     = TextField(null=True)
    pushcontent    = TextField(null=True)
    pushdate       = DateTimeField(null=True)
    tm             = BigIntegerField(null=True)
    like_count     = IntegerField(null=True)
    positive       = IntegerField(null=True)
    negative       = IntegerField(null=True)

class webapp_keyword_match(PostgresqlModel):
    guid        = CharField(max_length=1000)
    kwgrp       = IntegerField()
    board_name  = CharField(max_length=100)
    tm          = BigIntegerField(null=True)

class webapp_keyword_stat(PostgresqlModel):
    SOURCE_CHOICES = (
        ('ptt', 'ptt'),
        ('facebook', 'facebook'),
        ('news', 'news'),
    )
    kwgrp      = IntegerField(null=True)
    date       = DateField(null=True)
    #tm         = BigIntegerField(null=True)
    #board_name = CharField(max_length=100, null=True)
    source     = CharField(max_length=10, choices=SOURCE_CHOICES, default="ptt", null=True)
    cnt        = IntegerField(null=True)
    positive       = IntegerField(null=True)
    negative       = IntegerField(null=True)

class webapp_sentiment(PostgresqlModel):
    SENTIMENT = (
        ('positive', 'positive'),
        ('negative', 'negative'),
        ('others',   'others')
    )
    dict_name       = CharField(max_length=100)
    sentiment_type  = CharField(max_length=100, choices = SENTIMENT, null=True)
    source          = CharField(max_length=100)

class webapp_topics(PostgresqlModel):
    group       = IntegerField(null=True)
    title       = CharField(max_length = 1000, null=True)
    description = TextField(null=True)
    url         = CharField(max_length = 1000, null=True)
    fromtm      = IntegerField(null=True)
    totm        = IntegerField(null=True)
    duration    = CharField(max_length = 25)
    source      = CharField(max_length = 10, null=True)
    keywords    = CharField(max_length = 200, null=True)

class webapp_topics_stat(PostgresqlModel):
    group         = IntegerField()
    word          = CharField(max_length=100, null=True)
    frequency     = IntegerField(null=True)
    fromtm        = IntegerField(null=True)
    totm          = IntegerField(null=True)
    duration      = CharField(max_length = 25)
    source        = CharField(max_length = 10, null=True)
    keywords      = CharField(max_length = 200, null=True)
#class t1(PostgresqlModel):
#      idx       = IntegerField()

class keywords_relation_collect(PostgresqlModel):
    node_collect = CharField(max_length = 20, null=True)
    node = CharField(max_length = 20, null=True)
    source = CharField(max_length = 20, null=True)

class keywords_list(PostgresqlModel):
    duration = IntegerField(null=True)
    source = CharField(max_length = 20, null=True)

class keywords_relation(PostgresqlModel):
    node1 = CharField(max_length = 20, null=True)
    node2 = CharField(max_length = 20, null=True)
    category = CharField(max_length = 20, null=True)
    source = CharField(max_length = 20, null=True)
    fromtm = IntegerField(null=True)
    totm = IntegerField(null=True)
    list_id = IntegerField(null=True)

class keyword_author_relation(PostgresqlModel):
    author = CharField(max_length = 100, null=True)
    node = CharField(max_length = 20, null=True)
    source = CharField(max_length = 20, null=True)
    main_url = CharField(max_length=1000, null=True)
    kr_id = IntegerField(null=True)
    tm = IntegerField(null=True)
    list_id = IntegerField(null=True)

class keyword_part_freq(PostgresqlModel):
    word = CharField(max_length = 20, null=True)
    word_part = CharField(max_length = 5, null=True)
    word_sugg_freq = IntegerField(null=True)

class keyword_extract(PostgresqlModel):
    word = CharField(max_length = 20, null=True)
    weight = FloatField(null=True)
    part = CharField(max_length = 5, null=True)

class keyword_attributes(PostgresqlModel):
    word = CharField(max_length = 20, null=True)
    category = CharField(max_length = 20, null=True)
    part = CharField(max_length = 5, null=True)
    sugg_freq = IntegerField(null=True)
    created_time = IntegerField(null=True)
    fromtm = IntegerField(null=True)
    totm = IntegerField(null=True)
    source = CharField(max_length = 20, null=True)

class part_group(PostgresqlModel):
    id = IntegerField(primary_key=True)
    group = CharField(max_length = 5, null=True)
    part = CharField(max_length = 5, null=True)

class author_posts(PostgresqlModel):
    author  = CharField(max_length = 100, null=True)
    url     = CharField(max_length=1000, null=True)
    title   = CharField(max_length=1000, null=True)
    content = TextField(null=True)
    date    = DateTimeField(null=True)
    tm      = BigIntegerField(null=True)
    source  = CharField(max_length = 20, null=True)

class webapp_ptt_main_classify(PostgresqlModel):
    url = CharField(max_length=1000, unique=True)
    predict = CharField(max_length=15, null=True)
    correct_class = CharField(max_length=15, null=True)

class media_keyword_group(PostgresqlModel):
    board = CharField(max_length = 100, null=True)
    keyword = CharField(max_length = 20, null=True)
    count = IntegerField(null=True)
    share_count = IntegerField(null=True)
    view_count = IntegerField(null=True)
    positive = IntegerField(null=True)
    negative = IntegerField(null=True)
    username = CharField(max_length = 20, null=True)
    source = CharField(max_length = 20, null=True)

class webapp_issue_network(PostgresqlModel):
    issue_group = CharField(max_length=30, null=True)
    issue = CharField(max_length=20, null=True)
    issue_category = CharField(max_length=20, null=True)
    issue_user = CharField(max_length=100, null=True)
    issue_url = CharField(max_length=1000, null=True)
    issue_title = TextField(null=True)
    relation = CharField(max_length=20, null=True)
    relation_category = CharField(max_length=20, null=True)
    relation_user = CharField(max_length=100, null=True)
    relation_url = CharField(max_length=1000, null=True)
    relation_title = TextField(null=True)
    tm      = BigIntegerField(null=True)
    source  = CharField(max_length = 20, null=True)

class webapp_alert_log(PostgresqlModel):
    log = TextField(null=True)
    created_time = DateTimeField(null=True)
    category = CharField(max_length=20, null=True)

class webapp_forum_main(PostgresqlModel):
    url        = CharField(max_length=1000, unique=True)
    title      = CharField(max_length=1000, null=True)
    content    = TextField(null=True)
    date       = DateTimeField(null=True)
    tm         = BigIntegerField(null=True)
    source     = CharField(max_length = 50, null=True)
    board      = CharField(max_length = 50, null=True)
    positive   = IntegerField(null=True)
    negative   = IntegerField(null=True)
