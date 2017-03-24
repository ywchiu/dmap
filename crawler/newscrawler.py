# -*- coding: utf-8 -*-
import rethink_news 
def main(inst):
    rp = inst 
    rp.setup_jieba()
    rp.get_newslist()
    rp.close_conn()

news = rethink_news.rethink_news()
main(news)
