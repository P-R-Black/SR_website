# Generated by Django 4.1.1 on 2023-04-05 16:14

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='SectorName',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sector_name', models.CharField(max_length=50)),
                ('slug', models.SlugField(max_length=70, unique=True)),
                ('sector_image', models.ImageField(blank=True, upload_to='sector_images')),
            ],
            options={
                'ordering': ('sector_name',),
                'index_together': {('id', 'slug')},
            },
        ),
    ]
