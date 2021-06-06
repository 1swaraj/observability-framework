import json
from dopy.manager import DoManager
import requests

def lambda_handler(event, context):
    body = json.loads(event["body"])
    digital_ocean_key = body["api"]
    do = DoManager(None, digital_ocean_key, api_version=2)
    dropletsinfo = []
    droplets = do.all_active_droplets()
    return {
        'statusCode': 200,
        'headers': { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps(droplets)
    }
