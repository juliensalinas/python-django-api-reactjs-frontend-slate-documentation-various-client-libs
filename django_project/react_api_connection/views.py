#-*- coding: utf-8 -*-

from django.shortcuts import render_to_response

#------------------------------------------------

def index(request):

	#React app

	return render_to_response('react_api_connection/index.html')
