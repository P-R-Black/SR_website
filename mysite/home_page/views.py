from django.shortcuts import render
from blog.models import Post
from store.models import Product

# Create your views here.
def home_page_view(request):
    last_three_post = Post.published.filter().order_by('-publish')[:3]
    product =  Product.objects.filter().order_by('id')[:1]
    for p in product:
        current_news = p
    
    return render(request, 'home_page/index.html', {'last_three_post': last_three_post, 'current_news': current_news})
