import requests
import json

response = requests.post(
    'http://artem4ke.pythonanywhere.com/', data=json.dumps({'inputName': 'Yana',
			'inputEmail': 'yana98@gmal',
			'inputPassword': '111234'
			})
)
print(response.text)
# json_response = response.json()
# print(json_response)
