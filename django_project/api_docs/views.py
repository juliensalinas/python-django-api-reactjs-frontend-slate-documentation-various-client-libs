#-*- coding: utf-8 -*-

from django.shortcuts import render_to_response

#------------------------------------------------

def docs(request):

	#doc générée par Slate
	
	return render_to_response('api_docs/index.html')

