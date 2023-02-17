from django import template
from ..models import Post
# from django.db.models import Count
# from django.utils.safestring import mark_safe
# import markdown
from django.shortcuts import render, get_object_or_404
from ..blog import get_read_time
from django.utils.html import strip_tags


register = template.Library()

@register.simple_tag
def total_posts():
    return Post.published.count()



