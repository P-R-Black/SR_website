from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.urls import reverse
from ckeditor.fields import RichTextField
from ckeditor_uploader.fields import RichTextUploadingField
# from taggit.managers import TaggableManager



from django.utils.html import strip_tags




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
    post_header_image = models.ImageField(upload_to='blog_images/', default='default.jpeg')
    post_images = RichTextUploadingField()
    image_url = models.CharField(max_length=500, default=None, null=True, blank=True)
    # categories = 

    class Meta:
        ordering = ('-publish',)

    def __str__(self):
        return self.body

    def get_absolute_url(self):
        return reverse('blog:post_detail', args=[self.slug, self.publish.year, self.publish.month, self.publish.day])

    def get_word_count(self, body):
        letters = 0
        words = 1
        sentence = 0
        for i in range(len(body)):
            if body[i].isalpha():
                letters += 1
            elif body[i] == " ":
                words += 1
            elif body[i] == '.' or body[i] == '?' or body[i] == '!':
                sentence += 1
        
        print('words', words)

        return words

    def get_read_time(self, the_text):
        word_count = self.get_word_count(the_text)
        print('word_count', word_count)

        time_taken = word_count / 200
        print('time_taken', time_taken)

        whole_number = int(time_taken)
        decimal_nums = (time_taken % 1) * .60

        
        if decimal_nums > .30:
            time_to_read = whole_number + 1
        else:
            time_to_read = whole_number

        print('time_to_read', time_to_read, 'Minutes')
        return time_to_read


    objects = models.Manager()
    published = PublishedManager()
 
