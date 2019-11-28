# -*- coding: utf-8 -*-
from rest_framework import viewsets

from .models import Posts
from .serializers import PostSerializer


class PostViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows posts to be viewed or edited.
    """
    queryset = Posts.objects.all().order_by('created_at')
    serializer_class = PostSerializer
