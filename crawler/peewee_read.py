# -*- coding: utf-8 -*-
import json
import logging
from peewee import Expression
from peewee import Model, PostgresqlDatabase, CharField, IntegerField, TextField, DateField, DateTimeField, BigIntegerField, FloatField
from playhouse.postgres_ext import *
from playhouse.pool import PooledPostgresqlDatabase

# Config Postgresql Read 
#psql_db = PostgresqlDatabase('infominerdb', user='ubuntu')
psql_db = PooledPostgresqlDatabase('dmapdb', user='ubuntu', max_connections=32,stale_timeout=300)
#psql_db = PostgresqlDatabase('infominerdb', user='ubuntu', autocommit=True, autorollback=True)
psql_db.get_conn().set_client_encoding('UTF8')

logger = logging.getLogger('peewee')
logger.addHandler(logging.StreamHandler())

class PostgresqlRead(Model):
    """A base model that will use our Postgresql database"""
    class Meta:
        database = psql_db

class webapp_forum_main(PostgresqlRead):
    url        = CharField(max_length=1000, unique=True)
    title      = CharField(max_length=1000, null=True)
    content    = TextField(null=True)
    date       = DateTimeField(null=True)
    tm         = BigIntegerField(null=True)
    source     = CharField(max_length = 50, null=True)
    board      = CharField(max_length = 50, null=True)
    positive   = IntegerField(null=True)
    negative   = IntegerField(null=True)

class webapp_facebook_main(PostgresqlRead):
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
    match_flag    = IntegerField(null=True)
    positive   = IntegerField(null=True)
    negative   = IntegerField(null=True)

class webapp_facebook_push(PostgresqlRead):
    url            = CharField(max_length=1000)
    parent_id      = CharField(max_length=100, null=True)
    push_id        = CharField(max_length=100, null=True)
    pushauthor     = TextField(null=True)
    pushcontent    = TextField(null=True)
    pushdate       = DateTimeField(null=True)
    like_count     = IntegerField(null=True)
    positive   = IntegerField(null=True)
    negative   = IntegerField(null=True)
    tm         = IntegerField(null=True)

class webapp_news_main(PostgresqlRead):
    url        = CharField(max_length=1000, primary_key=True)
    title       = CharField(max_length=1000, null=True)
    content     = TextField(null=True)
    date        = DateField(null=True)
    tm          = BigIntegerField(null=True)
    source      = CharField(max_length = 20, null=True)
    match_flag  = IntegerField(null=True)
    from_id       = CharField(max_length=100, null=True)
    view_count    = IntegerField(null=True)
    comment_count = IntegerField(null=True)
    share_count   = IntegerField(null=True)
    like_count = IntegerField(null=True)
    positive   = IntegerField(null=True)
    negative   = IntegerField(null=True)

class webapp_ptt_main(PostgresqlRead):
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

class webapp_ptt_main_201511(PostgresqlRead):
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

class webapp_ptt_push(PostgresqlRead):
    url         = CharField(max_length=1000)
    pushtype    = CharField(max_length=20, null=True)
    pushauthor  = TextField(null=True)
    pushcontent = TextField(null=True)
    pushdate    = DateTimeField(null=True)
    tm          = BigIntegerField(null=True)
    positive   = IntegerField(null=True)
    negative   = IntegerField(null=True)

class webapp_news_push(PostgresqlRead):
    url            = CharField(max_length=1000)
    parent_id      = CharField(max_length=100, null=True)
    push_id        = CharField(max_length=100, null=True)
    pushauthor     = TextField(null=True)
    pushcontent    = TextField(null=True)
    pushdate       = DateTimeField(null=True)
    tm             = BigIntegerField(null=True)
    like_count     = IntegerField(null=True)
    positive   = IntegerField(null=True)
    negative   = IntegerField(null=True)

class keywords_list(PostgresqlRead):
    duration = IntegerField(null=True)
    source = CharField(max_length = 20, null=True)

class keywords_relation_collect(PostgresqlRead):
    node_collect = CharField(max_length = 20, null=True)
    node = CharField(max_length = 20, null=True)
    source = CharField(max_length = 20, null=True)

class keywords_relation(PostgresqlRead):
    node1 = CharField(max_length = 20, null=True)
    node2 = CharField(max_length = 20, null=True)
    category = CharField(max_length = 20, null=True)
    source = CharField(max_length = 20, null=True)
    fromtm = IntegerField(null=True)
    totm = IntegerField(null=True)
    list_id = IntegerField(null=True)

class keyword_attributes(PostgresqlRead):
    word = CharField(max_length = 20, null=True)
    category = CharField(max_length = 20, null=True)
    part = CharField(max_length = 5, null=True)
    sugg_freq = IntegerField(null=True)
    tm = IntegerField(null=True)
    fromtm = IntegerField(null=True)
    totm = IntegerField(null=True)
    source = CharField(max_length = 20, null=True)

class keyword_extract(PostgresqlRead):
    word = CharField(max_length = 20, null=True)
    weight = FloatField(null=True)
    part = CharField(max_length = 5, null=True)

class keyword_author_relation(PostgresqlRead):
    author = CharField(max_length = 100, null=True)
    node = CharField(max_length = 20, null=True)
    source = CharField(max_length = 20, null=True)
    main_url = CharField(max_length=1000, null=True)
    kr_id = IntegerField(null=True)
    tm = IntegerField(null=True)
    list_id = IntegerField(null=True)
    source = CharField(max_length = 20, null=True)

class part_group(PostgresqlRead):
    group = CharField(max_length = 5, null=True)
    part = CharField(max_length = 5, null=True)

class author_posts(PostgresqlRead):
    author  = CharField(max_length = 100, null=True)
    url     = CharField(max_length=1000, null=True)
    title   = CharField(max_length=1000, null=True)
    content = TextField(null=True)
    date    = DateTimeField(null=True)
    tm      = BigIntegerField(null=True)
    source  = CharField(max_length = 20, null=True)

class webapp_keyword_match(PostgresqlRead):
    guid        = CharField(max_length=1000)
    kwgrp       = IntegerField()
    board_name  = CharField(max_length=100, null=True)
    tm          = BigIntegerField(null=True)

class media_keyword_group(PostgresqlRead):
    board = CharField(max_length = 100, null=True)
    keyword = CharField(max_length = 20, null=True)
    count = IntegerField(null=True)
    share_count = IntegerField(null=True)
    view_count = IntegerField(null=True)
    positive = IntegerField(null=True)
    negative = IntegerField(null=True)
    username = CharField(max_length = 20, null=True)
    source = CharField(max_length = 20, null=True)

class webapp_ptt_main_classify(PostgresqlRead):
    url = CharField(max_length=1000, unique=True)
    predict = CharField(max_length=15, null=True)
    correct_class = CharField(max_length=15, null=True)

class webapp_keygrp(PostgresqlRead):
    grpname  = CharField(max_length=100, null=True)
    username = CharField(max_length=100, null=True)

class webapp_keyword(PostgresqlRead):
    keyword = CharField(max_length=100, null=True)
    kwgrp   = IntegerField(null=True)

class webapp_alert_settings(PostgresqlRead):
    key = CharField(max_length=20, null=True)
    value = CharField(max_length=20, null=True)
    source = CharField(max_length=20, null=True)

class webapp_facebook_temp(PostgresqlRead):
    url            = CharField(max_length=1000, unique=True)
    likes_count    = IntegerField(null=True, default=0)
    comments_count = IntegerField(null=True, default=0)
    shares_count   = IntegerField(null=True, default=0)
