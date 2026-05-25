from .models import Task
from .serializers import (
    TaskDisplaySerializer,
    TaskCreateSerializer,
    TaskUpdateSerializer,
)
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404


@api_view(["GET"])
def get_tasks(request):
    all_tasks = Task.objects.all()
    serializer = TaskDisplaySerializer(all_tasks, many=True)
    return Response({"tasks": serializer.data})


@api_view(["POST"])
def create_task(request):
    serializer = TaskCreateSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)

    return Response(serializer.errors, status=400)


@api_view(["PATCH"])
def update_task(request, pk):
    task = get_object_or_404(Task, pk=pk)

    serializer = TaskUpdateSerializer(task, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@api_view(["DELETE"])
def delete_task(request, pk):
    task = get_object_or_404(Task, pk=pk)
    task.delete()
    return Response(status=204)
