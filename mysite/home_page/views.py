from django.shortcuts import render, redirect
from blog.models import Post
from store.models import Product
from .forms import ContactForm
from django.core.mail import send_mail, BadHeaderError
from django.http import HttpResponse


# Create your views here.
def home_page_view(request):
    last_three_post = Post.published.filter().order_by('-publish')[:3]
    product =  Product.objects.filter().order_by('id')[:1]
    for p in product:
        current_news = p
    
    return render(request, 'home_page/index.html', {'last_three_post': last_three_post, 'current_news': current_news})

def about_us_page_view(request):
    return render(request, 'home_page/about_us.html')

def disclaimers_view(request):
    return render(request, 'home_page/disclaimer.html')

def contact(request):
    # product =  Product.objects.filter().order_by('id')[:1]
    # if request.method == 'POST':
    #     form = ContactForm(request.POST)
    #     if form.is_valid():
    #         subject = 'Seville Report Inquiry'
    #         body = {
    #             'name': form.cleaned_data['name'],
    #             'email': form.cleaned_data['email_address'],
    #             'message': form.cleaned_data['message'],
    #         }
    #         message = '\n'.join(body.values())

    #         try:
    #             send_mail(subject, message, 'pblack@sevillereport.com', ['pblack@sevillereport.com'])
    #             print('subject:', subject, 'message:', message )
    #         except BadHeaderError:
    #             return HttpResponse('Invalid header found.')
    #         return redirect('home_page:home_page_view')

    # form = ContactForm()
    return render(request, 'home_page/contact.html', {'form': form})