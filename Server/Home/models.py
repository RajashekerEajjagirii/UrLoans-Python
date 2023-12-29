from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import User
from .manager import UserManager

# Create your models here.


# Creating Custom Admin-user fields
class User(AbstractUser):
    username = None
    email = models.EmailField( unique=True)
    is_verified = models.BooleanField(default=False)
    otp = models.CharField(max_length=6 , null=True, blank=True)
    

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    objects = UserManager()
    
    def name(self):
        return self.first_name + ' ' + self.last_name

    def __str__(self):
        return self.email


# Creating Homeloans model
class Homeloan(models.Model):
    # id=models.IntegerField(primary_key=True,unique=True,auto_created=True)
    fullName=models.CharField(max_length=200,null=True)
    email=models.EmailField(max_length=200,null=True)
    mobileNum=models.IntegerField(null=True)
    city=models.CharField(max_length=200,null=True)
    occupationType=models.CharField(max_length=200,null=True)
    loanAmount=models.IntegerField(null=True)
    monthlySalary=models.IntegerField(null=True)
    monthlyEmi=models.IntegerField(null=True)
    tenure=models.IntegerField(null=True)
    dob=models.DateField(null=True)
    address=models.CharField(max_length=225,null=True)
    createdAt=models.DateTimeField(auto_now_add=True,null=True)
    is_verified=models.BooleanField(default=False,null=True)
    emailToken=models.CharField(max_length=200,null=True)


    def __str__(self):
        return self.email
    


#Creating  PersonalLoan Model
class Personalloan(models.Model):
    # id=models.IntegerField(primary_key=True,unique=True,auto_created=True)
    fullName=models.CharField(max_length=200,null=True)
    email=models.EmailField(max_length=200,null=True)
    mobileNum=models.IntegerField(null=True)
    city=models.CharField(max_length=200,null=True)
    companyName=models.CharField(max_length=200,null=True)
    loanAmount=models.IntegerField(null=True)
    monthlySalary=models.IntegerField(null=True)
    monthlyEmi=models.IntegerField(null=True)
    tenure=models.IntegerField(null=True)
    dob=models.DateField(null=True)
    address=models.CharField(max_length=225,null=True)
    createdAt=models.DateTimeField(auto_now_add=True,null=True)
    is_verified=models.BooleanField(default=False,null=True)
    emailToken=models.CharField(max_length=200,null=True)

    def __str__(self):
        return self.email



#Business Model 
class Businessloan(models.Model):
    fullName=models.CharField(max_length=200,null=True)
    email=models.EmailField(max_length=200,null=True)
    mobileNum=models.IntegerField(null=True)
    city=models.CharField(max_length=200, null=True)
    loanAmount=models.IntegerField(null=True)
    createdAt=models.DateTimeField(auto_now_add=True,null=True)
    is_verified=models.BooleanField(default=False,null=True)
    emailToken=models.CharField(max_length=220,null=True)

    def __str__(self):
        return self.email 
    

# Property Loans Model
class Propertyloan(models.Model):

    fullName=models.CharField(max_length=200,null=True)
    email=models.EmailField(max_length=200,null=True)
    mobileNum=models.CharField(max_length=20,null=True)
    city=models.CharField(max_length=200, null=True)
    loanAmount=models.IntegerField(null=True)
    createdAt=models.DateTimeField(auto_now_add=True,null=True)
    is_verified=models.BooleanField(default=False,null=True)
    emailToken=models.CharField(max_length=220,null=True)

    def __str__(self):
        return self.email 
    

# Customers Queries Model
class Queries(models.Model):
    name=models.CharField(max_length=200,null=True)
    email=models.EmailField(max_length=200, null=True)
    query=models.CharField(max_length=500,null=True)
    status=models.BooleanField(default=False,null=True)
    createdAt=models.DateTimeField(auto_now_add=True,null=True)

    def __str__(self):
        return self.name
