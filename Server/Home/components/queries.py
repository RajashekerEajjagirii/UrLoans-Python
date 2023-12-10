from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from ..serializers import *
from ..models import *
import jwt
from ..emails import *
from collections import OrderedDict

# Customer Queries
class QueriesAPI(APIView):
    # failing complaint
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
        

    

    def get(self,request):

        try:
            token=request.COOKIES.get('UrLoans')
            if not token:
                return Response({'messsage':'Unautoraized User token'},status.HTTP_401_UNAUTHORIZED)

            payload=jwt.decode(token,'secret',algorithms=['HS256'])
            user=Queries.objects.all().order_by('-createdAt').values()
            # print(user)
            serializer=QuerySerializer(user,many=True)
            return Response(serializer.data)
            

        except Exception as e:
            return Response({'messsage':'Unautoraized User'},status.HTTP_401_UNAUTHORIZED)
        


class QueriesUserAPI(APIView):

        # Get user
        def get(self,request,*args, **kwargs):
                        
            try:
                id=kwargs['id']
                name=kwargs['name']
                email=kwargs['email']
                query=kwargs['query']

                token=request.COOKIES.get('UrLoans')
                if not token:
                   return Response({'messsage':'Unautoraized User token'},status.HTTP_401_UNAUTHORIZED)

                payload=jwt.decode(token,'secret',algorithms=['HS256'])

                send_email_query(id,name,email,query)

                return Response({
                    "status":True,
                    "message":"Your Query was Solved successfully"
                },status.HTTP_200_OK)

            except Exception as e:
                return Response({'messsage':'Unautoraized User1'},status.HTTP_401_UNAUTHORIZED)
            

        
        # Delete
        def delete(self,request,**kwargs):
            try:
                id=kwargs['id']
                token=request.COOKIES.get('UrLoans')
                if not token:
                    return Response({'messsage':'Unautoraized User token'},status.HTTP_401_UNAUTHORIZED)
                
                obj=Queries.objects.get(id=id)
                obj.delete()
                return Response({'message':'User was Deleted successfully'},status.HTTP_200_OK)

            except Exception as e:
                return Response({'messsage':'Unautoraized User'},status.HTTP_401_UNAUTHORIZED)
