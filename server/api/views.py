from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import BlogPost, Like, Bookmark
from .serializers import BlogPostSerializer, BookmarkSerializer, UserFullInfoSerializer
from users.models import User
from rest_framework.permissions import IsAuthenticated
from users.serializers import UserSerializer


class BlogPostAPIView(generics.ListCreateAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class BlogPostSlugAPIView(generics.RetrieveAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'

class BlogPostDetailAPIView(generics.RetrieveAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer


class FilteredBlogPostAPIView(generics.ListAPIView):
    serializer_class = BlogPostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = BlogPost.objects.all()
        slug = self.request.query_params.get('slug')
        filter_type = self.request.query_params.get('filter')
        limit = self.request.query_params.get('limit')

        if slug:
            queryset = queryset.filter(category__slug__iexact=slug)

        if filter_type == 'recent':
            queryset = queryset.order_by('-created_at')

        # Apply distinct BEFORE slicing
        queryset = queryset.distinct()

        if limit and limit.isdigit():
            queryset = queryset[:int(limit)]

        return queryset


class LikePostAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            post = BlogPost.objects.get(pk=pk)
        except BlogPost.DoesNotExist:
            return Response({'detail': 'Post not found.'}, status=status.HTTP_404_NOT_FOUND)

        user = request.user
        like, created = Like.objects.get_or_create(post=post, user=user)
        if not created:
            # Already liked, so unlike
            like.delete()
            liked = False
        else:
            liked = True
        return Response({
            'liked': liked,
            'total_likes': post.total_likes,
            'message': 'Post liked.' if liked else 'Like removed.'
        }, status=status.HTTP_200_OK)


class BookmarkPostAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            post = BlogPost.objects.get(pk=pk)
        except BlogPost.DoesNotExist:
            return Response({'detail': 'Post not found.'}, status=status.HTTP_404_NOT_FOUND)

        user = request.user
        bookmark, created = Bookmark.objects.get_or_create(post=post, user=user)
        if not created:
            # Already bookmarked, so unbookmark
            bookmark.delete()
            bookmarked = False
        else:
            bookmarked = True
        total_bookmarks = Bookmark.objects.filter(post=post).count()
        return Response({
            'bookmarked': bookmarked,
            'total_bookmarks': total_bookmarks,
            'message': 'Post bookmarked.' if bookmarked else 'Bookmark removed.'
        }, status=status.HTTP_200_OK)


class UserDraftPostsAPIView(generics.ListAPIView):
    serializer_class = BlogPostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return BlogPost.objects.filter(author=self.request.user, status=BlogPost.Status.DRAFT)

class UserBookmarksAPIView(generics.ListAPIView):
    serializer_class = BookmarkSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Bookmark.objects.filter(user=self.request.user).select_related('post')


class UserInfoAPIView(generics.RetrieveAPIView):
    serializer_class = UserFullInfoSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
<<<<<<< HEAD
=======


class IsAuthorOrReadOnly(permissions.BasePermission):
    """Custom permission to only allow authors of a blog post to edit it."""
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True
        # Write permissions are only allowed to the author of the post.
        return obj.author == request.user

class BlogPostUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    permission_classes = [permissions.IsAuthenticated, IsAuthorOrReadOnly]

class BlogPostDeleteAPIView(generics.DestroyAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    permission_classes = [permissions.IsAuthenticated, IsAuthorOrReadOnly]
>>>>>>> c841de7 (Initial commit from second computer)
