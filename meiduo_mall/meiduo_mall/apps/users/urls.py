"""
@file:urls.py
@time:2021-03-23-13:55
"""
from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^register/$', views.RegisterView.as_view()),
]

