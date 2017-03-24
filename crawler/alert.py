import smtplib
from smtplib import SMTP
from email.MIMEMultipart import MIMEMultipart
from email.MIMEBase import MIMEBase
from email.MIMEText import MIMEText
from email.Utils import COMMASPACE, formatdate
from email import Encoders
import os
import mimetypes
class alert(object):
    def __init__(self, to, fro, subject, text):
        self.to = to
        self.fro = fro
        self.subject = subject
        self.text = text
        self.server = 'localhost'

    def sendMail(self, filename ,server="localhost"):
        msg = MIMEMultipart()
        msg['From']    = self.fro
        msg['To']      = ', '.join(self.to)
        msg['Date']    = formatdate(localtime=True)
        msg['Subject'] = self.subject
        fileToSend = filename 
    
        text = self.text 
        
        # Set text/plain 
        text_part = MIMEText(text, 'plain')
        
        msg.attach(text_part)
        ctype, encoding = mimetypes.guess_type(fileToSend)
        if ctype is None or encoding is not None:
            ctype = "application/octet-stream"
        maintype, subtype = ctype.split("/", 1)
        if maintype == "text":
            fp = open(fileToSend)
            attachment = MIMEText(fp.read(), _subtype=subtype)
            fp.close()
        attachment.add_header("Content-Disposition", "attachment", \
            filename=fileToSend.split('/')[-1])

        msg.attach(attachment)    
        message = msg.as_string() 
        message = message + text
        server = smtplib.SMTP('localhost', 25)
        server.set_debuglevel(1)
        server.ehlo
        
        server.sendmail(self.fro, self.to, message)
        server.quit()
