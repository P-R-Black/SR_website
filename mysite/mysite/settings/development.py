from pathlib import Path
from .base import *
import os
from dotenv import load_dotenv


# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': os.environ.get('DEV_DB_ENGINE'),
        'NAME': os.environ.get('DEV_DB_NAME'),
        'USER': os.environ.get('DEV_DB_USER'),
        'PASSWORD': os.environ.get('DEV_DB_PASSWORD'),
        'HOST': os.environ.get('DEV_DB_HOST'),
        'PORT': ''
    }
}