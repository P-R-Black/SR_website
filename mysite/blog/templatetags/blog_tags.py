from django import template
from ..models import Post
# from django.db.models import Count
# from django.utils.safestring import mark_safe
# import markdown
from django.shortcuts import render, get_object_or_404
from ..blog import get_read_time
from django.utils.html import strip_tags
from collections import Counter
from django.db.models import Count

from taggit.models import Tag
register = template.Library()

@register.simple_tag
def total_posts():
    return Post.published.count()


@register.simple_tag
def total_categories():
    cat = list(Post.post_categories.all())
    post = list(Tag.objects.values())
    print(cat)
    for tag in cat:
        print('tag', tag)
    return Post.post_categories.count()
    # categories = []
    # for cat in Post.post_categories.values():
    #     test = Counter(cat)
    #     print('test', test)
        

    #     categories.append(cat['name'])
    # print('categories', categories)
    # return categories
    



