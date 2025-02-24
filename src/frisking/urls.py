from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
#here allauth.urls fails to respond when it is after the scansecure.urls because there is regex in a url in scansecure app
urlpatterns = [
    path('accounts/', include('allauth.urls')),
    path('admin/', admin.site.urls),
    path('', include('ScanSecure.urls')),
      # Ensure this is included
]

# # If you still need to serve static files in DEBUG mode
# if settings.DEBUG:
#     from django.views.static import serve
#     from django.urls import re_path

#     urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

#     # REMOVE or MODIFY this to avoid conflicts
#     urlpatterns += [
#         re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
#     ]
