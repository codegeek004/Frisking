from django.shortcuts import render
from django.core.files.storage import FileSystemStorage
import os
from .detect_people import detect_people

def detect_people_view(request):
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
