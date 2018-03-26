#-*- coding: utf-8 -*-

import re

from django.core.mail import EmailMultiAlternatives

#---------------------------------------------------------------------

def text_to_html(contenu_texte):

	html_content = contenu_texte.replace("\n","<br>")
	html_content = re.sub(r"(?P<url>(?:http://|https://).*?)(?P<delimiteur>(?:\s|\<br\>|\)))", r"<a href='\g<url>'>\g<url></a>\g<delimiteur>", html_content)
	html_content = "<html><body>%s</body></html>" % (html_content)

	return html_content


def send_password_reset_email(email,password_reset_url):

	recipients = [email]

	text_content = u'''Dear user,

		You just asked for a password reset.
		Please click this link in order to reset your password : %s

		If you did not ask for a password reset, please ignore this email.

		Best regards,

		The team
		''' % (password_reset_url)
				
	message = EmailMultiAlternatives(subject=u"Password reset", body=text_content, to=recipients)                                      
	message.attach_alternative(text_to_html(text_content), "text/html") 
	
	message.send()