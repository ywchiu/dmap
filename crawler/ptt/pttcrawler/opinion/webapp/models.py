from django.db import models

class ptt_main(models.Model):
    url = models.CharField(max_length=1000)
    author = models.CharField(max_length=50, null=True)
    title = models.TextField(null=True)
    content = models.TextField(null=True)
    date = models.DateField(null=True)

class ptt_push(models.Model):
    url = models.CharField(max_length=1000)
    pushtype = models.CharField(max_length=20, null=True)
    pushauthor = models.TextField(null=True)
    pushcontent = models.TextField(null=True)
    pushdate = models.DateField(null=True)
