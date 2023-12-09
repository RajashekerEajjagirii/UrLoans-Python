from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
import jwt
from ..models import Propertyloan
from ..serializers import PropertySerializer
from ..emails import *



class PropertyloanAPI(APIView):
    
    # register
    def post(self,request):

        try:
            data=request.data
            serializer=PropertySerializer(data=data)

            if serializer.is_valid():

                if Propertyloan.objects.filter(email=data['email']).exists():
                    return Response({"status":False,"message":"Email is already exists"},status.HTTP_226_IM_USED)
                
                serializer.save()
                # sending mail to verify Acc
                send_email_token(serializer.data['email'],serializer.data['fullName'],'propertyloans')
                return Response({
                    "status":True,
                    "message":"Please Check your Email to verify your Account",
                    "details":serializer.data
                    },status.HTTP_201_CREATED)
            
            return Response({
                'status':False,
                    'message':'Something Went Wrong-Serializer Error',
                    'data':serializer.errors
            },status.HTTP_400_BAD_REQUEST)


        except Exception as e:
            return Response({
                'status':False,
                    'message':'Something Went Wrong-Server Issue',
                    'data':{}
            },status.HTTP_502_BAD_GATEWAY)


    # get all users data
    def get(self,request):

        try:
            token=request.COOKIES.get('UrLoans')
            if not token:
                return Response({'messsage':'Unautoraized User token'},status.HTTP_401_UNAUTHORIZED)

            payload=jwt.decode(token,'secret',algorithms=['HS256'])
            user=Propertyloan.objects.all().order_by('-createdAt').values()
            print(user)
            serializer=PropertySerializer(user,many=True)
            return Response(serializer.data)
        
        except Exception as e:
            return Response({'messsage':'Unautoraized User'},status.HTTP_401_UNAUTHORIZED)
        




class LAPUserAPI(APIView):
       
        # Get user
        def get(self,request,*args, **kwargs):
       
            id=kwargs['id']
            token=request.COOKIES.get('UrLoans')
            
            if not token:
                return Response({'messsage':'Unautoraized User token'},status.HTTP_401_UNAUTHORIZED)
            
            try:
                payload=jwt.decode(token,'secret',algorithms=['HS256'])
                user=Propertyloan.objects.filter(id=id).values()
                serializer=PropertySerializer(user,many=True)
                return Response(serializer.data)

            except Exception as e:
                return Response({'messsage':'Unautoraized User1'},status.HTTP_401_UNAUTHORIZED)
            

        # Edit User
        def put(self,request,**kwargs):

            id=kwargs['id']
            token=request.COOKIES.get('UrLoans')

            try:
                data=request.data
                
                if not token:
                    return Response({'messsage':'Unautoraized User token'},status.HTTP_401_UNAUTHORIZED)
                
                obj=Propertyloan.objects.get(id=id)
                print(obj)
                serializer=PropertySerializer(obj,data=data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data)
                
                return Response(serializer.errors)
            
            except Exception as e:
                return Response({'messsage':'Unautoraized User'},status.HTTP_401_UNAUTHORIZED)
            


        # Delete
        def delete(self,request,**kwargs):
            try:
                id=kwargs['id']
                token=request.COOKIES.get('UrLoans')
                if not token:
                    return Response({'messsage':'Unautoraized User token'},status.HTTP_401_UNAUTHORIZED)
                
                obj=Propertyloan.objects.get(id=id)
                obj.delete()
                return Response({'message':'User was Deleted successfully'},status.HTTP_200_OK)

            except Exception as e:
                return Response({'messsage':'Unautoraized User'},status.HTTP_401_UNAUTHORIZED)