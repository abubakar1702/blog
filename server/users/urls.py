from django.urls import path
<<<<<<< HEAD
from .views import RegisterAPIView, LogoutAPIView, LoginAPIView
=======
from .views import RegisterAPIView, LogoutAPIView, LoginAPIView, ProfileView
>>>>>>> c841de7 (Initial commit from second computer)

urlpatterns = [
    path('auth/register/', RegisterAPIView.as_view(), name='register'),
    path('auth/login/', LoginAPIView.as_view(), name='login'),
    path('auth/logout/', LogoutAPIView.as_view(), name='logout'),
<<<<<<< HEAD
=======
    path('auth/profile/<int:pk>/', ProfileView.as_view(), name='profile-detail'),
    path('auth/profile/', ProfileView.as_view(), name='profile'),
>>>>>>> c841de7 (Initial commit from second computer)
]
