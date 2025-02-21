from django.urls import path
from .views import detect_people_view

urlpatterns = [
    path("detect/", detect_people_view, name="detect_people"),
]
