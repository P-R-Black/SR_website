# Generated by Django 4.1.1 on 2023-02-16 13:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0010_post_time'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='time',
        ),
    ]
