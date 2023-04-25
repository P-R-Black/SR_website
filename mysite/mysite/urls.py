"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from django.contrib.sitemaps.views import sitemap
from home_page.sitemaps import PostSitemap
from django.views.generic.base import TemplateView
import environ

env = environ.Env()
environ.Env.read_env()

sitemaps = {
    'posts': PostSitemap,
}


urlpatterns = [
    path(env('SECRET_ADMIN_URL') + '/admin/', admin.site.urls),
    path('robots.txt', TemplateView.as_view(template_name='robots.txt', content_type='text/plain')),
    path('blog/', include('blog.urls', namespace='blog')),
    path('ckeditor', include('ckeditor_uploader.urls')),
    path('payments/', include('payments.urls', namespace='payments')),
    path('orders/', include('orders.urls', namespace='orders')),
    path('cart/', include('cart.urls', namespace='cart')),
    path('store/', include('store.urls', namespace='store')),
    path('insightsTwo/',include('insightsTwo.urls', namespace='insightsTwo')),
    path('', include('home_page.urls')),
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}, name="django.contrib.sitemaps.views.sitemap"),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)