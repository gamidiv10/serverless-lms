# Extracting the recently updated entities from Database for rendering purposes
# Author : Parth Panchal
import os

from flask import Flask, render_template, flash,session,jsonify
from flask_cors import CORS,cross_origin
from retrieveDataFeedforWordCloud import wordcloudDataFeed
app = Flask(__name__)
CORS(app, support_credentials=True)
app.config['SECRET_KEY'] = '5791628bb0b13ce0c676dfde280ba245'

@app.route("/")
@app.route("/wordcloudfeed", methods=['GET', 'POST'])
@cross_origin(supports_credentials=True)
def wordclouddata():
    return jsonify(wordcloudDataFeed.datafeeds())
if __name__ == '__main__':
    app.run()
    #debug=True,host='127.0.0.1',port=int(os.environ.get('PORT', 5000))
