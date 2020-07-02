import React, {useState} from 'react'
import './Register.css'
import {useHistory} from 'react-router-dom'

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
    const history = useHistory();


    const handleFirstName = (e) => {
        e.preventDefault();
        if(e.target.value === ""){
            setFirstNameError("First Name Field Should not be Empty");
        }
        else{
            setFirstNameError("")
        }
        setFirstName(e.target.value);        
    }
    const handleLastName = (e) => {
        e.preventDefault();
        if(e.target.value === ""){
            setLastNameError("Last Name Field Should not be Empty");
        }
        else{
            setLastNameError("")
        }
        setLastName(e.target.value);
    
    }
    const handleEmail = (e) => {
        e.preventDefault();
        if(e.target.value === ""){
            setEmailError("Email Field Should not be Empty");
        }
        else{
            setEmailError("")
        }
        setEmail(e.target.value);        
    }

    const handlePwd = (e) => {
        e.preventDefault();
        if(e.target.value === ""){
            setPwdError("Password Field Should not be Empty");
        }
        else{
            setPwdError("")
        }
        setPwd(e.target.value);
    }

    const handleUniversity = (e) => {
        e.preventDefault();
        if(e.target.value === ""){
            setUniversityError("University Field Should not be Empty");
        }
        else{
            setUniversityError("")
        }
        setUniversity(e.target.value);        
    }

    const handleRole = (e) => {
        e.preventDefault();
        if(e.target.value === ""){
            setRoleError("Role Field Should not be Empty");
        }
        else{
            setRoleError("")
        }
        setRole(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(firstName === ""){
            setFirstNameError("First Name Field Should not be Empty");
        }
        if(lastName === ""){
            setLastNameError("Last Name Field Should not be Empty");
        }
        if(email === ""){
            setEmailError("Email Field Should not be Empty");
        }
        if(pwd === ""){
            setPwdError("Password Field Should not be Empty");
        }
        if(university === ""){
            setUniversityError("University Field Should not be Empty");
        }
        if(role === ""){
            setRoleError("Role Field Should not be Empty");
        }
        else{
        history.push('/login')
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
                            <input type="text" className="form-control"  onChange={handleFirstName} placeholder="First Name" required/>
                        </div>
                        <div className="form-group input-element">
                            <input type="text" className="form-control"  onChange={handleLastName} placeholder="Last Name" required/>
                        </div>
                        <div className="form-group input-element">
                            <input type="text" className="form-control"  onChange={handleEmail} placeholder="Email ID" required/>
                        </div>
                        <div className="form-group input-element">
                            <input type="password" className="form-control" onChange={handlePwd} placeholder="Password" required/>
                        </div>
                        <div className="form-group input-element">
                            <input type="text" className="form-control"  onChange={handleUniversity} placeholder="University" required/>
                        </div>
                        <div className="form-group input-element">
                            <input type="text" className="form-control" onChange={handleRole} placeholder="Role" required/>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-success" type="submit"  onClick={handleSubmit}>Register</button>
                        </div>
                        <div className="form-group">
                            <a href="/" style={{color: '#02195E', fontWeight: 'bold'}}>Already have an account?</a>
                        </div>
                        <div className="form-group">
                            <p className="reg-error">{emailError}</p>
                            <p className="reg-error">{pwdError}</p>
                            <p className="reg-error">{firstNameError}</p>
                            <p className="reg-error">{lastNameError}</p>
                            <p className="reg-error">{universityError}</p>
                            <p className="reg-error">{roleError}</p>
                        </div>   
                    </form>
                </div>
            </div>
        </div>
        </div>
    )
}


