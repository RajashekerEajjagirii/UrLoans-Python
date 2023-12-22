from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import jwt
from ..models import Homeloan
from ..serializers import HomeloanSerializer
from ..emails import *


class HLUserAPI(APIView):

    def get(self,request,*args, **kwargs):
       
        id=kwargs['id']
        token=request.COOKIES.get('UrLoans')
        
        if not token:
            return Response({'messsage':'Unautoraized User token'},status.HTTP_401_UNAUTHORIZED)
        
        try:
            payload=jwt.decode(token,'secret',algorithms=['HS256'])
            user=Homeloan.objects.filter(id=id).values()
            serializer=HomeloanSerializer(user,many=True)
            return Response(serializer.data)

        except Exception as e:
            return Response({'messsage':'Unautoraized User1'},status.HTTP_401_UNAUTHORIZED)
        

    def put(self,request,**kwargs):

        id=kwargs['id']
        token=request.COOKIES.get('UrLoans')

        try:
            data=request.data
            
            if not token:
                return Response({'messsage':'Unautoraized User token'},status.HTTP_401_UNAUTHORIZED)
            
            obj=Homeloan.objects.get(id=id)
            # print(obj)
            serializer=HomeloanSerializer(obj,data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            
            return Response(serializer.errors)
        
        except Exception as e:
            return Response({'messsage':'Unautoraized User'},status.HTTP_401_UNAUTHORIZED)
        

    def delete(self,request,**kwargs):
        try:
            id=kwargs['id']
            token=request.COOKIES.get('UrLoans')
            data=request.data
            if not token:
                return Response({'messsage':'Unautoraized User token'},status.HTTP_401_UNAUTHORIZED)
            
            obj=Homeloan.objects.get(id=id)
            obj.delete()
            return Response({'message':'User was Deleted successfully'},status.HTTP_200_OK)

        except Exception as e:
            return Response({'messsage':'Unautoraized User'},status.HTTP_401_UNAUTHORIZED)
        



class HomeloanAPI(APIView):
    def post(self,request):
        try:
            data=request.data
            serializer=HomeloanSerializer(data=data)

            if serializer.is_valid():
                # print(data['email'])
                if Homeloan.objects.filter(email=data['email']).exists():
                    return Response({"status":False,"message":"Email is already exists"},status.HTTP_226_IM_USED)
                
                serializer.save()
                # print(serializer.data)
                send_email_token(serializer.data['email'],serializer.data['fullName'],'homeloans')
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

    
    def get(self,request):
        
        token=request.COOKIES.get('UrLoans')
        if not token:
            return Response({'messsage':'Unautoraized User token'},status.HTTP_401_UNAUTHORIZED)
        
        try:
            payload=jwt.decode(token,'secret',algorithms=['HS256'])
            user=Homeloan.objects.all().order_by('-createdAt').values()
            # print(user)
            serializer=HomeloanSerializer(user,many=True)
            return Response(serializer.data)

        except Exception as e:
            return Response({'messsage':'Unautoraized User'},status.HTTP_401_UNAUTHORIZED)
        


# Verify Email
class VerifyEmailHL(APIView):
    def get(request,*args,**kwargs):
        print('comming homeloans controller')
        print(kwargs['emailToken'])
        print("type of mail")
        print(kwargs['type'])
        try:
            token=kwargs['emailToken']
            obj=Homeloan.objects.get(emailToken=token)
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