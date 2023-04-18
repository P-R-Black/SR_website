from django.urls import path
from . import views
from .feeds import LatestPostFeed

app_name = 'blog'

urlpatterns = [
    path('', views.post_list, name='post_list'),
    path('post_category/<slug:tag_slug>/', views.post_list, name='post_list_by_tag'),
    path('<slug:post>/<int:year>/<int:month>/<int:day>', views.post_detail, name='post_detail'),
    path('categories/<slug:tag_slug>/', views.by_categories, name='by_categories'),
    path('all/', views.all_categories, name='all_categories'),
    path('feed/', LatestPostFeed(), name='post_feed'),
    path('search/', views.post_search, name='post_search'),

]

