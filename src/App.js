import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import Nav from './Compo/Nav/Nav';
import Home from './Compo/Homes/Home';

function App() {
  return (
    <>

   <HashRouter>
          <Nav/>       
          <Routes>
          <Route path="*" element={<Home/>} />
          <Route path="about" element={''} />
          <Route path="home" element={''} />
          <Route path="/contact" element={''} />
          </Routes>
        </HashRouter>   
    
    </>
  );
}

export default App;
