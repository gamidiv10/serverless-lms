# Author : Parth Panchal
# Transform incoming data in a JSON format for rendering purposes as node and edges

import mysql.connector
class retrieveDataFeedsForCluster:
    def retrieveFileClusterMappings():
        mydb = mysql.connector.connect(
            host="35.192.37.150",
            user="root",
            password="root12345",
            database="store_file_cluster_db"
        )

        mycursor = mydb.cursor()

        mycursor.execute("SELECT * FROM store_file_cluster_db.cluster_file_info")

        myresult = mycursor.fetchall()

        import json

        data = {}
        nodes = []
        links = []

        node_list = []
        for x in myresult:
            r1 = {}
            r1['source'] = x[0]
            r1['target'] = x[1]
            links.append(r1)
            if x[0] not in node_list:
                node_list.append(x[0])
                row = {}
                row['id'] = x[0]
                nodes.append(row)
            if x[1] not in node_list:
                node_list.append(x[1])
                row = {}
                row['id'] = x[1]
                nodes.append(row)

        data['nodes'] = nodes
        data['links'] = links
        return data
