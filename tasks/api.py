from .serializers import TaskSerializers
from .models import Task
from rest_framework import viewsets,permissions,status
from rest_framework.decorators import action
from rest_framework.response import Response
class TaskViewSet(viewsets.ModelViewSet):
    queryset=Task.objects.all()
    permission_classes=[permissions.AllowAny]
    serializer_class=TaskSerializers
    
    @action(detail=True,methods=["post"])
    def done(self,request,pk=None):
        task=self.get_object()
        task.done= not task.done
        task.save()

        return Response({"status":"Tarea realizada" if task.done else "Tarea no realizada"},status=status.HTTP_200_OK)
