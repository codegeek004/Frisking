from django.shortcuts import render, redirect
from django.core.files.storage import FileSystemStorage
import os
from .gender_detection import detect_gender
from django.conf import settings
from django.core.files.storage import default_storage
from .sign_detection import detect_sign
from django.contrib import messages
from django.core.mail import EmailMessage

def index(request):
    return render(request, "index.html")


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


def send_enquiry_mail(request):
    name = request.POST.get('username')
    email_address = request.POST.get('email')
    message = request.POST.get('message')
    email = EmailMessage(f'Query for services', message, to=['codegeek004@gmail.com'])
    email.send()

    message1 = "We have received your request. This will be processed within a few hours. Thank you for choosing codegeeks"
    email = EmailMessage("Received request", message1, to=[email_address])
    email.send()

def detect_both(request):
    context = {}
    if request.method == 'POST':
        image_file = request.FILES.get('image')
        video_file = request.FILES.get('video')

        if image_file:
            img_path = default_storage.save(f"temp/{image_file.name}", image_file)
            gender, err = detect_gender(default_storage.path(img_path))
            context['gender'] = gender if not err else err

        if video_file:
            vid_path = default_storage.save(f"temp/{video_file.name}", video_file)
            results = detect_sign(default_storage.path(vid_path))
            context['signs'] = results

    return render(request, 'detect.html', context)






