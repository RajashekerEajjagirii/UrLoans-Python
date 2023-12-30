from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
# from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from .emails import send_otp_via_email,send_email_token
from django.shortcuts import get_object_or_404
import jwt, datetime
# Create your views here.

# Register for Admin Users with Email OTP verification
class RegisterAPI(APIView):

    def post(self,request):
        try:
            data=request.data
            # serializer=UserSerializer(data=data)
            serializer=RegisterSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                send_otp_via_email(serializer.data['email'],serializer.data['first_name'])
                return Response({
                    'status':True,
                    'message':'Check your Email to verify your Account',
                    'data':serializer.data
                },status.HTTP_200_OK)
            
            return Response({
                'status':False,
                    'message':'Something Went Wrong',
                    'data':serializer.errors
            },status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            print(e)
            return Response({
                'status':False,
                "message":"Something went wrong, Email not sent"
            },status.HTTP_408_REQUEST_TIMEOUT)


# Verifying Email with OTP
class VerifyAccount(APIView):
    
    def post(self,request):
        try:
            data=request.data
            serializer=VerifyAccountSerializer(data = data)

            if serializer.is_valid():
                email=serializer.data['email']
                otp=serializer.data['otp']

                user=User.objects.filter(email= email)
                if not user.exists():
                    return Response({
                        'status':False,
                        "message":"Invalid Email"
                    },status.HTTP_404_NOT_FOUND)
                
                if user[0].otp != otp:
                    return Response({
                        'status':False,
                        "message":"Invalid OTP"
                    },status.HTTP_400_BAD_REQUEST)
                
                user=user.first()
                # user.set_password(user[0].password)
                user.is_verified=True
                user.save()
                # success
                return Response({
                        'status':True,
                        "message":"Your Account was verified successfully"
                    },status.HTTP_200_OK)
            
            # serializer Errors
            return Response({
                        'status':False,
                        "message":serializer.errors
                    },status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            print(e)
            return Response({
                'status':False,
                "message":"Something went wrong- Time Out Error "
            },status.HTTP_408_REQUEST_TIMEOUT)



# Login Admin With Token Authentication
# verifying authenticate
class LoginAPI(APIView):

    def post(self,request):
        try:
            data=request.data
            serializer=LoginSerializer(data = data)

            if serializer.is_valid():
                email=serializer.data['email']
                password=serializer.data['password']

                # user=User.objects.filter(email= email)
                user=authenticate(email=email,password=password)
                # print("****User****")
                # print(user)
                if not user:
                    return Response({
                        'status':False,
                        "message":"Invalid Credentials"
                    },status.HTTP_404_NOT_FOUND)
                
                # if user.password != password:
                #     return Response({
                #         'status':False,
                #         "message":"Invalid Password"
                #     },status.HTTP_400_BAD_REQUEST)
                
                if user.is_verified !=True :
                    return Response({
                        'status':False,
                        "message":"Your Account was not verified with UrLoans,Plz verify and continue"
                    },status.HTTP_401_UNAUTHORIZED)
                
                # Set_cookie using Token
                # token,_= Token.objects.get_or_create(user=user)

                # set_cookie using JWT Token
                payload={
                    'email':user.email,
                    'exp':datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
                    'iat':datetime.datetime.utcnow()
                }

                token=jwt.encode(payload,'secret',algorithm='HS256')

                response=Response()
                response.set_cookie(key='UrLoans',value=token,httponly=True)
                response.data={
                    'UrLoans':token,
                    'message':'Your login was successfully'
                }

                return response
                # return Response({
                #         'status':True,
                #         "message":"Your login was successfully",
                #         "token":str(token)
                #     },status.HTTP_200_OK)
            
            # serializer Errors
            return Response({
                        'status':False,
                        "message":serializer.errors
                    },status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            print(e)
            return Response({
                'status':False,
                "message":"Something went wrong- Time Out Error "
            },status.HTTP_408_REQUEST_TIMEOUT)



class UserAPI(APIView):
    
    def get(self,request):
        
        try:
            print(request)
            token=request.COOKIES.get('UrLoans')
            token=request.cookies.get('UrLoans')
            payload=jwt.decode(token,'secret',algorithms=['HS256'])

            if not token:
                return Response({'messsage':'Unautoraized User token'},status.HTTP_401_UNAUTHORIZED)
            
            user=User.objects.filter(email=payload['email']).first()
            # print(user)
            serializer=UserSerializer(user)
            return Response(serializer.data)
        
        except Exception as e:
            return Response({'messsage':'Unautoraized User'},status.HTTP_401_UNAUTHORIZED)
        
        
    

class LogoutAPI(APIView):

    def post(self,request):
        response=Response()
        response.delete_cookie('UrLoans')
        response.data={
            'message':'you logged out successsfully'
        }

        return response

# Register for Admin Users
# class RegisterAPI(APIView):

#     def post(self,request):
#         data=request.data
#         serializer=RegisterSerializer(data=data)

#         if not serializer.is_valid():
#             return Response({
#                 'status':False,
#                 'message':serializer.errors
#             },status.HTTP_400_BAD_REQUEST)
        
#         serializer.save()
#         return Response({'status':True,'message':'User registered succefully'},status.HTTP_201_CREATED)


# Login Admin-User with Token Authentication
# verifying using get_oject_or_404
# class LoginAPI(APIView):
#     def post(self,request):
#         data=request.data
#         serializer=LoginSerializer(data=data)
#         print('****last login*****')
        
#         if not serializer.is_valid():
#             return Response({'status':False,'message':serializer.errors},status.HTTP_400_BAD_REQUEST)
#         print(serializer.data)
#         # user=authenticate(email=serializer.data['email'],password=serializer.data['password'])
#         user=get_object_or_404(User,email=serializer.data['email'])
#         if not user.check_password(serializer.data['password']):
#             return Response({'status':False,'message':'Invalid Credentials'},status.HTTP_401_UNAUTHORIZED)
#         print(user.is_verified)

#         if user.is_verified !=True :
#             return Response({
#                 'status':False,
#                 "message":"Your Account was not verified with UrLoans,Plz verify and continue"
#             },status.HTTP_401_UNAUTHORIZED)
#         # print(user)
#         token,_= Token.objects.get_or_create(user=user)

#         return Response({
#             'status':True,
#             'message':'your login was successfull',
#             'data':serializer.data,
#             'token':str(token)

#         },status.HTTP_200_OK)


'''HomeLoans'''
# class HomeloanAPI(APIView):
#     def post(self,request):
#         try:
#             data=request.data
#             serializer=HomeloanSerializer(data=data)

#             if serializer.is_valid():
#                 print(data['email'])
#                 if Homeloan.objects.filter(email=data['email']).exists():
#                     return Response({"status":False,"message":"Email is already exists"},status.HTTP_226_IM_USED)
                
#                 serializer.save()
#                 # print(serializer.data)
#                 # send_email_token(serializer.data['email'],serializer.data['fullName'])
#                 return Response({
#                     'status':True,
#                     'message':'Please Check your Email to verify your Account',
#                     'data':serializer.data
#                 },status.HTTP_201_CREATED)


#             return Response({
#                 'status':False,
#                     'message':'Something Went Wrong',
#                     'data':serializer.errors
#             },status.HTTP_400_BAD_REQUEST)


#         except Exception as e:
#             print(e)     
#             return Response({
#                 'status':False,
#                     'message':'Something Went Wrong-Server Issue',
#                     'data':{}
#             },status.HTTP_502_BAD_GATEWAY)

    
#     def get(self,request):
        
#         token=request.COOKIES.get('UrLoans')
#         if not token:
#             return Response({'messsage':'Unautoraized User token'},status.HTTP_401_UNAUTHORIZED)
        
#         try:
#             payload=jwt.decode(token,'secret',algorithms=['HS256'])
#             user=Homeloan.objects.all().order_by('-createdAt').values()
#             print(user)
#             serializer=HomeloanSerializer(user,many=True)
#             return Response(serializer.data)

#         except Exception as e:
#             return Response({'messsage':'Unautoraized User'},status.HTTP_401_UNAUTHORIZED)


    # def put(self,request):
    #     try:
    #         data=request.data
    #         print(data)

    #     except Exception as e:
    #         return Response({'messsage':'Unautoraized User'},status.HTTP_401_UNAUTHORIZED)         
           



# # Verify Email
# class VerifyEmail(APIView):
#     def get(request,*args,**kwargs):
#         # print('comming')
#         # print(kwargs['emailToken'])
#         try:
#             token=kwargs['emailToken']
#             obj=Homeloan.objects.get(emailToken=token)
#             obj.is_verified=True
#             obj.save()
#             return Response({
#                 'status':True,
#                 "message":"Your Account was verified successfully"
#             },status.HTTP_200_OK)
        
#         except Exception as e:
#             return Response({
#             'status':False,
#             'message':'Your verification Link was expired',
#         },status.HTTP_502_BAD_GATEWAY)


# PersonLoans
# class PersonalloanAPI(APIView):

#     # register user
#     def post(self,request):
        
#         try:
#             print('register post')
#             data=request.data
#             print(data)
#             serializer=PersonalSerializer(data=data)
#             print(serializer.data)
#             # exit()
            

#             if serializer.is_valid():
#                 print('serializer part')
#                 if Personalloan.objects.filter(email=data['email']).exists():
#                     return Response({"status":False,"message":"Email is already exists"},status.HTTP_226_IM_USED)
                
#                 serializer.save()
#                 # sending mail to user Email
#                 send_email_token(serializer.data['email'],serializer.data['fullName'])
#                 print('after send email token')
#                 return Response({
#                     'status':True,
#                     'message':'Please Check your Email to verify your Account',
#                     'data':serializer.data
#                 },status.HTTP_201_CREATED)
            
#             return Response({
#                 'status':False,
#                     'message':'Something Went Wrong',
#                     'data':serializer.errors
#             },status.HTTP_400_BAD_REQUEST)
        
        
#         except Exception as e:
#             return Response({
#                 'status':False,
#                     'message':'Something Went Wrong-Server Issue',
#             },status.HTTP_502_BAD_GATEWAY)


# Customer Queries
class QueriesAPIs(APIView):

    def post(self,request):

        try:
            data=request.data
            serializer=QuerySerializer(data=data)

            if serializer.is_valid():
                serializer.save()
                return Response({
                    "status":True,
                    "message":"Your Query was submitted successfully"
                },status.HTTP_201_CREATED)
            
            return Response({
                "status":False,
                "message":"something went wrong- data format Issue"
            },status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response({
                'status':False,
                'message':'Something Went Wrong-Server Issue',
            },status.HTTP_502_BAD_GATEWAY)