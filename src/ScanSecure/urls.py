from django.urls import path
from django.conf.urls.static import static
from .views import *
from django.conf import settings

urlpatterns = [
    path('detect-gender/', gender_detection_view, name='gender_detection'),
    path("sign-detection/", sign_detection_view, name="sign_detection"),
    path('', index, name="index"),
    path('demo/', detect_both, name="demo"),
    path('query/', send_enquiry_mail, name="enquiry")
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
