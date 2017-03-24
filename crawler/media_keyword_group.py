sql = '''insert into media_keyword_group (source,keyword,count,share_count,view_count,positive,negative,username)
select m.source,wk.keyword,count(1),sum(m.share_count) as share_count,
sum(m.view_count) as view_count,
sum(m.positive) as positive,sum(m.negative) as negative,'itri' as username
from webapp_news_main m join webapp_keyword_match k
    on (m.url = k.guid)
join webapp_keyword wk
    on (k.kwgrp = wk.kwgrp)
where k.kwgrp in (34,3,4,5,6,42,2,8,18,19,20,9) and m.source not like 'Match%'
group by m.source, wk.keyword
order by m.source,keyword;'''

from model import media_keyword_group, webapp_news_main, webapp_keyword_match, webapp_keyword
from peewee import fn,SQL

def delete_media():
    query = media_keyword_group.delete()
    query.execute()

def insert_media():
    data = webapp_news_main\
        .select(webapp_news_main.source,\
                webapp_keyword.keyword,\
                fn.count(1),\
                fn.sum(webapp_news_main.share_count).alias('share_count'),\
                fn.sum(webapp_news_main.view_count).alias('view_count'),\
                fn.sum(webapp_news_main.positive).alias('positive'),\
                fn.sum(webapp_news_main.negative).alias('negative'),\
                fn.Lower('itri').alias('username')\
                )\
        .join(webapp_keyword_match,\
                on=(webapp_news_main.url == webapp_keyword_match.guid))\
        .join(webapp_keyword,\
                on=(webapp_keyword_match.kwgrp == webapp_keyword.kwgrp))\
        .where(webapp_keyword_match.kwgrp << (34,3,4,5,6,42,2,8,18,19,20,9),\
               ~(webapp_news_main.source % 'Match%'))\
        .group_by(webapp_news_main.source, webapp_keyword.keyword)\
        .order_by(webapp_news_main.source, webapp_keyword.keyword)
    print data
     
    query = (media_keyword_group\
             .insert_from(\
                 fields=[media_keyword_group.source,\
                         media_keyword_group.keyword,\
                         media_keyword_group.count,\
                         media_keyword_group.share_count,\
                         media_keyword_group.view_count,\
                         media_keyword_group.positive,\
                         media_keyword_group.negative,\
                         media_keyword_group.username,\
                         ],\
                 query=data)\
             .execute())
    print query
               
delete_media()
insert_media()
