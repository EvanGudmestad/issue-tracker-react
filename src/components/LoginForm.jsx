import {useState} from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import _ from 'lodash';
import { Link } from 'react-router-dom';


function LoginForm({onLogin, showSuccess, showError}) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [error, setError] = useState("");
  //const [success, setSuccess] = useState("");

  const emailError = !email ? 'Email can not be left blank' : 
  !email.includes('@') ? 'Email must include @ sign' : '';

  const passwordError = !password ? 'Password can not be left blank' : 
  password.length < 8 ? 'Password must be at least 8 characters' : '';

  async function onSubmitLogin(evt){
    //console.log(`email is ${email} and password is ${password}`);
    try{
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/login`,
      {
        email,
        password
      });
      const authPayload = jwt_decode(res.data.authToken);

     console.log(authPayload);
     const auth = {
      email:email,
      token: res.data.authToken,
      payload: authPayload
     }

     //console.table(auth.payload);
     //console.log(auth.payload.permissions.canAddComments);

     showSuccess(`Welcome ${auth.email}`);

     onLogin(auth);

     // setError("");
     // setSuccess(res.data.message);
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

      //console.log(resError);
    }
  }

  return(
    <section className="vh-100">
  <div className="container-fluid h-custom">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-9 col-lg-6 col-xl-5">
        <img src={process.env.PUBLIC_URL + '/logoBug.png'}
          className="img-fluid" alt="Sample"/>
      </div>
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form>
          <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
            <p className="lead fw-normal mb-3 me-3">Welcome back!</p>
            {/* <button type="button" className="btn btn-primary btn-floating mx-1">
              <i className="fab fa-facebook-f"></i>
            </button>

            <button type="button" className="btn btn-primary btn-floating mx-1">
              <i className="fab fa-twitter"></i>
            </button>

            <button type="button" className="btn btn-primary btn-floating mx-1">
              <i className="fab fa-linkedin-in"></i>
            </button> */}
          </div>

          {/* <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">Or</p>
          </div> */}

          {/* Email input */}
          <div className="form-outline mb-4">
            <input type="email" id="emailInput" className="form-control form-control-lg"
              placeholder="Enter a valid email address" autoComplete="email" onChange={(e) => setEmail(e.currentTarget.value)} value={email}/>
            <label className="form-label" htmlFor="emailInput">Email address</label>
          </div>

          {/* Password input */}
          <div className="form-outline mb-3">
            <input type="password" id="passwordInput" className="form-control form-control-lg"
              placeholder="Enter password" autoComplete="current-password" onChange={(e) => setPassword(e.currentTarget.value)} value={password}/>
            <label className="form-label" htmlFor="passwordInput">Password</label>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            {/* Checkbox */}
            <div className="form-check mb-0">
              <input className="form-check-input me-2" type="checkbox" value="" id="formCheckbox" />
              <label className="form-check-label" htmlFor="formCheckbox">
                Remember me
              </label>
            </div>
          </div>

          <div className="text-center text-lg-start mt-4 pt-2 mb-3">
            <button type="button" className="btn btn-primary btn-lg" id='btnLogin' onClick={(evt) => {onSubmitLogin()}}>Login</button>
            <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? 
            <Link to="/user/register" className="link-danger ms-3">Register</Link></p>
          </div>
          {emailError && <p className='text-danger'>{emailError}</p>}
          {passwordError && <p className='text-danger'>{passwordError}</p>}
        </form>
      </div>
    </div>
  </div>
 
</section>
  )
}

export default LoginForm;