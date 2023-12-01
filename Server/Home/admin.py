from django.contrib import admin

# Register your models here.

from .models import User,Homeloan,Personalloan,Businessloan,Propertyloan,Queries

admin.site.register(User)
admin.site.register(Homeloan)
admin.site.register(Personalloan)
admin.site.register(Businessloan)
admin.site.register(Propertyloan)
admin.site.register(Queries)
