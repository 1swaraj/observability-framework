import json
import requests
import base64
from requests.auth import HTTPBasicAuth

def lambda_handler(event, context):
    body = json.loads(event["body"])
    upcloud_key = body["api"]
    upcloud_user = body["user"]
    response = requests.get('https://api.upcloud.com/1.3/server', auth=HTTPBasicAuth(upcloud_user, upcloud_key))
    print(response.json())
    vms = response.json()["servers"]["server"]
    return {
        'statusCode': 200,
        'headers': { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps(vms)
    }