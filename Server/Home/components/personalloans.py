from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import jwt
from ..serializers import PersonalSerializer
from ..models import Personalloan
from ..emails import send_email_token


class PersonalloanAPI(APIView):   
    def post(self,request):        
        try:
            data=request.data
            print(data)
            serializer=PersonalSerializer(data=data)
            
            if serializer.is_valid():
                if Personalloan.objects.filter(email=data['email']).exists():
                    return Response({"status":False,"message":"Email is already exists"},status.HTTP_226_IM_USED)
                
                serializer.save()
                # sending mail to user Email
                send_email_token(serializer.data['email'],serializer.data['fullName'],'personalloans')

                return Response({
                    'status':True,
                    'message':'Please Check your Email to verify your Account',
                    'data':serializer.data
                },status.HTTP_201_CREATED)
            
            
            return Response({
                'status':False,
                'message':'Something Went Wrong',
                'data':serializer.errors
            },status.HTTP_400_BAD_REQUEST)
            
        
        except Exception as e:
            print(e)
            return Response({
                'status':False,
                'message':'Something Went Wrong-Server Issue',
            },status.HTTP_502_BAD_GATEWAY)
        
    



