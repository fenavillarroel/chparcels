#!/usr/bin/python

#import logging
#import sys
#logging.basicConfig(stream=sys.stderr)
#sys.path.insert(0, '/home/fernando/chparcels/')
#from app import app as application
#application.secret_key = 'anything you wish'

activate_this = '/home/fernando/chparcels/env/bin/activate_this.py'
with open(activate_this) as file_:
    exec(file_.read(), dict(__file__=activate_this))


import sys
import logging
logging.basicConfig(stream=sys.stderr)
sys.path.insert(0,"/home/fernando/chparcels/")

from app import app as application
application.secret_key = 'your secret key. If you share your website, do NOT share it with this key.'
