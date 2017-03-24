import requests
from bs4 import BeautifulSoup
payload = {'from':'/bbs' + 'https://www.ptt.cc/bbs/Gossiping'.split('/bbs')[1],'yes':'yes'}
rs = requests.session()
response = rs.post('https://www.ptt.cc/ask/over18', data=payload, verify=False)
rs = rs.get('https://www.ptt.cc/bbs/Gossiping/M.1412877197.A.D3E.html', verify=False)
soup = BeautifulSoup(rs.text)
meta = soup.select('.article-metaline')
print len(meta)
print meta[0].text
content_v = soup.select('#main-content')[0].text
#try:
#    content = content_v[4].strip().encode('utf-8')
#except:
#    content = content_v[5].strip().encode('utf-8'
print content_v
#[4].strip().encode('utf-8')
