import LoginForm from "./components/LoginForm";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import {BugList} from './components/BugList';
import { useState,useEffect } from "react";
import { useNavigate, Route,Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import { RegisterForm } from "./components/RegisterForm";
import jwt_decode from 'jwt-decode';
import { BugEditor } from "./components/BugEditor";
import { UserList } from "./components/UserList";
import { UserEditor } from "./components/UserEditor";
import { NotFound } from "./components/NotFound";


function App() {

  const [auth,setAuth] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('use effect running in app js')
    if(localStorage){
      const storedAuthToken = localStorage.getItem('authToken');
      if(storedAuthToken){
        const authPayload = jwt_decode(storedAuthToken);
        //console.log(authPayload);
        if(authPayload){
          const auth = {
            token:storedAuthToken,
            payload:authPayload,
            email: authPayload.email,
            userId: authPayload._id
          };
         console.log(`Auth token in use effect in app js: ${auth.token}`);
          setAuth(auth);
        }
      }
    }
  }, [])

  function onLogin(auth){
    setAuth(auth);

    if(localStorage){
      localStorage.setItem('authToken', auth.token)
    }

    navigate('/bug/list');
  }

  function onLogout(){
    setAuth(null);
  }

  function showError(message) {
    toast(message, { type: 'error', position: 'bottom-right' });
  }
  function showSuccess(message) {
    toast(message, { type: 'success', position: 'bottom-right' });
  }

  return (
    <div className="container">
      <div className="App d-flex flex-column min-vh-100">
        <ToastContainer />
        <Navbar auth={auth} onLogout={onLogout} showSuccess={showSuccess} />
        <main className="flex-grow-1">
          <Routes>
            <Route path='/' element={<LoginForm onLogin={onLogin} showError={showError} showSuccess={showSuccess} />} />
            <Route path="/bug/list" element={<BugList auth={auth} />} />
            <Route path='/user/register' element={<RegisterForm showSuccess={showSuccess} onLogin={onLogin} showError={showError} />} />
            <Route path='/bug/:bugId' element={<BugEditor auth={auth} showSuccess={showSuccess} showError={showError} />} />
            <Route path='/user/list' element={<UserList auth={auth} showError={showError} />} />
            <Route path='/user/:userId' element={<UserEditor auth={auth} showError={showError} showSuccess={showSuccess} />}  />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
       <Footer />
      </div>
    </div>
  );
}

export default App;
