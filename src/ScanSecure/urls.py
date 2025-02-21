from django.urls import path
from django.conf.urls.static import static
from .views import *
from django.conf import settings

urlpatterns = [
    path("detect/", detect_people_view, name="detect_people"),
    path('detect-gender/', gender_detection_view, name='gender-detection'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)