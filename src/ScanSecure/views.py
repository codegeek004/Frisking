from django.shortcuts import render, redirect
from django.core.files.storage import FileSystemStorage
import os
from .detect_people import detect_people
from .gender_detection import detect_gender
from django.conf import settings
from django.core.files.storage import default_storage
from .sign_detection import detect_sign
from django.contrib import messages

def index(request):
    return render(request, "index.html")


def detect_people_view(request):
    if not request.user.is_authenticated:
        messages.error(request, "You are not logged in. Please login to continue.")
        return redirect('index')
    context = {"detected_people": None, "output_image": None}
    
    if request.method == "POST" and request.FILES.get("image"):
        image = request.FILES["image"]
        fs = FileSystemStorage(location="ScanSecure/static/uploads")
        image_path = fs.save(image.name, image)
        full_image_path = os.path.join("ScanSecure/static/uploads", image_path)

        detected_people, output_image_path = detect_people(full_image_path)
        context["detected_people"] = detected_people
        context["output_image"] = output_image_path.replace("ScanSecure/static/", "")

    return render(request, "upload_photo.html", context)

def gender_detection_view(request):
    if not request.user.is_authenticated:
        messages.error(request, "You are not logged in. Please login to continue.")
        return redirect('index')
    if request.method == 'POST' and request.FILES.get('image'):
        image = request.FILES['image']
        image_path = os.path.join(settings.MEDIA_ROOT, 'uploads', image.name)

        os.makedirs(os.path.dirname(image_path), exist_ok=True)
        with open(image_path, 'wb+') as destination:
            for chunk in image.chunks():
                destination.write(chunk)

        gender, error = detect_gender(image_path)

        if error:
            return render(request, 'gender_detection.html', {'error': error})

        return render(request, 'gender_detection.html', {'gender': gender, 'image_url': settings.MEDIA_URL + 'uploads/' + image.name})

    return render(request, 'gender_detection.html')


def sign_detection_view(request):
    if not request.user.is_authenticated:
        messages.error(request, "You are not logged in. Please login to continue.")
        return redirect('index')
    if request.method == "POST" and request.FILES.get("video"):
        video = request.FILES["video"]
        video_path = default_storage.save("uploads/" + video.name, video)
        results = detect_sign(default_storage.path(video_path))

        return render(request, "sign_detection_results.html", {"results": results})

    return render(request, "sign_detection.html")







