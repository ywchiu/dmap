import requests
payload = {'from':'/bbs/Gossiping/index.html',
'yes':'yes'
}
rs = requests.session()
rs1 = rs.post('https://www.ptt.cc/ask/over18', data=payload, verify=False)
rs2 = rs.get('https://www.ptt.cc/bbs/Gossiping/index.html', verify=False)
print rs2.text
