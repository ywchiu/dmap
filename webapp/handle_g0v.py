# -*- coding: utf-8 -*-
import pandas as pd
# import json
import codecs
import re
import calendar
from datetime import datetime as dt
import datetime
import json
import cPickle as pickle
import marshal

class g0v_data_handler(object):
    def __init__(self):
        self.filenames = [
            ('a.csv', 'big5'), # 確定病名   發病年份    發病月份    縣市  鄉鎮  性別  是否為境外移入 年齡層 確定病例數
            ('enterovirus.csv', 'big5'), # 確定病名 發病年份    發病月份    縣市  鄉鎮  性別  是否為境外移入 年齡層 確定病例數
            ('flu.csv', 'big5'), # 確定病名 發病年份    發病月份    縣市  鄉鎮  性別  是否為境外移入 年齡層 確定病例數
            ('dengue.csv', 'utf8'), # 發病日,個案研判日,通報日,性別,年齡層,居住縣市,居住鄉鎮,居住村里,最小統計區,最小統計區中心點X,最小統計區中心點Y,一級統計區,二級統計區,感染縣市,感染鄉鎮,感染村里,是否境外移入,感染國家,確定病例數,居住村里代碼,感染村里代碼,血清型,內政部居住縣市代碼,內政部居住鄉鎮代碼,內政部感染縣市代碼,內政部感染鄉鎮代碼
        ]
#         self.data_filename = "g0v_data.pickle"
        self.data_filename = "g0v_data.marshal"
        try:
#             with open(self.data_filename, "wb") as op:
# #                 self.g0v_data = pickle.load(op)
#                 self.g0v_data = marshal.load(op)
            self.g0v_data = pd.read_pickle(self.data_filename)
        except:
            self.pos_map1 = self.read_pos_map1()
            self.pos_map2 = self.read_pos_map2()
            self.pos_map3 = self.read_pos_map3()

            self.transform()

    def get_data(self,cat=[],start_time = None,end_time = None):
        query = self.g0v_data
        if len(cat) > 0:
            kw = u'|'.join(cat)
            query = query[ query['category'].str.contains(kw) ]

        if start_time:
            query = query[ query['tm'] >= start_time ]

        if end_time:
            query = query[ query['tm'] <= end_time ]

        return json.loads(query.to_json(orient="records"))


    def get_header(self,data):
        return list(data.columns.values)

    def read_pos_map1(self):
        with codecs.open('pos_map.txt','r',encoding='utf8') as op:
            data = op.read().split('\n')
    #         print data
            data = [ d.strip() for d in data if len(d.strip()) > 0 ]
    #     print data
        data = '[' + '\n'.join(data) + ']'
    #     print data
        data = json.loads(data)
        data = { d['name']:d['posn'] for d in data }
        return data

    def read_pos_map2(self):
        def dms_2_dd(list_data):
            return float(list_data[0]) + float(list_data[1])/60 + float(list_data[2])/3600
        data = {}
        with codecs.open('pos_map2.txt','r',encoding='utf8') as op:
            for line in op.read().split('\n'):
    #             print line
                line = line.strip().split()
                if len(line) >= 3:
                    lat = dms_2_dd(re.findall('\d+',line[-1]))
                    lng = dms_2_dd(re.findall('\d+',line[-2]))
                    loc = line[-3]
                    data[loc] = [ lat, lng ]
        return data

    def read_pos_map3(self):
        return {
            u'桃園市觀音區': [25.0359365,121.11375440000006],
            u'嘉義市東區': [23.4800663,120.44910540000001],
            u'金門縣金沙鎮': [24.4811092,118.42799330000003],
            u'桃園市龍潭區': [24.8444927,121.20539630000007],
            u'金門縣其他': [24.457, 118.358],
            u'桃園市新屋區': [24.9826597,121.06790699999999],
            u'連江縣南竿鄉': [26.160198,119.95137109999996],
            u'金門縣金城鎮': [24.4113998,118.31697140000006],
            u'桃園市蘆竹區': [25.0784359,121.29696739999997],
            u'花蓮縣玉里鎮': [23.3326186,121.31582219999996],
            u'桃園市八德區': [24.9469059,121.29124630000001],
            u'嘉義市西區': [23.4803964,120.42424010000002],
            u'新竹市東區': [24.7920604,120.99336779999999],
            u'新竹市北區': [24.8238676,120.94747469999993],
            u'桃園市中壢區': [24.9721514,121.20539630000007],
            u'桃園市桃園區': [24.9934099,121.29696739999997],
            u'桃園市龜山區': [25.0199092,121.36559890000001],
            u'雲林縣莿桐鄉': [23.7554232,120.49672220000002],
            u'桃園市平鎮區': [24.9296022,121.20539630000007],
            u'高雄市林園區': [22.4986756,120.4011911],
            u'台東縣關山鎮': [23.0170591,121.18249249999997],
            u'嘉義市其他': [23.4790323,120.414191],
            u'澎湖縣西嶼鄉': [23.6054584,119.51367110000001],
            u'桃園市大溪區': [24.8658422,121.29696739999997],
            u'新竹市其他': [24.7849112,120.886264],
            u'台北市其他': [25.085651,121.4228188],
            u'桃園市大園區': [25.0492632,121.19394499999999],
            u'金門縣金湖鎮': [24.4376913,118.42799330000003],
            u'嘉義縣其他': [23.4257424,120.256661],
            u'台東縣蘭嶼鄉': [22.0269018,121.54159679999998],
            u'桃園市楊梅區': [24.9242108,121.13667150000003],
            u'桃園市復興區': [24.709089,121.3770336],
            u'金門縣金寧鄉': [24.4565774,118.30585150000002],
            u'金門縣烈嶼鄉': [24.4288569,118.24754580000001],
        }

    def pos_map(self,loc):
        if loc in self.pos_map1:
            return self.pos_map1[loc]

        if loc in self.pos_map2:
            return self.pos_map2[loc]

        if loc in self.pos_map3:
            return self.pos_map3[loc]

    def transform(self):
        self.g0v_data = []
        for filename, enc in self.filenames:
            data = pd.read_csv(filename, encoding=enc)
            if filename == 'dengue.csv':
#                 {
#                     'date':'發病日,  1998/01/02
#                     'tm': int of time,
#                     'loc': 居住縣市,居住鄉鎮
#                     'latitude':, 最小統計區中心點Y
#                     'longitude':, 最小統計區中心點X,
#                     'category': u'登革樂',
#                     'frequency': 確定病例數
#                 }

                for idx in data.index:
                    date = data[u'發病日'][idx]
                    date = dt.strptime(date,'%Y/%m/%d')
                    tm = (date-dt(1970,1,1)).total_seconds()

                    location = data[u'居住縣市'][idx] + data[u'居住鄉鎮'][idx]
                    lat = data[u'最小統計區中心點Y'][idx]
                    lng = data[u'最小統計區中心點X'][idx]

                    if pd.isnull(lat) or pd.isnull(lng):
                        lat,lng = self.pos_map(location)

                    category = u'登革熱'
                    frequency = data[u'確定病例數'][idx]

                    self.g0v_data.append({
                            'date': str(date),
                            'tm': tm,
                            'loc': location,
                            'latitude': lat,
                            'longitude': lng,
                            'category': category,
                            'frequency': frequency,
                        })
            else:
#                 {
#                     'date':'2014/5/31',
#                     'tm': int of time,
#                     'loc': u'台北市大安區', 縣市,鄉鎮
#                     'latitude':,
#                     'longitude':,
#                     'category':, 確定病名
#                     'frequency': 確定病例數
#                 }
                for idx in data.index:
                    year = data[u'發病年份'][idx]
                    month = data[u'發病月份'][idx]
                    day = calendar.monthrange(year,month)[1]
                    date = dt.strptime('{}/{}/{}'.format(year,month,day),'%Y/%m/%d')
                    tm = (date-dt(1970,1,1)).total_seconds()

                    location = data[u'縣市'][idx] + data[u'鄉鎮'][idx]
#                     print location
                    lat,lng = self.pos_map(location)

                    category = data[u'確定病名'][idx] if filename != 'a.csv' else u'A型肝炎'
                    frequency = data[u'確定病例數'][idx]

                    self.g0v_data.append({
                            'date': str(date),
                            'tm': tm,
                            'loc': location,
                            'latitude': lat,
                            'longitude': lng,
                            'category': category,
                            'frequency': frequency,
                        })
#         print self.g0v_data
#         with open(self.data_filename, "wb") as op:
# #             pickle.dump(self.g0v_data, op)
#             marshal.dump(self.g0v_data, op)
        self.g0v_data = pd.DataFrame(self.g0v_data)
        self.g0v_data.to_pickle(self.data_filename)



if __name__ == '__main__':
    g0v_data = g0v_data_handler()
    print g0v_data.pos_map(u'金門縣金沙鎮')
    tmp = [ d for d in g0v_data.g0v_data if u'登革熱' in d['category'] ]
    print tmp[0]
