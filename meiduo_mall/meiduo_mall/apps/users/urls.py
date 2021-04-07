"""
@file:urls.py
@time:2021-03-23-13:55
"""
from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^register/$', views.RegisterView.as_view(), name="register"),
    # 判断用户名是否重复注册
    url(r'^usernames/(?P<username>[a-zA-Z0-9_-]{5,20})/count/$', views.UsernameCountView.as_view()),
    # 判断用户名是否重复注册
    url(r'^mobiles/(?P<mobile>1[3-9]\d{9})/count/$', views.MobileCountView.as_view()),
    url(r'^login/$', views.LoginView.as_view(), name='login'),
    url(r'^logout/$', views.LogoutView.as_view(), name='logout'),
    url(r'^info/$', views.UserInfoView.as_view(), name='info'),
    url(r'^emails/$', views.EmailView.as_view(), name='emails'),
    url(r'^emails/verification/$', views.VerifyEmailView.as_view()),
    url(r'^addresses/$', views.AddressView.as_view(), name='address'),
    # 新增用户地址
    url(r'^addresses/create/$', views.AddressCreateView.as_view()),
    # 更新和删除地址
    url(r'^addresses/(?P<address_id>\d+)/$', views.UpdateDestroyAddressView.as_view()),
    # 设置默认地址
    url(r'^addresses/(?P<address_id>\d+)/default/$', views.DefaultAddressView.as_view()),
    # # 更新地址标题
    url(r'^addresses/(?P<address_id>\d+)/title/$', views.UpdateTitleAddressView.as_view()),
]
