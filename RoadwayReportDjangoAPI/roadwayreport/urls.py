"""
from django.conf.urls import url 
from tutorials import views 
 
urlpatterns = [ 
    url(r'^api/tutorials$', views.tutorial_list),
    url(r'^api/tutorials/(?P<pk>[0-9]+)$', views.tutorial_detail),
    url(r'^api/tutorials/published$', views.tutorial_list_published)
]
"""

from django.urls import path
from django.views.generic import RedirectView
from roadwayreport import views

urlpatterns = [
    path('login/', views.login_view, name='login'),  # For logging in or creating a new user
    path('dashboard/', views.dashboard_info, name='dashboard_info'),  # For fetching dashboard info
    path('report/', views.report_pothole, name='report_pothole'),  # For posting a new report
    path('confirmation/', views.confirmation, name='confirmation'), # For getting confirmation/status
    path('', RedirectView.as_view(url='/login'), name='go-to-login'),  
]