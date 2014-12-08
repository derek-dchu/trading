from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
	url(r'^$', include('home.urls', namespace='homepage')),
	url(r'^builder/$', include('algo_builder.urls', namespace='builder')),
    url(r'^backtest/$', include('backtest.urls', namespace='backtest')),
    # url(r'^admin/', include(admin.site.urls)),
)
