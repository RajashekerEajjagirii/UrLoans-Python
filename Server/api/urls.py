from Home.views import * 
from Home.components.homeloans import *
from Home.components.personalloans import *
from Home.components.businessloans import *
from Home.components.propertyloans import *
from Home.components.queries import *
from Home.utils import *

from django.urls import path

urlpatterns = [
    path('register/', RegisterAPI.as_view()),
    path('verifyAcc/', VerifyAccount.as_view()),
    path('login/', LoginAPI.as_view()),
    path('user/', UserAPI.as_view()),
    path('logout/', LogoutAPI.as_view()),
    # homeloans
    path('homeloans/', HomeloanAPI.as_view()),
    path('verify/<str:emailToken>/<str:type>/', VerifyEmail.as_view()),
    path('homeloans/<int:id>/', HLUserAPI.as_view()),
    # personalloans
    path('personalloans/', PersonalloanAPI.as_view()),
    path('personalloans/<int:id>/',PLUserAPI.as_view()),
    # businessloans
    path('businessloans/',BusinessloanAPI.as_view()),
    path('businessloans/<int:id>/',BlUserAPI.as_view()),
    # propertyloans
    path('propertyloans/', PropertyloanAPI.as_view()),
    path('propertyloans/<int:id>/',LAPUserAPI.as_view()),
    # queries
    path('queries/', QueriesAPI.as_view()),
]
