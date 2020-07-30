import json
import urllib.parse
import boto3

print('Loading function')

s3 = boto3.client('s3')
comprehend = boto3.client(service_name='comprehend')


def lambda_handler(event, context):
    #print("Received event: " + json.dumps(event, indent=2))

    # Get the object from the event and show its content type
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = urllib.parse.unquote_plus(
        event['Records'][0]['s3']['object']['key'], encoding='utf-8')
    try:
        response = s3.get_object(Bucket=bucket, Key=key)
        body = response['Body'].read()
        messageList = json.loads(body)
        messageBodyList = []
        for key in messageList:
            messageBodyList.append(messageList[key])
        comprehendResults = comprehend.batch_detect_sentiment(
            TextList=messageBodyList, LanguageCode='en')["ResultList"]

        for i in range(len(messageBodyList)):
            comprehendResults[i]['message'] = messageBodyList[i]
        s3.put_object(Body=json.dumps(comprehendResults),
                      Bucket='sentiment-results', Key=key)
    except Exception as e:
        print(e)
        print('Error getting object {} from bucket {}. Make sure they exist and your bucket is in the same region as this function.'.format(key, bucket))
        raise e
