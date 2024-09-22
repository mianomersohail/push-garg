import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Compo/Homes/Home';
import UserLogin from './Compo/UserLoginPage/UserLogin';
import PaidUser from './Compo/PaidUser/PaidUser';
import AdminPanel from './Compo/AdminPanel/AdminPanel'
import AdminPanelMernStack from './Compo/AdminPanelMernStack/AdminPanelMernStack';
import Documentation from './Compo/SolDocs/SolDocs';
import UserDealing from './Compo/UserDealing/UserDealing';
import TradingSignalAdmin from './Compo/TradingSignalAdmin/TradingSignalAdmin';

function App() {

  return (
    <>
   <Router >       
          <Routes>
            
          <Route path="*" element={<Home/>} />
          <Route path="/paiduser" element={<PaidUser />} />
          <Route path="/userlogin" element={<UserLogin/>} />
          <Route path="/AdminPanel" element={<AdminPanel/>} />
          <Route path="/AdminPanelMernStack" element={<AdminPanelMernStack/>}/>
          <Route path="/Documentation" element={<Documentation/>} />
          <Route path="/UserDealing" element={<UserDealing/>} />
          <Route path="/TradingSignalAdmin" element={<TradingSignalAdmin/>} />


          </Routes>
        </Router>   
    
    </>
  );
}

export default App;
