from django.shortcuts import render, redirect, get_object_or_404
from .models import Post
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .forms import EmailPostForm, SearchForm
from django.core.mail import send_mail
from taggit.models import Tag
from django.db.models import Count
from collections import Counter
from django.http import HttpResponse
from django.views import View
from django.contrib.postgres.search import SearchVector, SearchQuery, SearchRank
from django.core.cache import cache



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

    the_post = get_object_or_404(Post, slug=post, status='published', publish__year=year, publish__month=month, publish__day=day)
    
    if cache.get(the_post):
        post = cache.get(the_post)
    else:
        try:
            post = the_post
            cache.set(the_post, post)
        except Exception as e:
            return redirect('/')

    post_tags_ids = post.post_categories.values_list('id', flat=True)
    similar_posts = Post.published.filter(post_categories__in=post_tags_ids).exclude(id=post.id)
    similar_posts = similar_posts.annotate(same_tags=Count('post_categories')).order_by('-same_tags', '-publish')[:4]
    
    return render(request, 'blog/post/detail.html', {'post':post, 'similar_posts':similar_posts})


def by_categories(request, tag_slug):
    if tag_slug:
        tag = get_object_or_404(Tag, slug=tag_slug)

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


def post_search(request):
    form = SearchForm()
    query = None
    results = []
    if 'query' in request.GET:
        form = SearchForm(request.GET)
        if form.is_valid():
            query = form.cleaned_data['query']
            search_vector = SearchVector('title', 'body')
            search_query = SearchQuery(query)
            results = Post.published.annotate(
                search=search_vector, 
                rank=SearchRank(search_vector, search_query)).filter(search=search_query).order_by('-rank')
    
    all_cat_names = list()
    all_cat_slugs = list()

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
    
    return render(request, 'blog/post/search.html', {'form': form, 'query': query, 'results': results, 'all_cats': all_cats})
