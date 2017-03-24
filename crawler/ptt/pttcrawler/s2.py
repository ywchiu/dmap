# -*- coding: utf-8 -*-
import fbconsole

fbconsole.AUTH_SCOPE = ['publish_stream', 'publish_checkins']
#fbconsole.automatically_authenticate(
#    username,     # facebook username for authentication
#    password,     # facebook password for authentication
#    app_secret,   # "app secret" from facebook app settings
#    redirect_uri, # redirect uri specified in facebook app settings
#)
automatically_authenticate('kaikouu@gmx.com', 'fu06vm,6gj4','6878ca4f6efe699ad95e8915e3a3de05', 'http://www.opmonitor.com/',)
