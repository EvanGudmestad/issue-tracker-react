import { useState } from "react";

function LoginForm(){

    const [email, setEmail] = useState("");
    const [currentPassword,setCurrentPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    function onLogin(evt){
        evt.preventDefault();
        setError("");
        setSuccess("");
        if(email === 'admin@example.com' && currentPassword==='password'){
            setSuccess('Welcome!');
        }else{
            setError('Invalid username or password');
        }
    }

    return(
        <form>
            <div className="row mb-2">
                <div className="col-md-4">
                    <label htmlFor="txtLogin" className="form-label">Email Address: </label>
                    <input type='email' id='txtLogin' className="form-control" placeholder="Enter Email Address" autoComplete="email" onChange={(evt) => setEmail(evt.currentTarget.value)} />
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-md-4">
                    <label htmlFor="txtPassword" className="form-label">Password: </label>
                    <input type='password' id='txtPassword' className="form-control" autoComplete="current-password" onChange={(evt) => setCurrentPassword(evt.target.value)} />
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-md-4">
                    <button type='submit' id='btnSubmit' className="btn btn-primary" onClick={(evt) => onLogin(evt)}>Login</button>
                </div>
            </div>
            <div className="row">
                <span className="text-danger">{error}</span>
                <span className="text-success">{success}</span>
            </div>
            
            
        </form>
    )
}

export default LoginForm;