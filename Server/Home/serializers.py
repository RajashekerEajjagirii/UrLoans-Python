from rest_framework import serializers
# from django.contrib.auth.models import User
from .models import User,Homeloan,Personalloan,Businessloan,Propertyloan,Queries

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=User
        fields=['id','email','password','first_name', 'is_verified']
        # for not password in response
        extra_kwargs={
            'password':{'write_only':True}
        }
    
    def create(self, validated_data):
        password=validated_data.pop('password', None)
        instance=self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance    


class VerifyAccountSerializer(serializers.Serializer):
    email=serializers.EmailField()
    otp=serializers.CharField()

class RegisterSerializer(serializers.Serializer):
    first_name=serializers.CharField()
    email=serializers.EmailField()
    password=serializers.CharField()
    is_verified=serializers.BooleanField(default=False)

    def validate(self, data):

        # if data['username']:
        #     if User.objects.filter(username=data['username']).exists():
        #         raise serializers.ValidationError('Username is already exists')

        if data['email']:
            if User.objects.filter(email=data['email']).exists():
                raise serializers.ValidationError('Email is already exists')

        return data 

    def create(self, data):
        user=User.objects.create(first_name=data['first_name'],email=data['email'])
        user.set_password(data['password'])
        user.save()
        return data


class LoginSerializer(serializers.Serializer):
    email=serializers.EmailField()
    password=serializers.CharField()
      

# Homeloans
class HomeloanSerializer(serializers.ModelSerializer):
    class Meta:
        model=Homeloan
        # fields=['id','fullName','email','mobileNum','city','occupationType','monthlySalary','monthlyEmi','tenure','dob','address','createdAt','is_verified']
        fields='__all__'
  

    # def update(self, instance, validated_data):
    #     print('comming update function in server')
    #     instance=self.Meta.model(**validated_data)
    #     instance.save()
    #     return instance  
    
    # def validate(self,data):
    #     if data['email']:
    #         if Homeloan.objects.filter(email=data['email']).exists():
    #              raise serializers.ValidationError('Email is already exists')
    #     return data
# class PersonalSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=Personalloan
#         # fields=['id','fullName','email','mobileNum','city','occupationType','monthlySalary','monthlyEmi','tenure','dob','address','createdAt','is_verified']
#         fields='__all__'


# Personalloans Serializer
class PersonalSerializer(serializers.ModelSerializer):
    class Meta:
        model=Personalloan
        fields='__all__'
        


# Business Serializer
class BusinessSerializer(serializers.ModelSerializer):
    class Meta:
        model=Businessloan
        fields='__all__'


# PropertyLoans Serializer
class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model=Propertyloan
        fields='__all__'


# Customer Queries
class QuerySerializer(serializers.ModelSerializer):
    class Meta:
        model=Queries
        fields='__all__'