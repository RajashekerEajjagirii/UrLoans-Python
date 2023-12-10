from django.core.mail import send_mail
import random
from django.conf import settings
from .models import User,Homeloan,Businessloan,Personalloan,Propertyloan,Queries
import uuid

# vefiy Account through link
def send_otp_via_email(email,name):
    print(email)
    subject="UrLoans- Account verification Email"
    otp=random.randint(100000,999999)
    message= f"Hi {name}, \n\n Use Below OTP to verify your Account: \n OTP for your Account was {otp} \n\n Thanks, \n UrLoans Support Team"
    email_from=settings.EMAIL_HOST_USER
    print(email_from)
    send_mail(subject,message,email_from,[email])
    user_obj=User.objects.get(email=email)
    user_obj.otp = otp
    user_obj.save()



# Vefify Email through link
def send_email_token(email,name,type):
    
    subject='UrLoans- Email Verification'
    emailToken=str(uuid.uuid4())
    # message=f"Hi {name}, \n\n Click on the below link to verify your Email account, \n 'http://127.0.0.1:8000/api/verify/{emailToken}/' \n\n Thanks,\n UrLoans Support Team"
    email_from=settings.EMAIL_HOST_USER
    to=[email]
    # send_mail(subject,message,email_from,to)
    if(type=='homeloans'):
        message=f"Hi {name}, \n\n Click on the below link to verify your Email account, \n 'http://127.0.0.1:8000/api/verify/{emailToken}/homeloans/' \n\n Thanks,\n UrLoans Support Team"
        send_mail(subject,message,email_from,to)
        user_obj=Homeloan.objects.get(email=email)
        user_obj.emailToken=emailToken
        user_obj.save()

    elif(type=='personalloans'):
        message=f"Hi {name}, \n\n Click on the below link to verify your Email account, \n 'http://127.0.0.1:8000/api/verify/{emailToken}/personalloans/' \n\n Thanks,\n UrLoans Support Team"
        send_mail(subject,message,email_from,to)
        user_obj=Personalloan.objects.get(email=email)
        user_obj.emailToken=emailToken
        user_obj.save()
    
    elif(type=='businessloans'):
        message=f"Hi {name}, \n\n Click on the below link to verify your Email account, \n 'http://127.0.0.1:8000/api/verify/{emailToken}/businessloans/' \n\n Thanks,\n UrLoans Support Team"
        send_mail(subject,message,email_from,to)
        user_obj=Businessloan.objects.get(email=email)
        user_obj.emailToken=emailToken
        user_obj.save()

    elif(type=='propertyloans'):
        message=f"Hi {name}, \n\n Click on the below link to verify your Email account, \n 'http://127.0.0.1:8000/api/verify/{emailToken}/propertyloans/' \n\n Thanks,\n UrLoans Support Team"
        send_mail(subject,message,email_from,to)
        user_obj=Propertyloan.objects.get(email=email)
        user_obj.emailToken=emailToken
        user_obj.save()
    


# def send_perslemail_token(email,name):
    
#     subject='UrLoans- Email Verification'
#     emailToken=str(uuid.uuid4())
#     message=f"Hi {name}, \n\n Click on the below link to verify your Email account, \n 'http://127.0.0.1:8000/api/verify/{emailToken}/' \n\n Thanks,\n UrLoans Support Team"
#     email_from=settings.EMAIL_HOST_USER
#     to=[email]
#     send_mail(subject,message,email_from,to)
#     user_obj=Personalloan.objects.get(email=email)
#     user_obj.emailToken=emailToken
#     user_obj.save()


# def send_blemail_token(email,name):
    
#     subject='UrLoans- Email Verification'
#     emailToken=str(uuid.uuid4())
#     message=f"Hi {name}, \n\n Click on the below link to verify your Email account, \n 'http://127.0.0.1:8000/api/verify/{emailToken}/' \n\n Thanks,\n UrLoans Support Team"
#     email_from=settings.EMAIL_HOST_USER
#     to=[email]
#     send_mail(subject,message,email_from,to)
#     user_obj=Businessloan.objects.get(email=email)
#     user_obj.emailToken=emailToken
#     user_obj.save()


def send_email_query(id,name,email,query):

    print(email)
    subject="UrLoans- Ur Query Status Email"
    message= f"Hi {name}, \n\n Hoping you, Everything is going Good. \n  Your Query '{query}' was resolved. \n   Thank you for Contact Us.. \n\n Regards, \n UrLoans Support Team"
    email_from=settings.EMAIL_HOST_USER
    print(email_from)
    send_mail(subject,message,email_from,[email])
    user_obj=Queries.objects.get(id=id)
    user_obj.status=True
    user_obj.save()