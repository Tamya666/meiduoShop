"""
@file:urls.py
@time:2021-04-05-21:04
"""
from django.conf.urls import url

from . import views

urlpatterns = [
    # 省市区三级联动
    url(r'^areas/$', views.AreasView.as_view()),
]
