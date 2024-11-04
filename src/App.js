import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Compo/Homes/Home";
import UserLogin from "./Compo/UserLoginPage/UserLogin";
import PaidUser from "./Compo/PaidUser/PaidUser";
import AdminPanel from "./Compo/AdminPanel/AdminPanel";
import AdminPanelMernStack from "./Compo/AdminPanelMernStack/AdminPanelMernStack";
import Documentation from "./Compo/SolDocs/SolDocs";
import TradingSignalAdmin from "./Compo/TradingSignalAdmin/TradingSignalAdmin";
import UserChat from "./Compo/UserChat/UserChat";
import Blockchain from "./Compo/Blockchain/Blockchain";
import FrontEndSignal from "./Compo/FrontEndSignalTrading/FrontEndTradingSignal";
import SignUp from "./Compo/SignUpPage/SignUp";
import { ChakraProvider } from "@chakra-ui/react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FrontMern from "./Compo/FrontMern/FrontMern";
import React, { Suspense } from "react";
import Web3 from "./Compo/webs3/any";
const muiTheme = createTheme({
  typography: {
    body1: {
      fontSize: "1rem",
    },
  },
});
const theme = {};
const LazySignup = React.lazy(() => import("./Compo/SignUpPage/SignUp"));
const Userchatlazy = React.lazy(() => import("./Compo/UserChat/UserChat"));
function App() {
  return (
    <ChakraProvider theme={theme}>
      <ThemeProvider theme={muiTheme}>
        <Router>
          <Suspense fallback={<div>Loading....</div>}>
            <Routes>
              <Route path="*" element={<Home />} />
              <Route path="/paiduser" element={<PaidUser />} />
              <Route path="/userlogin" element={<UserLogin />} />
              <Route path="/AdminPanel" element={<AdminPanel />} />
              <Route
                path="/AdminPanelMernStack"
                element={<AdminPanelMernStack />}
              />
              <Route path="/Documentation" element={<Documentation />} />
              <Route
                path="/TradingSignalAdmin"
                element={<TradingSignalAdmin />}
              />
              <Route path="/FrontEndTrading" element={<FrontEndSignal />} />
              <Route path="/Blockchain" element={<Blockchain />} />
              <Route path="/SignUpUser" element={<LazySignup />} />
              <Route path="/UserChat" element={Userchatlazy} />
              <Route path="/FrontMern" element={<FrontMern />} />
              <Route path="/Web3dealing" element={<Web3 />} />
            </Routes>
          </Suspense>
        </Router>
      </ThemeProvider>
    </ChakraProvider>
  );
}
export default App;
