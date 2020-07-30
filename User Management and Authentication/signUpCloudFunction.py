import requests
import json
import pymysql



def signUp(request):
    databaseConfig = pymysql.connect("authentication.c23jpwhxhykt.us-east-1.rds.amazonaws.com","admin","admin123","authentication" )
    cursor = databaseConfig.cursor();
    request_json = request.get_json()
    firebaseAuth={};
    firebaseAuth['email']=request_json['email'];
    firebaseAuth['password']=request_json['password'];
    firebaseAuth['returnSecureToken']=True;
    cursor.execute("select * from userdetails where userEmail=%s",(firebaseAuth['email']))
    result=cursor.fetchone()
    if result is None:
        cursor.execute("INSERT INTO `authentication`.`userdetails` (`userEmail`,`firstName`,`lastName`,`university`,`password`,`role`) VALUES (%s,%s,%s,%s,%s,%s)",(request_json['email'],request_json['firstName'],request_json['lastName'],request_json['university'],request_json['password'],request_json['role']));
        databaseConfig.commit();
        cursor.execute("select questionId from securityquestions where question=%s",(request_json['question']));
        questionId=cursor.fetchone()
        if questionId is not None:
            questionIdRes=questionId[0];
            cursor.execute("INSERT INTO `authentication`.`usersecurityquestion` (`userEmail`,`securityquestionid`,`securityQuestionAnswer`) VALUES (%s,%s,%s)",(request_json['email'],questionIdRes,request_json['answer']));
            databaseConfig.commit();        
        url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBi_ASQcfi4ufv4RlPnKBeXBpiARUP7j4s"
        x = requests.post(url, data = json.dumps(firebaseAuth))
        return json.dumps({'status':True,'message':'User registered successfully'});
    else:
        return  json.dumps({'status':False,'message':'User already exist'})
