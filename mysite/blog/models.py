from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.urls import reverse

from ckeditor.fields import RichTextField

# Create your models here.
class PublishedManager(models.Manager):
    def get_queryset(self):
        return super(PublishedManager, self).get_queryset().filter(status='published')

        
class Post(models.Model):
    STATUS_CHOICE = (
        ('draft', 'Draft'),
        ('published', 'Published'),
        ('pending review', 'Pending Review'),
        ('scheduled', 'Scheduled'),
        ('trash', 'Trash')
        )
    
    title = models.CharField(max_length=250)
    subtitle = models.CharField(max_length=250, null=True, default="", blank=True)
    slug = models.SlugField(max_length=250, unique_for_date='publish')
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='blog_posts')
    overview = RichTextField(blank=True, null=True)
    body = RichTextField(blank=True, null=True)
    publish = models.DateTimeField(default=timezone.now)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=25, choices = STATUS_CHOICE, default='draft')
    post_image = models.ImageField(upload_to='blog_images/', default='default.jpeg')
    image_url = models.CharField(max_length=500, default=None, null=True, blank=True)

    class Meta:
        ordering = ('-publish',)

    def __str__(self):
        return self.title
        

    def get_absolute_url(self):
        return reverse('blog:post_detail', args=[self.slug, self.publish.year, self.publish.month, self.publish.day])

    objects = models.Manager()
    published = PublishedManager()