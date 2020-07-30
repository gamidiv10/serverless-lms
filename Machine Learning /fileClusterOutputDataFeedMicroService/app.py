# Author :  Parth Panchal
# Formats the Data from output collector database to render it to ReactJS frontend

import os

from flask import Flask, render_template, flash,session,jsonify
from flask_cors import CORS,cross_origin
from retrieveFileClusterMappings import retrieveDataFeedsForCluster
app = Flask(__name__)
CORS(app, support_credentials=True)
app.config['SECRET_KEY'] = '5791628bb0b13ce0c676dfde280ba245'

@app.route("/")
@app.route("/fileClusterFeed", methods=['GET', 'POST'])
@cross_origin(supports_credentials=True)
def wordclouddata():
    data = retrieveDataFeedsForCluster.retrieveFileClusterMappings()
    return jsonify(data)
if __name__ == '__main__':
    app.run()
    #debug=True,host='127.0.0.1',port=int(os.environ.get('PORT', 5000))
