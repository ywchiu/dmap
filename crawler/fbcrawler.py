import rethink_fb
rp = rethink_fb.rethink_fb()
rp.setup_jieba()
rp.get_fanlist()
rp.close_conn()
