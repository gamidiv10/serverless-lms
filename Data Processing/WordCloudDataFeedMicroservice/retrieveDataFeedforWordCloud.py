# Algorithm extracting the frequently used entities from the latest database for trend analysis
# Author : Parth Panchal

import mysql.connector

class wordcloudDataFeed:
    def filterData(entity):
        return entity[0].isalpha()

    def datafeeds():
        select_query = "SELECT DISTINCT FREQUENCY FROM entity_info"
        mydb = mysql.connector.connect(
            host="35.193.61.188",
            user="root",
            password="root",
            database="entity_storage"
        )

        mycursor = mydb.cursor()

        mycursor.execute(select_query)

        myresult = mycursor.fetchall()
        list = []
        for x in myresult:
            tally = int(x[0])
            list.append(tally)

        list.sort(reverse=True)
        maximum = 0
        maximum2 = 0
        maximum3 = 0
        len_list = len(list)
        if len_list > 0:
            maximum = list[0]
        if len_list > 1:
            maximum2 = list[1]
        if len_list > 2:
            maximum3 = list[2]




        select_query_M1  = "SELECT * FROM entity_info where frequency="+str(maximum)
        select_query_M2 = "SELECT * FROM entity_info where frequency=" + str(maximum2)
        select_query_M3 = "SELECT * FROM entity_info where frequency="+str(maximum3)
        mycursor.execute(select_query_M1)
        M1 = mycursor.fetchall()
        mycursor.execute(select_query_M2)
        M2 = mycursor.fetchall()

        #filtr = lambda filterfunc: x[0].isalpha()
        l = [ (X[0],X[1]) for X in M1]
        L = filter(wordcloudDataFeed.filterData,l)
        l1 = [(X[0],X[1]) for X in M2]
        L1 = filter(wordcloudDataFeed.filterData,l1)
        print(l1)
        print(type(l1))
        l = tuple(L1) + tuple(L)


        if len(l) < 30:
            rows_required = 30 - len(l)
            mycursor.execute(select_query_M3)
            M3 = mycursor.fetchall()
            l2 = [(X[0], X[1]) for X in M3]
            if rows_required <= len(l2):
                l2 = l2[:rows_required]
            elif  rows_required > len(l2):
                l2 = l2[:len(l2)]
            l2 = filter(wordcloudDataFeed.filterData, l2)
            l = l+tuple(l2)
        print(len(l))
        return l

#SELECT DISTINCT FREQUENCY FROM entity_storage.entity_info;
