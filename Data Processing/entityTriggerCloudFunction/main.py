# cloud function triggering the entity extract micro service
# Author : Parth Panchal
import requests
def trigger_entityExtract(data, context):
    """Background Cloud Function to be triggered by Cloud Storage.
       This generic function logs relevant data when a file is changed.
    Args:
        data (dict): The Cloud Functions event payload.
        context (google.cloud.functions.Context): Metadata of triggering event.
    Returns:
        None; the output is written to Stackdriver Logging
    """

    print('Event ID: {}'.format(context.event_id))
    print('Event type: {}'.format(context.event_type))
    print('Bucket: {}'.format(data['bucket']))
    print('File: {}'.format(data['name']))
    print('Metageneration: {}'.format(data['metageneration']))
    print('Created: {}'.format(data['timeCreated']))
    print('Updated: {}'.format(data['updated']))
    url = 'https://entityextractfromdatabase-oeueo7ct2a-uc.a.run.app/?' + 'id=' + str(data['name'])
    print(url)
    response = requests.get(url)
    print('status : {}'.format(response.status_code))
    return response.status_code