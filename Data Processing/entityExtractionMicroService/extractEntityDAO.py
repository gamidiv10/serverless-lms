
import pymysql
class inserting_entity_database:
    def __init__(self,username,email,password,choice):
        self.username = username
        self.email = email
        self.password = password
        self.choice = choice

    def updateEntity(list):
        connection = pymysql.connect(host='35.193.61.188',
                                     user='root',
                                     password='root',
                                     db='entity_storage',
                                     charset='utf8mb4',
                                     cursorclass=pymysql.cursors.DictCursor
                                     )
        connection.cursor()

        try:
            with connection.cursor() as cursor:
                sqlInsertIntoDatabase = "INSERT INTO `entity_info` (`entity`, `frequency`) VALUES (%s, %s)"
                # https://github.com/PyMySQL/PyMySQL
                sqlSelectTuple = "SELECT `frequency` FROM `entity_info` WHERE `entity`=%s"

                sqlUpdateTuple = "UPDATE `entity_info` set `frequency` = %s where `entity`=%s"

                for item in list:
                    Entity = item[0]
                    latestFrequency = item[1]
                    result = cursor.execute(sqlSelectTuple, (Entity,))
                    if result:
                        frequency = result + int(latestFrequency)
                        frequency = str(frequency)
                        print('latest frequency'+str(latestFrequency))
                        print('current'+str(result))
                        print(frequency)
                        cursor.execute(sqlUpdateTuple, (frequency, Entity))
                    else:
                        cursor.execute(sqlInsertIntoDatabase, (Entity, str(latestFrequency)))

            connection.commit()
        except Exception as e:
            raise e
        finally:
            connection.close()

