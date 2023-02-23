from django import template
from ..models import Post
from collections import Counter
from taggit.models import Tag


register = template.Library()

@register.simple_tag
def total_posts():
    return Post.published.count()


@register.simple_tag
def total_categories():
    all_cat_names = list()
    all_cat_slugs = list()

    posts = Post.objects.all()
    tags = Tag.objects.all()
    for post in posts:
        cats_in_post = post.post_categories.all()
        for cat in cats_in_post.values():
            all_cat_names.append(cat['name'])
            all_cat_slugs.append(cat['slug'])


    tops = Counter(all_cat_names)
    top_five = tops.most_common(6)
    the_five_cats = [top[0] for top in top_five]
    the_five = {}
    for i in the_five_cats:
        for cat in cats_in_post.values():
            if i == cat['name']:
                the_five[i] = cat['slug']

    return the_five

@register.simple_tag
def all_categories():
    return Tag.published.all()




