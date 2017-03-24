"""dmap URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings
from webapp import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^dmap/$', views.index, name='index'),
    url(r'^analysis/$', views.analysis, name='analysis'),
    url(r'^all_data/$', views.get_all_data, name='all_data'),
    url(r'^all_geo_data/$', views.get_all_geo_data, name='all_geo_data'),
    url(r'^all_data2/$', views.get_all_data2, name='all_data2'),
    # url(r'^get_all_data/$', views.get_all_data, name='get_all_data'),
    url(r'^all_light_data2/$', views.get_all_light_data2, name='all_light_data2'),
    url(r'^get_content/$', views.get_content, name='get_content'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
