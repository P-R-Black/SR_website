from django.shortcuts import render, get_object_or_404
from .models import Post
# from .blog import get_read_time
from django.utils.html import strip_tags

# Create your views here.
def post_list(request):
   
    posts = Post.published.all()

    # new_times = get_read_time(posts)
    for post in posts:
        times = post.get_read_time(post.body)
        print('times', times)
    


    # for post in posts:
    #     the_body = post.body
    #     body = strip_tags(the_body)
    #     the_tile = post.title
    #     the_time = get_read_time(body)
        # print(f"\n\n\nTitle {the_tile}, Body {the_body}, Time {the_time}")


    return render(request, 'blog/post/blogs.html', {'posts': posts, 'times':times})


def post_detail(request, year, month, day, post):
    post = get_object_or_404(Post, slug=post, status='published', publish__year=year, publish__month=month, publish__day=day)
    
    time_to_read = post.get_read_time(post.body)
    
    return render(request, 'blog/post/detail.html', {'post':post, 'time_to_read': time_to_read})