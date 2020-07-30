import requests
import json
import pymysql



def firebaseLogin(request)
    databaseConfig = pymysql.connect(authentication.c23jpwhxhykt.us-east-1.rds.amazonaws.com,admin,admin123,authentication )
    cursor = databaseConfig.cursor();
    request_json = request.get_json()
    firebaseAuth={};
    firebaseAuth['email']=request_json['email'];
    firebaseAuth['password']=request_json['password'];
    firebaseAuth['returnSecureToken']=True;
    url=httpsidentitytoolkit.googleapis.comv1accountssignInWithPasswordkey=AIzaSyBi_ASQcfi4ufv4RlPnKBeXBpiARUP7j4s
    x = requests.post(url, data = json.dumps(firebaseAuth))
    response={}
    fdata=json.loads(x.text);
    if idToken in fdata
        response['email']=firebaseAuth['email'];
        response['token']=fdata['idToken'];
        cursor.execute(select securityquestions.questionId, securityquestions.question from userdetails inner join usersecurityquestion on userdetails.userEmail=usersecurityquestion.userEmail inner join securityquestions on usersecurityquestion.securityquestionid=securityquestions.questionId where userdetails.userEmail=%s,(firebaseAuth['email']))
        result=cursor.fetchone()
        if result is not None
            response['questionId']=result[0];
            response['question']=result[1];
            response['status']=True;
        return json.dumps(response);
    else
        return json.dumps({'status'False,'message'fdata});