# Code to upload image from raspberry pi to AWS S3 bucket

import boto3
import boto.s3
import sys
from boto.s3.key import Key

#Environment variables for AWS Login
from config import AWS_ACCESS_KEY_ID
from config import AWS_SECRET_ACCESS_KEY


s3 = boto3.client('s3')

filename = 'capture.jpy'
