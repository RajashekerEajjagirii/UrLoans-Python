from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import jwt
from ..models import Businessloan
from ..serializers import BusinessSerializer
from ..emails import *



class BusinessloanAPI(APIView): 
    def post(self,request):
        try:
            data=request.data
            serializer=BusinessSerializer(data=data)

            if serializer.is_valid():
                print(data['email'])

                if Businessloan.objects.filter(email=data['email']).exists():
                    return Response({"status":False,"message":"Email is already exists"},status.HTTP_226_IM_USED)
                

                serializer.save()
                print('saved records')
                send_email_token(serializer.data['email'],serializer.data['fullName'],'businessloans')
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
                    'data':{}
            },status.HTTP_502_BAD_GATEWAY)

