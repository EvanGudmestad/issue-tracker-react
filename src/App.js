import LoginForm from "./components/LoginForm";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import {BugList} from './components/BugList';
import { useState,useEffect } from "react";
import { useNavigate, Route,Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';


function App() {

  const [auth,setAuth] = useState(null);
  const navigate = useNavigate();

  function onLogin(auth){
    setAuth(auth);
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
          </Routes>
        </main>
       <Footer />
      </div>
    </div>
  );
}

export default App;
