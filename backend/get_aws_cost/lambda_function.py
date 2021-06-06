import boto3
import json
import datetime as dt
def lambda_handler(event, context):
    body = json.loads(event["body"])
    today = format(dt.date.today(), '%Y-%m-%d')
    lastmonth = format(dt.date.toda y().replace(day=1) - dt.timedelta(days=30), '%Y-%m-%d')
    client = boto3.client(service_name='ce',aws_access_key_id=body["accesskey"],aws_secret_access_key=body["secretkey"])
    response = client.get_cost_and_usage(
        TimePeriod={
            'Start': lastmonth,
            'End': today
        },
        Granularity='MONTHLY',
        Metrics=['AmortizedCost'],
    )
    return {
        'statusCode': 200,
        'headers': { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps(str(response['ResultsByTime'][0]['Total']['AmortizedCost']['Amount']))
    }