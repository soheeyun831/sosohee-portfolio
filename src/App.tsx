import {Routes, Route} from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

import Home from "./pages/Home.tsx";
import Career from "./pages/Career.tsx";
import Portfolio from "./pages/Portfolio.tsx";
import Contact from "./pages/Contact.tsx";
import NotFoundPage from "./pages/Home.tsx";
import MainHeader from "./components/layout/Header.tsx";

const GlobalStyle = createGlobalStyle`
 ${reset}
`;

function App() {
  return (
    <div className="wrapper">
      <GlobalStyle />
      <MainHeader/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/career" element={<Career/>}/>
        <Route path="/portfolio" element={<Portfolio/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
