from pathlib import Path
from .base import *
import os
from dotenv import load_dotenv


# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2', # os.environ.get('DEV_DB_ENGINE'),
        'NAME': 'blog_database', # os.environ.get('DEV_DB_NAME'),
        'USER': 'blog_database_user', # os.environ.get('DEV_DB_USER'),
        'PASSWORD': 'paulblack123', # os.environ.get('DEV_DB_PASSWORD'),
        'HOST': 'localhost', # os.environ.get('DEV_DB_HOST'),
        'PORT': ''
    }
}