from django.contrib.sitemaps import Sitemap


from blog.models import Post
from django.urls import reverse

class PostSitemap(Sitemap):
    changefreq = 'weekly'
    priority = 0.9

    def items(self):
        return Post.published.all()

    def lastmod(self, obj):
        return obj.updated
    

