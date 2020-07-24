import React, { useState } from 'react'
import './Register.css'
import { useHistory } from 'react-router-dom'

export const Register = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [university, setUniversity] = useState("");
    const [role, setRole] = useState("");
    const [pwd, setPwd] = useState("");
    const [emailError, setEmailError] = useState("");
    const [pwdError, setPwdError] = useState("");
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [universityError, setUniversityError] = useState("");
    const [roleError, setRoleError] = useState("");
    const [securityQuestion, setSecurityQuestion] = useState("");
    const [securityQuestionError, setSecurityQuestionError] = useState("");
    const [securityAnswer, setSecurityAnswer] = useState("");
    const [securityAnswerError, setSecurityAnswerError] = useState("");
    const history = useHistory();


    const handleFirstName = (e) => {
        e.preventDefault();
        if (e.target.value === "") {
            setFirstNameError("First Name Field Should not be Empty");
        }
        else {
            setFirstNameError("")
        }
        setFirstName(e.target.value);
    }
    const handleLastName = (e) => {
        e.preventDefault();
        if (e.target.value === "") {
            setLastNameError("Last Name Field Should not be Empty");
        }
        else {
            setLastNameError("")
        }
        setLastName(e.target.value);

    }
    const handleEmail = (e) => {
        e.preventDefault();
        if (e.target.value === "") {
            setEmailError("Email Field Should not be Empty");
        }
        else {
            setEmailError("")
        }
        setEmail(e.target.value);
    }

    const handlePwd = (e) => {
        e.preventDefault();
        if (e.target.value === "") {
            setPwdError("Password Field Should not be Empty");
        }
        else {
            setPwdError("")
        }
        setPwd(e.target.value);
    }

    const handleUniversity = (e) => {
        e.preventDefault();
        if (e.target.value === "") {
            setUniversityError("University Field Should not be Empty");
        }
        else {
            setUniversityError("")
        }
        setUniversity(e.target.value);
    }

    const handleSecurityQuestion = (e) => {
        e.preventDefault();
        if (e.target.value === "") {
            setSecurityQuestionError("Security question Field Should not be Empty");
        }
        else {
            setSecurityQuestionError("")
        }
        setSecurityQuestion(e.target.value);
    }

    const handleSecurityAnswer = (e) => {
        e.preventDefault();
        if (e.target.value === "") {
            setSecurityAnswerError("Security answer Field Should not be Empty");
        }
        else {
            setSecurityAnswerError("")
        }
        setSecurityAnswer(e.target.value);
    }

    const handleRole = (e) => {
        e.preventDefault();
        if (e.target.value === "") {
            setRoleError("Role Field Should not be Empty");
        }
        else {
            setRoleError("")
        }
        setRole(e.target.value);
    }

    const handleSubmit = (e) => {
        var errorStatus = false;
        e.preventDefault();

        if (firstName === "") {
            setFirstNameError("First Name Field Should not be Empty");
            errorStatus = true;
        }
        if (lastName === "") {
            setLastNameError("Last Name Field Should not be Empty");
            errorStatus = true;
        }
        if (email === "") {
            setEmailError("Email Field Should not be Empty");
            errorStatus = true;
        }
        if (pwd === "") {
            setPwdError("Password Field Should not be Empty");
            errorStatus = true;
        }
        if (university === "") {
            setUniversityError("University Field Should not be Empty");
            errorStatus = true;
        }
        if (role === "") {
            setRoleError("Role Field Should not be Empty");
            errorStatus = true;
        }

        if (securityAnswer === "") {
            setSecurityAnswerError("Security answer Field Should not be Empty");
            errorStatus = true;
        }
        if (securityQuestion === "") {
            setSecurityQuestionError("Security question Field Should not be Empty");
            errorStatus = true;
        }

        if (!errorStatus) {
            var data = { "email": email, "password": pwd, "firstName": firstName, "lastName": lastName, "university": university, "question": securityQuestion, "answer": securityAnswer, "role": role }
            console.log(data)
            fetch('https://cors-anywhere.herokuapp.com/https://us-central1-lmsauthentication.cloudfunctions.net/signupusers', {
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
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

            history.push('/')
        }

    }
    return (
        <div className="register-div">
            <div className="container register-container">
                <div className="form-container">
                    <div className="register-form">
                        <h3>Learning Management System</h3>
                        <form>
                            <div className="form-group input-element">
                                <input type="text" className="form-control" onChange={handleFirstName} placeholder="First Name" required />
                                <p className="reg-error">{firstNameError}</p>
                            </div>
                            <div className="form-group input-element">
                                <input type="text" className="form-control" onChange={handleLastName} placeholder="Last Name" required />
                                <p className="reg-error">{lastNameError}</p>
                            </div>
                            <div className="form-group input-element">
                                <input type="text" className="form-control" onChange={handleEmail} placeholder="Email ID" required />
                                <p className="reg-error">{emailError}</p>
                            </div>
                            <div className="form-group input-element">
                                <input type="password" className="form-control" onChange={handlePwd} placeholder="Password" required />
                                <p className="reg-error">{pwdError}</p>
                            </div>
                            <div className="form-group input-element">
                                <input type="text" className="form-control" onChange={handleUniversity} placeholder="University" required />
                                <p className="reg-error">{universityError}</p>
                            </div>
                            <div className="form-group input-element">
                                <select name="role" id="role" className="form-control" onChange={handleRole} placeholder="Role" required >
                                    <option value="" disabled selected hidden>Role</option>
                                    <option value="student">Student</option>
                                    <option value="instructor">Instructor</option>
                                </select>
                                <p className="reg-error">{roleError}</p>
                            </div>
                            <div className="form-group input-element">
                                <select name="securityQuestion" id="securityQuestion" className="form-control" onChange={handleSecurityQuestion} placeholder="SecurityQuestion" required >
                                    <option value="" disabled selected hidden>Security Question</option>
                                    <option value="What is favourite sport?">What is your favourite sport?</option>
                                    <option value="Where did you pursue your high school?">Where did you pursue your high school?</option>
                                    <option value="What is your pet name?">What is your pet name?</option>
                                    <option value="What is the name of your sibling?">What is the name of your sibling?</option>
                                </select>
                                <p className="reg-error">{securityQuestionError}</p>
                            </div>
                            <div className="form-group input-element">
                                <input type="text" className="form-control" onChange={handleSecurityAnswer} placeholder="Security answer" required />
                                <p className="reg-error">{securityAnswerError}</p>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-success" type="submit" onClick={handleSubmit}>Register</button>
                            </div>
                            <div className="form-group">
                                <a href="/" style={{ color: '#02195E', fontWeight: 'bold' }}>Already have an account?</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}


