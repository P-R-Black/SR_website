# Generated by Django 4.1.1 on 2023-02-12 20:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0006_alter_post_subtitle'),
    ]

    operations = [
        migrations.RenameField(
            model_name='post',
            old_name='post_image',
            new_name='post_header_image',
        ),
        migrations.AddField(
            model_name='post',
            name='post_images',
            field=models.ImageField(default='default.jpeg', upload_to='blog_images/'),
        ),
    ]
