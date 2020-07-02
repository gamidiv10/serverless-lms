import React, {useState, useEffect} from 'react'
import './TwoFactorAuth.css'
import {useHistory} from 'react-router-dom'

export const TwoFactorAuth = () => {

    const history = useHistory();
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    useEffect(() => {
        setQuestion('What is the name of your favourite highschool teacher?');
      }, []);


    const loginClick = (e) => {
        e.preventDefault();
        history.push('/home');
}

    const handleAnswer = (e) => {
        e.preventDefault();
        setAnswer(e.target.value);
        console.log(answer);
    }

    return (
        <div className="two-factor-auth-div">
        <div className="container two-factor-auth-container">
            <div className="form-container">
                <div className="two-factor-auth-form">
                    <h3>Learning Management System</h3>
                    <form>
                        <div className="form-group">
                            <span className="label label-default">{question}</span>                        
                        </div>

                        <div className="form-group input-element">
                            <input type="password" className="form-control" onChange={handleAnswer} placeholder="Answer" required/>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-success" onClick={loginClick} type="submit">Submit</button>
                        </div>                  
                    </form>
                </div>
            </div>
        </div>
        </div>
    )
}


