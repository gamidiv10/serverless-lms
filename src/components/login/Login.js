import React, {useState} from 'react'
import './Login.css'
import {useHistory} from 'react-router-dom'

export const Login = () => {

    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");

    const history = useHistory();

    const handleLoginClick = (e) => {
        e.preventDefault();
        history.push('/auth')
}
    const handleEmail = (e) => {
        e.preventDefault();
        setEmail(e.target.value); 
        console.log(email); 

    }
    const handlePwd = (e) => {
        e.preventDefault();
        setPwd(e.target.value);
        console.log(pwd)
    }

    return (
        <div className="login-div">
        <div className="container login-container">
            <div className="form-container">
                <div className="login-form">
                    <h3>Learning Management System</h3>
                    <form>
                        <div className="form-group input-element">
                            <input type="text" className="form-control" onChange={handleEmail} placeholder="Email ID" required/>
                        </div>
                        <div className="form-group input-element">
                            <input type="password" className="form-control" onChange={handlePwd} placeholder="Password" required/>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-success" onClick={handleLoginClick} type="submit">Login</button>
                        </div>
                        <div className="form-group">
                            <a href="/register" style={{color: '#02195E', fontWeight: 'bold'}}>Don't have an account?</a>
                        </div>           
                    </form>
                </div>
            </div>
        </div>
        </div>
    )
}


