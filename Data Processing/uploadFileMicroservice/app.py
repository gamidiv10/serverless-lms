#The containerized microservice can accept the file object and upload the received object to GCS storage bucket
#Author : Parth Panchal
import os
from flask import Flask, request,jsonify
from flask_cors import CORS,cross_origin
from google.cloud import storage

app = Flask(__name__)
CORS(app, support_credentials=True)
app.config['SECRET_KEY'] = '5791628bb0b13ce0c676dfde280ba245'


@app.route("/", methods=['GET', 'POST'])
@app.route("/uploadFile", methods=['GET', 'POST'])
@cross_origin(supports_credentials=True)
def wordclouddata():
    if request.method == 'POST':
     file = request.files['file']
     bucket_name = "filesdir"
     storage_client = storage.Client.from_service_account_json('Dataprocessing-73c1c0294f86.json')
     bucket = storage_client.bucket(bucket_name)
     # Upload file to Google Bucket
     blob = bucket.blob(file.filename)
     blob.upload_from_string(file.read())
     return jsonify("File Uploaded")
if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0',port=int(os.environ.get('PORT', 5000)))
