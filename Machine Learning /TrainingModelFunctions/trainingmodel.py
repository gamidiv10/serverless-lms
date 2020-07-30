#Author (/ Modifier) : Parth Panchal
# listing files from the bucket "https://hackersandslackers.com/manage-files-in-google-cloud-storage-with-python/"
# Upload the file to bucket Credit: TA  Alapati Manjari (Lab 8 Server)
#  SKLearn Training Logic Credit : Python programming blog (Source : https://pythonprogramminglanguage.com/kmeans-text-clustering/)
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
from google.cloud import storage
import pickle
import os
import datetime
bucketName = "trainingresourcebucket"

def bucket_files_listing (bucket):
    bucketDirectoryList = "datasets"
    file = bucket.list_blobs(prefix=bucketDirectoryList)
    list_Files = [file.name for file in files if '.' in file.name]
    print(len(list_Files))
    return list_Files

storage_client = storage.Client()
bucket = storage_client.bucket(bucketName)
inputDocumentTrainingSource = []
fileList = bucket_files_listing (bucket)
for fileName in fileList:
    blob = bucket.blob(fileName)
    content = blob.download_as_string()
    inputDocumentTrainingSource.append(str(content))

TFIDFVectorizer = TfidfVectorizer(stop_words='english')
X = TFIDFVectorizer.fit_transform(inputDocumentTrainingSource)
word_feature_list = TFIDFVectorizer.get_feature_names()
param_k = 9
model_kmeans = KMeans(n_clusters=param_k, init='k-means++', max_iter=100, n_init=1)
model_kmeans.fit(X)

# Model saving
modelName = 'kmeans_model.pkl'
vectorizerName = 'vectorizer_model.pkl'
pickle.dump(model_kmeans, open(os.path.join(os.getcwd(), modelName), "wb"))
pickle.dump(word_feature_list,open(os.path.join(os.getcwd(), vectorizerName), "wb"))

blob = bucket.blob('{}/{}'.format(
    datetime.datetime.now().strftime('training_%Y%m%d_%H%M%S'),
    modelName))

blob.upload_from_filename(modelName)
blob = bucket.blob('{}/{}'.format(
    datetime.datetime.now().strftime('training_vectorizer_%Y%m%d_%H%M%S'),
    vectorizerName))
blob.upload_from_filename(vectorizerName)





