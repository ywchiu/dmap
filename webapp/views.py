# -*- coding: utf-8 -*-
from os.path import abspath,dirname
import os
import logging
from django.db.models import Count
os.environ['TZ'] = 'Asia/Taipei'
dname = dirname(dirname(abspath(__file__)))

fmt = '[%(asctime)s][%(levelname)s][%(process)d][%(filename)s: %(lineno)d] %(message)s'
datefmt = '%d/%b/%Y %H:%M:%S'
formatter = logging.Formatter(fmt, datefmt)


logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
fh = logging.FileHandler(os.path.join( dname,"dmap.log" ))
fh.setLevel(logging.INFO)
fh.setFormatter(formatter)
logger.addHandler(fh)


from django.shortcuts import render
from django.shortcuts import render_to_response, HttpResponse
from django.template import RequestContext
from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.views.decorators.csrf import csrf_exempt
from webapp.models import ptt_main, disp_main

# from django.contrib.gis.geos import GEOSGeometry
# from django.contrib.gis.measure import D # ``D`` is a shortcut for ``Distance``

# Create your views here.
import json
import GeoIP
import time
from datetime import datetime as dt
import datetime
from webapp.handle_g0v import g0v_data_handler
gi = GeoIP.open("GeoLiteCity.dat", GeoIP.GEOIP_INDEX_CACHE | GeoIP.GEOIP_CHECK_CACHE)
# print gi.record_by_name("74.125.67.100") # a www.google.com IP
g0v_data = g0v_data_handler()

def get_ptt_dic(p):
    return {
            'id': p.id,
            'url': p.url,
            # 'author': p.author,
            'title': p.title,
            'content': p.content,
            # 'board': p.board,
            'date': str(p.date).split('+')[0],
            # 'date_int': time.mktime(p.date.timetuple()) + p.date.microsecond / 1E6,
            'date_int': p.tm if p.tm else (dt.strptime(str(p.date).split('+')[0],'%Y-%m-%d %H:%M:%S')-datetime.datetime(1970,1,1)).total_seconds(),
            # 'date_int': p.tm if p.tm else (p.date-datetime.datetime(1970,1,1)).total_seconds(),
            'tm': p.tm,
            # 'update_tm': p.update_tm,
            # 'likes_count': p.likes_count,
            # 'comments_count': p.comments_count,
            # 'dislikes_count': p.dislikes_count,
            # 'keyword_match': p.keyword_match,
            # 'match_flag': p.match_flag,
            # 'positive': p.positive,
            # 'negative': p.negative,
            # 'keywords': p.keywords,
            # 'replies': p.replies,
            'ip': p.ip,
            'location': p.location,
            # 'push_keywords': p.push_keywords,
        }

def get_disp_dic(p):
    return {
        'id': p.id,
        'url': p.url,
        'title': p.title,
        'content': p.content,
        'date': str(dt.fromtimestamp( int(p.tm) )),
        'date_int': p.tm,
        'tm': p.tm,
        'ip': p.ip,
        'location': p.location,
    }

def value_check_pass(p,get_dic):
    try:
        get_dic(p)
        return True
    except:
        return False



def labeling_content(content,category_list=None):
    cat = [ u'登革熱', u'A型肝炎', u'流感', u'腸病毒' ]
    # cat = [ u'登革熱', u'肝炎', u'流感', u'腸病毒' ]
    # cat = [ u'登革熱', u'A型', u'流感', u'腸病毒' ]
    cat = [ i for i in cat if i in category_list ] if category_list else cat
    cnt = [ (typ,content.count(typ)) for typ in cat ]
    result = max(cnt,key=lambda x:x[1])
    if result[1] > 0:
        return result[0]
    else:
        return u'其他'

def belong_cat(content,category_list):
    if len(category_list) == 0:
        return True
    # cnt = [ content.count(typ) for typ in category_list ]
    # if '登革熱' in content or u'登革熱' in content:
    # if u'登革熱' in content:
    #     cnt = { typ:content.count(typ) for typ in category_list }
    #     raise Exception(u'{}\n{}\n{}'.format(cnt,content).encode('utf8'))
    # if max( cnt ) == 0:
    #     return False
    # return True

    cnt = [ typ in content for typ in category_list ]
    return True in cnt

def return_response(data):
    response_data = json.dumps(data)
    response = HttpResponse(response_data, content_type='application/json; charset=UTF-8')
    response['Content-Length'] = len(response_data)
    return response

def index(request):
    # return render_to_response(
    #     'index.html', context_instance=RequestContext(request)
    # )
    return render(request, 'index.html', "")

def analysis(request):
    return render(request, 'analysis.html', "")

# for v1
def get_all_data(request):
    # response_data = [ get_ptt_dic(p) for p in ptt_main.objects.all() if p.ip ]
    response_data = [ get_ptt_dic(p) for p in ptt_main.objects.all() ]

    for idx, data in enumerate(response_data):
        response_data[idx]['lat'] = None
        response_data[idx]['lng'] = None
        if data['ip']:
            geo_info = gi.record_by_name(data['ip'])
            response_data[idx]['lat'] = geo_info['latitude']
            response_data[idx]['lng'] = geo_info['longitude']
        response_data[idx]['category'] = labeling_content(data['content'])

    no_ip_data = [ r for r in response_data if r['ip'] == None ]
    ip_data = [ r for r in response_data if r['ip'] ]
    # response_data = no_ip_data[:100] + ip_data[:100]
    # response_data = ip_data[:5]

    response_data = sorted(response_data,key=lambda x: x['date_int'])

    return HttpResponse(json.dumps(response_data), content_type='application/json; charset=UTF-8')
    # return HttpResponse(json.dumps([{"AAAA":len(response_data)}]), content_type='application/json; charset=UTF-8')
    # return HttpResponse(json.dumps(response_data[2000:2500]), content_type='application/json; charset=UTF-8')

# for v1
def get_all_geo_data(request):
    # format:
    # {
    #     "type": "Feature",
    #         "geometry": {
    #         "type": "MultiPoint",
    #         "coordinates": [/*array of [lng,lat] coordinates*/]
    #     },
    #     "properties": {
    #         "time": [/*array of UNIX timestamps*/]
    #     }
    # }
    response_data = [ get_ptt_dic(p) for p in ptt_main.objects.all() if p.ip ]
    geo_data = []
    for idx, data in enumerate(response_data):
        if data['ip']:
            geo_info = gi.record_by_name(data['ip'])
            data['lat'] = geo_info['latitude']
            data['lng'] = geo_info['longitude']
            lat = geo_info['latitude']
            lng = geo_info['longitude']

            t1 = data['date']
            t2 = str(dt.strptime(t1,'%Y-%m-%d %H:%M:%S')+datetime.timedelta(seconds=1))

            geo_data.append({
                "type": "Feature",
                "geometry": {
                    "type": "MultiPoint",
                    "coordinates": [[lng,lat],[lng,lat]]
                },
                "properties": {
                    "time": [data['date_int']*1000,(data['date_int']+1)*1000]
                    # "time": [t1,t2]
                },
                "data": data
            })

    return HttpResponse(json.dumps({'len':len(geo_data)}), content_type='application/json; charset=UTF-8')
    # return HttpResponse(json.dumps(geo_data), content_type='application/json; charset=UTF-8')
    # return HttpResponse(json.dumps(geo_data[:100]), content_type='application/json; charset=UTF-8')

def all_data(request):
    start_time = request.GET.get('start_time')
    end_time = request.GET.get('end_time')
    category_list = request.GET.get('category')
    category_list = json.loads(category_list) if category_list else []

    # print category_list
    # print category_list[0]
    # print [category_list[0]]
    # print type(category_list[0])

    if u'其他' in category_list:
        category_list.remove(u'其他')
        category_list.append(u'疫情')
    # if u'A型肝炎' in category_list:
        # category_list.remove(u'A型肝炎')
        # category_list.append(u'肝炎')
        # category_list.append(u'A型')

    data_gtr = ptt_main.objects.all()
    data_gtr2 = disp_main.objects.all()
    if start_time:
        start_time = int(start_time) / 1000
        data_gtr = data_gtr.filter( tm__gte = start_time)
        data_gtr2 = data_gtr2.filter( tm__gte = start_time)
    # print len(heatmap_data)

    if end_time :
        end_time = int(end_time) / 1000
        data_gtr = data_gtr.filter( tm__lte = end_time )
        data_gtr2 = data_gtr2.filter( tm__lte = end_time )
    # print len(heatmap_data)

    heatmap_data = g0v_data.get_data( category_list, start_time, end_time )

    response_data = [
        get_dic(p)
        for (gtr, get_dic) in [ (data_gtr,get_ptt_dic), (data_gtr2,get_disp_dic) ]
        for p in gtr
        # if u'疫情' in p.content or belong_cat(p.content,category_list)
        # if u'疫情' in p.content
        if belong_cat(p.content,category_list) and value_check_pass(p,get_dic)
        ]

    for idx, data in enumerate(response_data):
        response_data[idx]['latitude'] = None
        response_data[idx]['longitude'] = None
        if data['ip']:
            geo_info = gi.record_by_name(data['ip'])
            response_data[idx]['latitude'] = geo_info['latitude']
            response_data[idx]['longitude'] = geo_info['longitude']
        response_data[idx]['category'] = labeling_content(data['content'],category_list)
        response_data[idx]['description'] = response_data[idx]['content']


    no_ip_data = [ r for r in response_data if r['ip'] == None ]
    ip_data = [ r for r in response_data if r['ip'] ]
    # response_data = no_ip_data[:100] + ip_data[:100]
    # response_data = ip_data[:5]
    # response_data = ip_data[:500]
    response_data = ip_data[:]

    response_data = sorted(response_data,key=lambda x: x['date_int'])

    # aaa = sum([ 1 for i in ptt_main.objects.all() if i.ip ])  # 4136
    # bbb = len(ip_data)                                        #  176? 174?
    # ccc = sum([ 1 for i in ptt_main.objects.all()  ])         # 7175
    # ddd = len(no_ip_data)                                     #  291
    # raise Exception('{}\n{}\n{}\n{}\n'.format(aaa,bbb,ccc,ddd))

    # print heatmap_data[0]

    return {
        'response_data': response_data,
        'heatmap_data': heatmap_data
    }

def get_all_data2(request):
    response_data = all_data(request)['response_data']
    return HttpResponse(json.dumps(response_data), content_type='application/json; charset=UTF-8')
    # return HttpResponse(json.dumps([{"N_instance":len(response_data)}]), content_type='application/json; charset=UTF-8')

def get_all_light_data2(request):
    data = all_data(request)
    # return HttpResponse(json.dumps([{"N_instance":len(response_data)}]), content_type='application/json; charset=UTF-8')
    # return HttpResponse(json.dumps(response_data), content_type='application/json; charset=UTF-8')
    for rd in data['response_data']:
        rd['description'] = rd['description'][:20]
        rd['content'] = ""
    a = json.dumps(data)
    # print a[57342:57342+100]
    # print a[57342-50:57342+100]

    # response_data = json.dumps(data)
    # response = HttpResponse(response_data, content_type='application/json; charset=UTF-8')
    # response['Content-Length'] = len(response_data)
    return return_response(data)

def get_content(request):
    url = request.GET.get('url')
    try:
        data = ptt_main.objects.get(url=url)
    except:
        data = None

    if data == None:
        try:
            data = disp_main.objects.get(url=url)
        except:
            data = None

    if data:
        return HttpResponse(data.content)
    else:
        return HttpResponse('None')


