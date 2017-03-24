#
#    fbcrawler.py - simple facebook crawler to generate network graph with nodexl/pajek
#    Copyright (C) 2010 David Gross
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU General Public License as published by
#    the Free Software Foundation, either version 3 of the License, or
#    (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU General Public License for more details.
#
#    You should have received a copy of the GNU General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.
#

import cookielib
import os
import urllib
import urllib2
import re

fb_username = "kaikouu@gmx.com"
fb_password = "fu06vm,6gj4"
fb_name = "kaikouu"
fb_myid = "kaikouu"

cookie_filename = "facebook.cookies"
next_id = 1

class Node(object):
    def __init__(self, fb_id, name, dist):
        global next_id
        
        self.id = next_id
        self.fb_id = fb_id
        self.name = name
        self.dist = dist
        self.photos = False
        self.info = False
        self.friendlist = False
        self.to = []
        
        next_id = next_id + 1
        
    def addTie(self, dst):
        if not dst in self.to:
            self.to.append(dst)
        
class Network(object):
    def __init__(self):
        self.nodes = dict()
        
    def addNode(self, id, name, dist):
        if not self.nodes.has_key(id):
            self.nodes[id] = Node(id, name, dist)

    def addTie(self, id1, id2):
        if id1 < id2:
            src = id1
            dst = id2
        else:
            src = id2
            dst = id1
            
        self.nodes[src].addTie(dst)
        
    def getFriendsID(self, dist):
        fids = []
        for k,v in self.nodes.iteritems():
            if v.dist == dist:
                fids.append(k)
        return fids
        
    def toCSV(self):
        buff = ""
        
        for k,v in self.nodes.iteritems():
            if v.dist > 1:
                continue
                
            buff = buff + v.fb_id + ","
            
            if v.dist == 0:
                buff = buff + "Red,,3,,,,"
            elif v.photos:
                buff = buff + "Red,,2,,,,"
            else:
                buff = buff + "Lime,,2,,,,"
                
            buff = buff + v.name + "\n"
            
        for k,v in self.nodes.iteritems():
            if v.dist > 1:
                continue
        
            dsts = v.to
            for dst in dsts:
                if self.nodes[dst].dist > 1:
                    continue
                buff = buff + v.fb_id + "," + dst + "\n"
                
        f = open('dump.csv', 'w')
        f.write(buff)
        f.close()
    
    def toPajek(self):
        fids = self.getFriendsID(1) 
        buff = "*vertices " + str(len(fids) + 1) + "\n*edges\n"
        
        for k,v in self.nodes.iteritems():
            if v.dist > 1:
                continue
                
            for dst in v.to:
                if self.nodes[dst].dist > 1:
                    continue
                    
                buff = buff + str(v.id) + " " + str(self.nodes[dst].id) + "\n"
        
        f = open('dump.net', 'w')
        f.write(buff)
        f.close()
        
    def toRaw(self):
        buff = "#id,dist,photos,info,friendlist\n"
        
        for k,v in self.nodes.iteritems():
            buff = buff + v.fb_id + "," + str(v.dist) + "," + str(v.photos) + "," + str(v.info) + "," + str(v.friendlist) + "\n"
        
        f = open('dump.txt', 'w')
        f.write(buff)
        f.close()
    
class Facebook(object):
    def __init__(self, login, password, name, id):
        self.login = login
        self.password = password
        self.id = id
        self.network = Network()
        self.network.addNode(id, name, 0)

        self.cj = cookielib.MozillaCookieJar(cookie_filename)
        if os.access(cookie_filename, os.F_OK):
            self.cj.load()
            
        self.opener = urllib2.build_opener(
            urllib2.HTTPRedirectHandler(),
            urllib2.HTTPHandler(debuglevel = 0),
            urllib2.HTTPSHandler(debuglevel = 0),
            urllib2.HTTPCookieProcessor(self.cj)
        )
        self.opener.addheaders = [('User-agent', ('Mozilla/5.0'))]

        self.authenticate()
        self.authenticate()
        self.cj.save()
        self.getAccessToken()

    def authenticate(self):
        login_data = urllib.urlencode({
            'email' : self.login,
            'pass' : self.password,
        })
        response = self.opener.open("https://login.facebook.com/login.php", login_data)
        return ''.join(response.readlines())

    def getAccessToken(self):
        response = self.opener.open("https://developers.facebook.com/docs/graph-api")
        data = ''.join(response.readlines())
        res = re.findall(r"""Friends: <a href=\"https://graph.facebook.com/me/friends\?access_token=(.+?)\">""", data)
        if len(res) < 1:
            print("getAccessToken fails")
            exit(1)
        self.access_token = res[0]
                    
    def getMyFriends(self):
        response = self.opener.open("https://graph.facebook.com/me/friends?access_token=" + self.access_token)
        data = ''.join(response.readlines())
        friends = re.findall(r"""\"name\":\s*\"(.+?)\",\s*\"id\":\s*\"(\d+)\"""", data, re.M)
        print("getMyFriends found " + str(len(friends)) + " friends")
        for f in friends:
            self.network.addNode(f[1], f[0], 1)
            self.network.addTie(self.id, f[1])
    
    def getFriends(self, dist):
        if dist == 1:
            return self.getMyFriends()

        fids = self.network.getFriendsID(dist - 1)        
        i = 0
        while i < len(fids):
            print("getFriends " + str(i) + "/" + str(len(fids) - 1) + "...")
            
            try:
                fid = fids[i]
                response = self.opener.open("http://www.facebook.com/friends/?id=" + fid + "&view=everyone")
                data = ''.join(response.readlines())
                friends = re.findall(r"""<div class=\\\"ffriend clearfix\\\" id=\\\"f(\d+)\\\"""", data)
                if len(friends) > 0:
                    self.network.nodes[fid].friendlist = True
                for f in friends:
                    self.network.addNode(f, "", dist)
                    self.network.addTie(fid, f)
                i = i + 1
            except:
                pass
                
    def accessPhotos(self, dist):
        fids = self.network.getFriendsID(dist) 
        i = 0
        while i < len(fids):
            print("access photos " + str(i) + "/" + str(len(fids) - 1) + "...")
            
            try:
                fid = fids[i]
                response = self.opener.open("http://www.facebook.com/profile.php?id=" + fid + "&v=photos")
                data = ''.join(response.readlines())
                newurl = re.search(r"window.location.replace\(\"(.+?)\"\)", data)
                if re.search(r"/(photo|album)\.php", data):
                    self.network.nodes[fid].photos = True
                elif newurl:
                    newurl = str.replace(newurl.group(1), "\\/", "/")
                    response = self.opener.open(newurl)
                    data = ''.join(response.readlines())
                    if re.search(r"/(photo|album)\.php", data):
                        self.network.nodes[fid].photos = True
                i = i + 1
            except:
                pass

    def accessInfo(self, dist):
        fids = self.network.getFriendsID(dist) 
        i = 0
        while i < len(fids):
            print("access info " + str(i) + "/" + str(len(fids) - 1) + "...")
            
            try:
                fid = fids[i]
                response = self.opener.open("http://www.facebook.com/profile.php?id=" + fid + "&v=info")
                data = ''.join(response.readlines())
                newurl = re.search(r"window.location.replace\(\"(.+?)\"\)", data)
                if re.search(r"<th class=\\\"label\\\">(Movies|Music|Television|Interests)<\\/th>", data):
                    self.network.nodes[fid].info = True
                elif newurl:
                    newurl = str.replace(newurl.group(1), "\\/", "/")
                    response = self.opener.open(newurl)
                    data = ''.join(response.readlines())
                    if re.search(r"<th class=\\\"label\\\">(Movies|Music|Television|Interests)<\\/th>", data):
                        self.network.nodes[fid].info = True
                i = i + 1
            except:
                pass

    def getSocialNetwork(self, dist):
        for i in range(1, dist + 1):
            self.getFriends(i)
            #self.accessPhotos(i)
            #self.accessInfo(i)
            
        return self.network

fb = Facebook(fb_username, fb_password, fb_name, fb_myid)
network = fb.getSocialNetwork(2)
network.toCSV()
network.toPajek()
network.toRaw()
