from django.urls import path, include
from django.views.generic import RedirectView
from roadwayreport import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('login/', views.login_view, name='login'),  # Your custom login view
    path('dashboard/', views.dashboard_info, name='dashboard_info'),
    path('report/', views.report_pothole, name='report_pothole'),
    path('confirmation/', views.confirmation, name='confirmation'),
    path('', RedirectView.as_view(url='/login'), name='go-to-login'),

    # JWT Auth
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/leaderboard/', views.LeaderboardList.as_view(), name='leaderboard'),
]
