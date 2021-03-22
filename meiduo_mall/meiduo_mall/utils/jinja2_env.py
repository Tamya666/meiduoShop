"""
@file:jinja2_env.py
@time:2021-03-22-12:55
"""
from jinja2 import Environment
from django.contrib.staticfiles.storage import staticfiles_storage
from django.urls import reverse


def jinja2_environment(**options):
    """
    jinja2环境
    :param options:
    :return:
    """
    # 1、创建环境对象
    env = Environment(**options)
    # 2、自定义语法
    env.globals.update({
        'static': staticfiles_storage.url,  # 获取静态文件前缀
        'url': reverse,  # 反向解析
    })
    # 3、返回环境对象
    return env
