from django.urls import path
from . import views


urlpatterns = [
    path('blogs/', views.BlogPostAPIView.as_view(), name='blog-list-create'),
    path('blogs/<int:pk>/', views.BlogPostDetailAPIView.as_view(), name='blog-details'),
    path('blogs/slug/<slug:slug>/', views.BlogPostSlugAPIView.as_view(), name='blog-slug-details'),
    path('blogs/filter/', views.FilteredBlogPostAPIView.as_view(), name='blog-filtered'),
    path('blogs/<int:pk>/like/', views.LikePostAPIView.as_view(), name='blog-like'),
    path('blogs/<int:pk>/bookmark/', views.BookmarkPostAPIView.as_view(), name='blog-bookmark'),
    path('user/drafts/', views.UserDraftPostsAPIView.as_view(), name='user-draft-posts'),
    path('user/bookmarks/', views.UserBookmarksAPIView.as_view(), name='user-bookmarks'),
    path('user/info/', views.UserInfoAPIView.as_view(), name='user-info'),
]
