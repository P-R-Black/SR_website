from django.urls import path
from . import views

app_name = 'blog'

urlpatterns = [
    path('', views.post_list, name='post_list'),
    path('post_category/<slug:tag_slug>/', views.post_list, name='post_list_by_tag'),
    path('<slug:post>/<int:year>/<int:month>/<int:day>', views.post_detail, name='post_detail'),
    path('<int:post_id>/share/', views.post_share, name='post_share')
]

