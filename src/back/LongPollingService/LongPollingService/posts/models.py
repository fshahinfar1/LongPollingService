# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
from django.utils.translation import ugettext_lazy as _


class Posts(models.Model):
    title = models.CharField(max_length=200, verbose_name=_('Title'))
    description = models.TextField(max_length=2000, verbose_name=_('Description'))
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_('Created at'))

    def __str__(self):
        return self.title

