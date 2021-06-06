import json
import boto3

def lambda_handler(event, context):
    body = json.loads(event["body"])
    ec2 = boto3.resource('ec2',aws_access_key_id=body["accesskey"],aws_secret_access_key=body["secretkey"],region_name=body["region"])
    res = ec2.instances.filter(InstanceIds = [body["id"]]).stop()
    print(res)
    return {
        'statusCode': 200,
        'headers': { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps("Stopped Instance")
    }