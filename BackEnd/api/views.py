from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Note
from .serilizers import NoteSerilizer
from rest_framework import status


@api_view(['GET', 'POST'])
def get_notes(request):
    if request.method == 'GET':
        notes = Note.objects.all()
        serilizers = NoteSerilizer(notes, many=True)
        return Response(serilizers.data, status=status.HTTP_200_OK)

    if request.method == 'POST':
        serilizers = NoteSerilizer(data=request.data)
        if serilizers.is_valid(raise_exception=True):
            serilizers.save()
            return Response(serilizers.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serilizers.errors, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET', 'PUT','DELETE'])
def get_note(request, pk):
  
    if request.method == 'GET':
        try:
            note = Note.objects.get(pk=pk)
            serilizers = NoteSerilizer(note, many=False)
            return Response(serilizers.data, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_204_NO_CONTENT)

    if request.method == 'PUT':
        try:
            note = Note.objects.get(pk=pk)
            serilizers = NoteSerilizer(note, data=request.data)
            if serilizers.is_valid(raise_exception=True):
                serilizers.save()
                return Response(serilizers.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serilizers.errors, status=status.HTTP_404_NOT_FOUND)
        except:
            return Response(status=status.HTTP_204_NO_CONTENT)

    if request.method == 'DELETE':
        try:
            note = Note.objects.get(pk=pk)
            note.delete()
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_204_NO_CONTENT)