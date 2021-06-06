import json
import boto3
from datetime import datetime, timedelta

def get_cpu_usage(instanceid,region):
    client = boto3.client('cloudwatch',region_name=region)
    response = client.get_metric_statistics(
            Namespace='AWS/EC2',
            MetricName='CPUUtilization',
            Dimensions=[
                {
                'Name': 'InstanceId',
                'Value': instanceid
                },
            ],
            StartTime=datetime.now() - timedelta(days=7),
            EndTime=datetime.now(),
            Period=86400,
            Statistics=[
                'Average',
            ],
            Unit='Percent'
        )
    if len(response["Datapoints"]) > 0 :
        return str(response["Datapoints"][0]["Average"])
    return "0"


def lambda_handler(event, context):
    body = json.loads(event["body"])
    ec2_client = boto3.client('ec2',aws_access_key_id=body["accesskey"],aws_secret_access_key=body["secretkey"])
    regions = [region['RegionName'] for region in ec2_client.describe_regions()['Regions']]
    count = 1
    for region in regions:
        ec2 = boto3.resource('ec2',region_name=region,,aws_access_key_id=body["accesskey"],aws_secret_access_key=body["secretkey"])
        instances = ec2.instances.all()
        ec2info = []
        for instance in instances:
            cpu = "0"
            if instance.state['Name']=='running':
                cpu = get_cpu_usage(instance.id,region)
            ec2info.append({
                'sr':count,
                'identifier': instance.id,
                'status': instance.state['Name'],
                'type': instance.instance_type,
                'priv_ip': instance.private_ip_address,
                'pub_ip': instance.public_ip_address,
                'cpu':cpu,
                'region':region
                })
            count+=1
    return {
        'statusCode': 200,
        'headers': { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps(ec2info)
    }