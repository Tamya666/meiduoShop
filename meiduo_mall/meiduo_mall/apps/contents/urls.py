"""
@file:urls.py
@time:2021-03-23-13:55
"""
from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.IndexView.as_view(), name='index'),
]

