from __future__ import unicode_literals
from jsonfield import JSONField
from django.db import models

class disp_main(models.Model):
    url = models.CharField(max_length=1000, unique=True, db_index=True)
    author = models.CharField(max_length=100, null=True)
    title = models.TextField(null=True)
    content = models.TextField(null=True)
    board = models.CharField(max_length = 100, null=True)
    tm   = models.BigIntegerField(null=True)
    ip       = models.CharField(max_length=100, null=True)
    location  = models.CharField(max_length=100, null=True)
    def __unicode__(self):
        return self.title

class keyword(models.Model):
    keyword = models.CharField(max_length=100, null=True)
    kwgrp   = models.IntegerField(null=True)

# Create your models here.
class ptt_main(models.Model):
    url = models.CharField(max_length=1000, unique=True, db_index=True)
    author = models.CharField(max_length=100, null=True)
    title = models.TextField(null=True)
    content = models.TextField(null=True)
    board = models.CharField(max_length = 100, null=True)
    date = models.DateTimeField(null=True)
    tm   = models.BigIntegerField(null=True)
    update_tm   = models.BigIntegerField(null=True)
    likes_count = models.IntegerField(null=True, default=0)
    comments_count = models.IntegerField(null=True, default=0)
    dislikes_count = models.IntegerField(null=True, default=0)
    keyword_match  = models.TextField(null=True)
    match_flag = models.IntegerField(null=True)
    positive  = models.IntegerField(null=True, default=0)
    negative  = models.IntegerField(null=True, default=0)
    # keywords  = JSONField(null=True)
    replies  = models.IntegerField(null=True, default=0)
    ip       = models.CharField(max_length=100, null=True)
    location  = models.CharField(max_length=100, null=True)
    push_keywords  = models.CharField(max_length=10000, null=True)
    def __unicode__(self):
        return self.title
