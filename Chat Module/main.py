
import base64
import json
import logging
import os
import time
import threading

from flask import current_app, Flask, render_template, request, redirect, url_for
from flask_socketio import SocketIO, emit
from google.cloud import pubsub_v1
from google.cloud import storage


app = Flask(__name__)
socketio = SocketIO(app)

# Configuration of environemntal variables for credentials
app.config['PUBSUB_VERIFICATION_TOKEN'] = os.environ['PUBSUB_VERIFICATION_TOKEN']
app.config['PUBSUB_TOPIC'] = os.environ['PUBSUB_TOPIC']
app.config['PROJECT'] = os.environ['GOOGLE_CLOUD_PROJECT']


# Global list to storage messages received by this instance.
MESSAGES = []

# Initialization of publisher client 
publisher = pubsub_v1.PublisherClient()

# Initialization of storage client
storage_client = storage.Client()
bucket_name = 'chat-bucket-961'
bucket = storage_client.get_bucket(bucket_name)

#--------------------------------------------------------------------------------------------------------------------------------

def createJson(MESSAGES):

    json_file = {}
    count = 1

    # put messages in json array
    for message in MESSAGES:
        json_file[str(count)] = message
        count = count + 1

    # generate a file name with current timestamp
    blob_name = "chat_"+str(time.time()).replace(".","")+".json"

    blob = bucket.blob(blob_name)

    # upload chat messages as a json file and json_file with ordered numeric keys
    blob.upload_from_string(
        data=json.dumps({int(x):json_file[x] for x in json_file.keys()}, indent=4, sort_keys=True),
        content_type='application/json'
    )

    return 'UPLOAD COMPLETE'

#--------------------------------------------------------------------------------------------------------------------------------

def saveJson():
    while(True):
        global MESSAGES

        # save messages as a JSON file in bucket
        createJson(MESSAGES)

        # empty array
        dataDummy = "0"
        socketio.emit('delete messages',dataDummy, broadcast=True)
        MESSAGES = []

        print('chat Json saved, now wait 5 minute')
        time.sleep(300)

#--------------------------------------------------------------------------------------------------------------------------------

# Thread to save char messages files every 5 minutes
thread_save  = threading.Thread(target=saveJson)
thread_save.start()

#--------------------------------------------------------------------------------------------------------------------------------

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        print("route /  GET")
        return render_template('index.html', messages=MESSAGES)

    if request.method == 'POST':
        print("route /  POST")
        data = request.form.get('payload', 'Example payload').encode('utf-8')

        # Generate the path for the topic
        topic_path = publisher.topic_path(
            current_app.config['PROJECT'],
            current_app.config['PUBSUB_TOPIC'])

        # Publish message to the topic
        publisher.publish(topic_path, data=data)

        time.sleep(1.5)
        return redirect(url_for('index'))

#--------------------------------------------------------------------------------------------------------------------------------

@app.route('/pubsub/push', methods=['POST'])
def pubsub_push():
    # check the verification token of the PubSub service
    if (request.args.get('token', '') !=
            current_app.config['PUBSUB_VERIFICATION_TOKEN']):
        return 'Invalid request', 400

    # extract the message from the PubSub service
    envelope = json.loads(request.data.decode('utf-8'))
    payload = base64.b64decode(envelope['message']['data'])
    payload = payload.decode("utf-8")

    # add new message
    MESSAGES.append(payload)
    print(MESSAGES)
    socketio.emit('update messages',payload, broadcast=True)

    # Returning any 2xx status indicates successful receipt of the message.
    return 'OK', 200

#--------------------------------------------------------------------------------------------------------------------------------

@app.errorhandler(500)
def server_error(e):
    logging.exception('An error occurred during a request.')
    return """
    An internal error occurred: <pre>{}</pre>
    See logs for full stacktrace.
    """.format(e), 500

#--------------------------------------------------------------------------------------------------------------------------------

if __name__ == '__main__':

    app.run(host='127.0.0.1', port=8080, debug=False)
