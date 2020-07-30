import json
import pymysql


def lambda_handler(event, context):
    databaseConfig = pymysql.connect("authentication.c23jpwhxhykt.us-east-1.rds.amazonaws.com","admin","admin123","authentication" )
    cursor = databaseConfig.cursor();
    request=json.loads(event["body"])
    cursor.execute("select userdetails.role from usersecurityquestion     inner join securityquestions on usersecurityquestion.securityquestionid = securityquestions.questionId inner join userdetails on usersecurityquestion.userEmail=userdetails.userEmail where usersecurityquestion.securityQuestionAnswer=%s and usersecurityquestion.userEmail=%s",(request["answer"],request["email"]))
    result = cursor.fetchone()
    print(result);
    if result is not None:
        cursor.execute("select * from usersonline where useremail=%s",(request["email"]));
        updateResult =cursor.fetchone();
        if updateResult is None:
            print("insert")
            print(request["email"]);
            cursor.execute("INSERT INTO `usersonline` (`useremail`,`activeFrom`) VALUES (%s,now())",(request["email"]));
            databaseConfig.commit();
        else:
            cursor.execute("UPDATE `usersonline` SET `activeFrom` = now() WHERE `useremail` = %s",(request["email"]));
            databaseConfig.commit();
        return json.dumps({"status":True, "role":result[0]})
    else:
        return json.dumps({"status":False})  