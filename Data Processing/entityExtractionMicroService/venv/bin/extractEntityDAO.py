import mysql.connector
class registerDAO:
    def __init__(self,username,email,password,choice):
        self.username = username
        self.email = email
        self.password = password
        self.choice = choice

    def register(self):
        mydb = mysql.connector.connect(
            host="35.193.61.188",
            user="root",
            passwd="root",
            database="userdetails"
        )
        cursor = mydb.cursor()
        insert_stmt = 'INSERT INTO userinfo(email, name, password, topic) VALUES (%s, %s, %s, %s)'
        data = (self.email,self.username,self.password,self.choice)
        print(self.email+" "+self.username+" "+self.password+" "+self.choice)
        result = cursor.execute(insert_stmt,data)
        print(result)
        mydb.commit()
        return True
