# The microservice that extract entities from the file object received from the bucket on the trigger of the cloud function and saves in mysql instance of GCloud
# Author : Parth Panchal
# Credit Google Cloud official documentation : https://cloud.google.com/storage/docs/downloading-objects#code-samples
# Credit : Programming Creek to obtain file object as a string (https://www.programcreek.com/python/example/104465/google.cloud.storage.Blob
# Credit : Entity extraction from given text (towardsdatascience)  https://towardsdatascience.com/named-entity-recognition-with-nltk-and-spacy-8c4a7d88e7da


import os
import google.datalab.storage as storage
from flask import Flask,jsonify,request
from ExtractEntity import ExtractEntities
from extractEntityDAO import inserting_entity_database
app = Flask(__name__)
app.config['SECRET_KEY'] = '5791628bb0b13ce0c676dfde280ba245'
#https://cloud.google.com/storage/docs/downloading-objects#code-samples
def download_blob(bucket_name, source_blob_name, destination_file_name):
    """Downloads a blob from the bucket."""
    # bucket_name = "your-bucket-name"
    # source_blob_name = "storage-object-name"
    # destination_file_name = "local/path/to/file"

    storage_client = storage.Client.from_service_account_json('Dataprocessing-73c1c0294f86.json')
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(source_blob_name)

    #blob.download_to_filename(destination_file_name)
    content = blob.download_as_string()
    #https://www.programcreek.com/python/example/104465/google.cloud.storage.Blob
    print(content)
    l = ExtractEntities.extractEntities(str(content))
    inserting_entity_database.updateEntity(l)
    print(
        "Blob {} downloaded to {}.".format(
            source_blob_name, destination_file_name
        )
    )

@app.route("/")
@app.route("/extractEntity")
def extractEntityEndpoint():
    requestId = request.args['id']
    print("request" + requestId)
    bucket_name = 'filesdir'
    source_blob_name = requestId
    destination_file_name = '/'
    download_blob(bucket_name, source_blob_name, destination_file_name)
    return jsonify("hello")

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0',port=int(os.environ.get('PORT', 8080)))
