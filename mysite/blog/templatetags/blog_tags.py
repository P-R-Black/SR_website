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
    posts = Post.objects.all()
    tags = Tag.objects.all()
    for post in posts:
        cats_in_post = post.post_categories.all()
        for cat in cats_in_post.values():
            all_cat_names.append(cat['name'])


    tops = Counter(all_cat_names)
    top_five = tops.most_common(6)
    the_five = [top[0] for top in top_five]

    return the_five

# 'Investing': 5, 'Tech Investing': 5, 'Investments': 5, 
# 'Investment Education': 5, 'Investment Strategy': 5,
    



