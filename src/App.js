import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Compo/Homes/Home';
import UserLogin from './Compo/UserLoginPage/UserLogin';
import PaidUser from './Compo/PaidUser/PaidUser';
import { useState } from 'react';

function App() {
  const [NavData,setNavData]=useState()
  const UserLoginReceive=()=>{
    setNavData('Logout')

    }
  return (
    <>
   <Router>       
          <Routes>
            
          <Route path="*" element={<Home/>} />
          <Route path="about" element={''} />
          <Route path="/paiduser" element={<PaidUser />} />
          <Route path="/userlogin" element={<UserLogin/>} />
          </Routes>
        </Router>   
    
    </>
  );
}

export default App;