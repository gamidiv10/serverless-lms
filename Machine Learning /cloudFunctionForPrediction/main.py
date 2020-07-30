# Author / Modifier: Parth Panchal
# Credit : request the remote object using URL (source : https://docs.python.org/3.2/library/urllib.request.html)
# Credit : STACKOVERFLOW loading the pickle file object (source : https://stackoverflow.com/questions/35067957/how-to-read-pickle-file)
# Credit : Scikit learn document for obtaning vectorizer from the object (source : https://scikit-learn.org/stable/modules/generated/sklearn.feature_extraction.text.CountVectorizer.html)

from google.cloud import storage
import urllib.request as request
from sklearn.feature_extraction.text import TfidfVectorizer
import mysql.connector
import pickle
def hello_gcs(event, context):
    """Triggered by a change to a Cloud Storage bucket.
    Args:
         event (dict): Event payload.
         context (google.cloud.functions.Context): Metadata for the event.
    """
    bucket_name = event['bucket']
    source_blob_name = event['name']
    print(bucket_name)
    print(source_blob_name)
    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(source_blob_name)
    content = blob.download_as_string()
    print(content)
    input_array = []
    input_array.append(content)
    modelRequest = request.urlopen("https://storage.googleapis.com/trainingresourcebucket/training_20200726_213915/kmeans_model.pkl")
    wordsUrl = request.urlopen("https://storage.googleapis.com/trainingresourcebucket/training_vectorizer_20200726_213916/vectorizer_model.pkl")
    model = pickle.load (modelRequest)
    words = pickle.load(wordsUrl)
    vectorizerLoader = TfidfVectorizer(vocabulary=words)
    Y = vectorizerLoader.fit_transform(input_array)
    outputPrediction = model.predict(Y)
    resultantPredictionArray  = []
    resultantPredictionArray = outputPrediction.astype(int)
    cluster_number = resultantPredictionArray[0]
    cluster_number = str(cluster_number)
    print(cluster_number)
    mydb = mysql.connector.connect(
    host="35.192.37.150",
    user="root",
    password="root12345",
    database="store_file_cluster_db"
    )
    mycursor = mydb.cursor()
    sql = "INSERT INTO `store_file_cluster_db`.`cluster_file_info` (`file_name`, `cluster_number`) VALUES (%s, %s);"
    val = (source_blob_name, cluster_number)
    mycursor.execute(sql, val)

    mydb.commit()

    print(mycursor.rowcount, "record inserted.")