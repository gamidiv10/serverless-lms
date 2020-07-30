import json
import pymysql



def lambda_handler(event, context):
    databaseConfig = pymysql.connect("authentication.c23jpwhxhykt.us-east-1.rds.amazonaws.com","admin","admin123","authentication" )
    cursor = databaseConfig.cursor();
    request=json.loads(event["body"])
    cursor.execute("DELETE FROM `usersonline` WHERE useremail=%s",(request["email"]))
    databaseConfig.commit();
    return json.dumps({"status":True, "message":"logged out"})