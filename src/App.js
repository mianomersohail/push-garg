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
import UserChat from './Compo/UserChat/UserChat';
import Blockchain from './Compo/Blockchain/Blockchain';
import TradingFrontEnd from './Compo/FrontEndSignalTrading/FrontEndTradingSignal'
import FrontEndSignal from './Compo/FrontEndSignalTrading/FrontEndTradingSignal';
import { ChakraProvider } from '@chakra-ui/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Define the MUI theme
const muiTheme = createTheme({
  typography: {
    body1: {
      fontSize: '1rem', // Define your desired font size
      // Other body1 properties if needed
    },
  },
});
const theme = {
  // Your Chakra theme customization (if any)
};
function App() {
  return (
    <>
    <ChakraProvider theme={theme}>
    <ThemeProvider theme={muiTheme}>
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
          <Route path="/UserChat" element={<UserChat/>} />
          <Route path="/FrontEndTrading" element={<FrontEndSignal/>} />
          <Route path='/Blockchain' element={<Blockchain/>} />

          </Routes>
        </Router>  
      </ThemeProvider> 
        
        </ChakraProvider>

     
        </>
    

  );
}

export default App;
