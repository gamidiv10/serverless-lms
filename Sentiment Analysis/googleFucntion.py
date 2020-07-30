import boto3
from google.cloud import storage


def hello_gcs(event, context):
    try:
        bucketName = event["bucket"]
        fileName = event["name"]
        print(bucketName, fileName)
        client = storage.Client()
        bucket = client.get_bucket(bucketName)
        blob = bucket.get_blob(fileName)
        print(blob.download_as_string())
        s3 = boto3.client('s3', aws_access_key_id='ASIAV6QR37AUNXOOJ755', aws_secret_access_key='od8gQd93NcWUKB/GDJsyg3ZYpQrWKWmejNg6Nm3m',
                          aws_session_token='FwoGZXIvYXdzEB8aDGwG9SRdAXLE2xudmyLCAc/Ky60JJe5T1GmyM8MdbDk0eCpyT98rzcCs1doCghEQcK1dO4whPZkKrZJ+gyyTH7rvCqOJ+Xux9Hr654h7UHeGrs4gi1Wfx+0i55cIptaCfOsFGlhsvsG38gy/wvDcnTHqGeVMNZutoHXraEd6Mypqxj1vkdisapw80XGC3KUjketDpcXI7Fr7rewO5BXHuxe8vMvhM7qa2MOOIyVt2IUBkDWDIevQD3OmUYjHsfh64XtEGgS/XuJrDlCEvhY4MOABKNLi9/gFMi312wB7FBgOhz/fONhqKhoq5l4oriBWvH4oh6F2eG+Ws8UnN0Wa1wDXFJh47KM=')
        s3.put_object(Body=blob.download_as_string(),
                      Bucket='serverless-lms', Key=fileName)
    except Exception as e:
        print(e)
