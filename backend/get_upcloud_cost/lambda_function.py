import json
import requests
import base64
from requests.auth import HTTPBasicAuth

def lambda_handler(event, context):
    body = json.loads(event["body"])
    upcloud_key = body["api"]
    upcloud_user = body["user"]
    response = requests.get('https://api.upcloud.com/1.3/price', auth=HTTPBasicAuth(upcloud_user, upcloud_key))
    zones = response.json()["prices"]["zone"]
    total_cost = 0
    for zone in zones:
      for resource in zone:
        if 'price' in zone[resource]:
          total_cost+=zone[resource]['price']
    return {
        'statusCode': 200,
        'headers': { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps(total_cost)
    }