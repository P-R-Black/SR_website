from django.shortcuts import render, get_object_or_404
from .models import Post
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .forms import EmailPostForm
from django.core.mail import send_mail
from taggit.models import Tag
from django.db.models import Count
from collections import Counter

# Create your views here.
def post_list(request,tag_slug=None):
    object_list = Post.published.all()

    post_category = None

    if tag_slug:
        post_category = get_object_or_404(Tag, slug=tag_slug)
      
    object_list.filter(post_categories__in=[post_category])

    paginator = Paginator(object_list, 10)
    page = request.GET.get('page')
    try:
        posts = paginator.page(page)

    except PageNotAnInteger:
        posts = paginator.page(1)
    except EmptyPage:
        posts = paginator.page(paginator.num_pages)
    
   
    return render(request, 'blog/post/blogs.html', 
    {'page': page, 
    'posts': posts,
    'post_category': post_category })


def post_detail(request, year, month, day, post):
    post = get_object_or_404(Post, slug=post, status='published', publish__year=year, publish__month=month, publish__day=day)
    
    post_tags_ids = post.post_categories.values_list('id', flat=True)
    similar_posts = Post.published.filter(post_categories__in=post_tags_ids).exclude(id=post.id)
    similar_posts = similar_posts.annotate(same_tags=Count('post_categories')).order_by('-same_tags', '-publish')[:4]
    
    return render(request, 'blog/post/detail.html', {'post':post,'similar_posts': similar_posts})


def post_share(request, post_id):
    post = get_object_or_404(Post, id=post_id, status='published')
    sent = False
    if request.method == 'POST':
        form = EmailPostForm(request.POST)
        if form.is_valid():
            cd = form.cleaned_data
            post_url = request.build_absolute_uri(post.get_absolute_url())
            subject = f"{cd['name']} recommends you read {post.title}"
            message = f"Read {post.title} at {post_url}\n\n{cd['name']}\'s comments: {cd['comments']}"
            send_mail(subject, message, 'sevillereport.gmail.com', [cd['to']])
            sent = True
    else:
        form = EmailPostForm()
    return render(request, 'blog/post/share.html', {'post': post, 'form': form, 'sent': sent})


def by_categories(request, tag_slug):
    if tag_slug:
        tag = get_object_or_404(Tag, slug=tag_slug)
        print('tag', tag)

    posts = Post.published.filter(post_categories=tag).order_by('-publish')
    similar_posts = posts.annotate(same_tags=Count('post_categories')).order_by('-same_tags', '-publish')

    paginator = Paginator(posts, 10)
    page = request.GET.get('page')
    try:
        posts = paginator.page(page)

    except PageNotAnInteger:
        posts = paginator.page(1)
    except EmptyPage:
        posts = paginator.page(paginator.num_pages)
    
    return render(request, 'blog/post/categories.html',
     {
        'tag': tag, 
        'similar_posts': similar_posts, 
        'page': page, 
        'posts': posts, 
    })

def all_categories(request):
    all_cat_names = list()
    all_cat_slugs = list()

    posts = Post.objects.all()
    tags = Tag.objects.all()
    for tag in tags.values():
        if tag['name'] not in all_cat_names:
            all_cat_names.append(tag['name'])
            all_cat_slugs.append(tag['slug'])


    all_cats = {}
    for i in all_cat_names:
        for cat in tags.values():
            if i == cat['name']:
                all_cats[i] = cat['slug']


    return render(request, 'blog/post/all.html', {'all_cats': all_cats})