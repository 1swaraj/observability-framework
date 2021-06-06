import json
import requests

def lambda_handler(event, context):
    body = json.loads(event["body"])
    digital_ocean_key = body["api"]
    total_cost = 0
    headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+digital_ocean_key,
    }
    response = requests.get('https://api.digitalocean.com/v2/customers/my/balance', headers=headers)
    total_cost = str(response.json()['month_to_date_balance'])
    return {
        'statusCode': 200,
        'headers': { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps(total_cost)
    }