from django.shortcuts import render, get_object_or_404
from .models import Post
from .blog import PostStats


# Create your views here.
def post_list(request):
    posts = Post.published.all()

   
    return render(request, 'blog/post/blogs.html', {'posts': posts})

def post_detail(request, year, month, day, post):
    post = get_object_or_404(Post, slug=post, status='published', publish__year=year, publish__month=month, publish__day=day)

    text = post.body
    letters = 0
    words = 1
    sentence = 0
    for i in range(len(text)):
        if text[i].isalpha():
            letters += 1
        elif text[i] == " ":
            words += 1
        elif text[i] == '.' or text[i] == '?' or text[i] == '!':
            sentence += 1

    time_taken = words / 200
    whole_number = int(time_taken)
    decimal_nums = (time_taken % 1) * .60

    if decimal_nums > .30:
        time_to_read = whole_number + 1
    else:
        time_to_read = whole_number


   
    return render(request, 'blog/post/detail.html', {'post':post, 'time_to_read': time_to_read})