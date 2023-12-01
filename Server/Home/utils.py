from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import *

class VerifyEmail(APIView):

    def get(self,request,**kwargs):
        
        try:
            token=kwargs['emailToken']
            type=self.kwargs['type']
            
            if(type=='homeloans'):
                obj=Homeloan.objects.get(emailToken=token)
                obj.is_verified=True
                obj.save()
            elif(type=='personalloans'):
                obj=Personalloan.objects.get(emailToken=token)
                obj.is_verified=True
                obj.save()

            elif(type=='businessloans'):
                obj=Businessloan.objects.get(emailToken=token)
                obj.is_verified=True
                obj.save()

            elif(type=='propertyloans'):
                obj=Propertyloan.objects.get(emailToken=token)
                obj.is_verified=True
                obj.save()        

            return Response({
                'status':True,
                "message":"Your Account was verified successfully"
                },status.HTTP_200_OK)
        
        except Exception as e:
            return Response({
            'status':False,
            'message':'Your verification Link was expired',
            },status.HTTP_502_BAD_GATEWAY)
