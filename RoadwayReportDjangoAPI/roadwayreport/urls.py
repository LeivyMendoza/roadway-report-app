from django.urls import path, include
from django.views.generic import RedirectView
from roadwayreport import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import UserRegistrationView


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
    path('api/register/', views.register_user, name='user-registration'),
    path('api/comments/', views.comment_list_create, name='comment-list-create'),
    path('api/comments/report/<int:report_id>/', views.get_comments_for_report, name='get_comments_for_report'),
    path('api/check_if_official/', views.check_if_official, name='check_if_official'),
    path('api/users/manage/', views.manage_users, name='manage_users'),
    path('api/users/delete/<int:user_id>/', views.delete_user, name='delete_user'),
    path('api/reports/delete/<int:report_id>/', views.delete_report, name='delete_report'),
    path('api/reports/update_status/<int:report_id>/', views.update_report_status, name='update_report_status'),
    path('api/geocode/', views.geocode_address, name='geocode_address'),
]
