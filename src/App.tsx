import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Subscribe from "./pages/Subscribe";
import AboutsUs from "./pages/AboutsUs";
import Main from "./pages/Main";
import Connexion from "./pages/Connexion";
import AdminUser from "./pages/AdminUser";
import Page404 from "./pages/Page404";
import Messagerie from "./pages/Messagerie";
import Services from "./pages/Services";
import Navbar from "./components/Navbar";
import KnowMore from "./pages/KnowMore";
import CreateService from "./pages/CreateService";
import FinaliseService from "./pages/FinaliseService";

function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Navbar />
        </div>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/aboutus" element={<AboutsUs />} />
          <Route path="/main" element={<Main />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/adminUser" element={<AdminUser />} />
          <Route path="/*" element={<Page404 />} />
          {/* <Route path="/messagerie" element={<Messagerie />} /> */}
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<KnowMore />} />
          <Route path="/CreateService" element={<CreateService />} />
          <Route path="/FinaliseService/:id" element={<FinaliseService />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
