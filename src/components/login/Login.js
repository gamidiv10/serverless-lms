import React, { useState } from 'react'
import './Login.css'
import { useHistory } from 'react-router-dom'

export const Login = () => {

    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const history = useHistory();
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    var tempToken = '';
    const [showQ, setShowQ] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [pwdError, setPwdError] = useState("");
    const [answerError, setAnswerError] = useState("");



    const handleLoginClick = (e) => {
        e.preventDefault();
        var errorStatus = false;
        if (email === "") {
            setEmailError("Email field Should not be Empty");
            errorStatus = true;
        }
        if (pwd === "") {
            setPwdError("Password field Should not be Empty");
            errorStatus = true;
        }
        if (!errorStatus) {
            var data = { "email": email, "password": pwd }
            console.log(data)
            fetch('https://cors-anywhere.herokuapp.com/https://us-central1-lmsauthentication.cloudfunctions.net/firebaseLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, PUT, POST, OPTIONS',
                    'Access-Control-Allow-Headers': '*'
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(data1 => {
                    console.log('Success:', data1);
                    if (data1.status) {
                        localStorage.setItem('tempToken', data1.token);
                        setQuestion(data1.question);
                        setShowQ(true);
                        console.log("true");
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }
    const handleSecurityLoginClick = (e) => {
        e.preventDefault();
        var errorStatus = false;
        if (answer === "") {
            setAnswerError("Answer field Should not be Empty");
            errorStatus = true;
        }
        if (!errorStatus) {
            var data = { "email": email, "answer": answer }
            console.log(data)
            fetch('https://cors-anywhere.herokuapp.com/https://7i8s18cx16.execute-api.us-east-1.amazonaws.com/default/securityAnswerValidation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, PUT, POST, OPTIONS',
                    'Access-Control-Allow-Headers': '*'
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(data1 => {
                    console.log('Success:', data1);
                    if (data1.status) {
                        console.log("Logged in successfully");
                        console.log(localStorage.getItem("tempToken"));
                        localStorage.setItem("lmstoken", localStorage.getItem("tempToken"));
                        localStorage.setItem("role", data1.role)
                        localStorage.setItem("email", email)
                        localStorage.removeItem("tempToken");
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }

    const handleEmail = (e) => {
        e.preventDefault();
        if (e.target.value === "") {
            setEmailError("Email field Should not be Empty");
        }
        else {
            setEmailError("")
        }
        setEmail(e.target.value);
        console.log(email);

    }
    const handlePwd = (e) => {
        e.preventDefault();
        if (e.target.value === "") {
            setPwdError("Password field Should not be Empty");
        }
        else {
            setPwdError("")
        }
        setPwd(e.target.value);
        console.log(pwd)
    }

    const handleAnswer = (e) => {
        e.preventDefault();
        if (e.target.value === "") {
            setAnswerError("Answer field Should not be Empty");
        }
        else {
            setAnswerError("")
        }
        setAnswer(e.target.value);
        console.log(answer)
    }

    return (
        <div className="login-div">
            <div className="container login-container">
                <div className="form-container">
                    <div className="login-form">
                        <h3>Learning Management System</h3>
                        <form>
                            <div className="form-group input-element" style={{ display: !showQ ? 'block' : 'none' }}>
                                <input type="text" className="form-control" onChange={handleEmail} placeholder="Email ID" required />
                                <p className="reg-error">{emailError}</p>
                            </div>
                            <div className="form-group input-element" style={{ display: !showQ ? 'block' : 'none' }}>
                                <input type="password" className="form-control" onChange={handlePwd} placeholder="Password" required />
                                <p className="reg-error">{pwdError}</p>
                            </div>
                            <div className="form-group input-element" style={{ display: showQ ? 'block' : 'none' }}>
                                <h4>{question}</h4>
                                <input type="text" className="form-control" onChange={handleAnswer} placeholder="Security Answer" required />
                                <p className="reg-error">{answerError}</p>
                            </div>
                            <div className="form-group" style={{ display: !showQ ? 'block' : 'none' }}>
                                <button className="btn btn-success" onClick={handleLoginClick} type="submit">Login</button>
                            </div>
                            <div className="form-group" style={{ display: showQ ? 'block' : 'none' }}>
                                <button className="btn btn-success" onClick={handleSecurityLoginClick} type="submit">Login</button>
                            </div>
                            <div className="form-group">
                                <a href="/register" style={{ color: '#02195E', fontWeight: 'bold' }}>Don't have an account?</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}


