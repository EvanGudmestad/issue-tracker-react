import { useState } from "react";
import axios from "axios";
import jwt_decode from 'jwt-decode';
import _ from 'lodash';
import {Link} from 'react-router-dom';

export function RegisterForm({showSuccess, onLogin, showError}){

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const passwordConfirmError = password !== confirmPassword ? 'Passwords do not match' : '';
    
    const emailError = !email ? 'Email can not be left blank' : 
  !email.includes('@') ? 'Email must include @ sign' : '';

    const passwordError = !password ? 'Password can not be left blank' : 
  password.length < 8 ? 'Password must be at least 8 characters' : '';

    const registerUser = async (evt) => {
        setError("");
        evt.preventDefault();
        console.log("register clicked");
        if(passwordConfirmError){
            setError(passwordConfirmError);
            return;
        }
        if(emailError){
            setError(emailError);
            return;
        }
        if(passwordError){
            setError(passwordError);
            return;
        }

        if(firstName && lastName && password && email){
            
            try{
            //axios call
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/register`,{
                email:email,
                password:password,
                givenName:firstName,
                familyName:lastName
            });

            const authPayload = jwt_decode(res.data.authToken);

            console.log(authPayload);

            const auth = {
                email:email,
                token: res.data.authToken,
                payload: authPayload
            };

            showSuccess(`Welcome ${firstName}!`);
            onLogin(auth);

        }catch(err){
            const resError = err?.response?.data?.error;
      
            if(resError){
              if(typeof resError==='string'){
                showError(resError);
              }else if(resError.details){
                let joiError = '';
                //joi validation
                _.map(resError.details, (x) => joiError += (x.message + '\n'));
                showError(joiError);
              }
            }
        }


        }


    }

    return(
        <section className="vh-100">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black">
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      {error && <p className="text-danger">{error}</p>}
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                      
                      <form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="text" id="firstNameForm" className="form-control" autoComplete="given-name" onChange={(e) => setFirstName(e.currentTarget.value)} value={firstName}/>
                            <label className="form-label" htmlFor="firstName">Your First Name</label>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="text" id="lastNameForm" className="form-control" autoComplete="family-name" onChange={(e) => setLastName(e.currentTarget.value)} value={lastName}/>
                            <label className="form-label" htmlFor="lastName">Your Last Name</label>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="email" id="emailForm" className="form-control" autoComplete="email" onChange={(e) => setEmail(e.currentTarget.value)} value={email}/>
                            <label className="form-label" htmlFor="emailForm">Your Email</label>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="password" id="passwordForm" className="form-control" autoComplete="new-password" onChange={(e) => setPassword(e.currentTarget.value)} value={password}/>
                            <label className="form-label" htmlFor="passwordForm">Password</label>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="password" id="passwordRepeat" className="form-control" autoComplete="" onChange={(e) => setConfirmPassword(e.currentTarget.value)} value={confirmPassword} />
                            <label className="form-label" htmlFor="passwordRepeat">Repeat your password</label>
                          </div>
                        </div>
                        <div className="form-check d-flex justify-content-center mb-5">
                          <input className="form-check-input me-2" type="checkbox" value="" id="checkBoxToS" />
                          <label className="form-check-label" htmlFor="checkBoxToS">
                            I agree all statements in <a href="#!">Terms of service</a>
                          </label>
                        </div>
                        <div className="d-flex flex-column align-items-center mx-4 mb-3 mb-lg-4">
                          <button type="button" className="btn btn-primary btn-lg" onClick={(evt) => registerUser(evt)}>Register</button>
                          <br />
                          <Link to='/'>Already have an account?</Link>
                        </div>
                      </form>
                      
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img src={process.env.PUBLIC_URL + '/logoBug.png'} className="img-fluid" alt="Sample"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}