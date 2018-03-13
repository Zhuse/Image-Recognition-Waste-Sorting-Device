#Modified from https://stackoverflow.com/questions/15085864/how-to-upload-a-file-to-directory-in-s3-bucket-using-boto
# Code to upload image from raspberry pi to AWS S3 bucket

import boto3
import boto.s3
import sys
from boto.s3.key import Key

#Environment variables for AWS Login
from config import AWS_ACCESS_KEY_ID
from config import AWS_SECRET_ACCESS_KEY

bucket_name = AWS_ACCESS_KEY_ID.lower() + '-dump'
conn = boto.connect_s3(AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY)

bucket = conn.create_bucket(bucket_name, 
        location=boto.s3.connection.Location.DEFAULT)

testfile = ''
print 'Upload image....'

def percent_cb(complete, total):
    sys.stdout.write('.')
    sys.stdout.flush()


s3 = boto3.client('s3')

filename = 'capture.jpy'
