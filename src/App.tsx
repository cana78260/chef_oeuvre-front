import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import { AuthContext } from "./Context.ts/Auth-context";
import { useContext } from "react";
import { UserContext } from "./Context.ts/User-context";
import ModifyService from "./pages/ModifyService";
import DeleteService from "./pages/DeleteService";

function App() {
  const { savedToken } = useContext(AuthContext);
  const { validTimeToken } = useContext(AuthContext);
  const { userCo } = useContext(UserContext);
  const { tokenFunction } = useContext(AuthContext);
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
          <Route
            path="/main"
            element={
              savedToken !== null ? <Main /> : <Navigate to="/connexion" />
            }
          />
          <Route path="/connexion" element={<Connexion />} />
          <Route
            path="/modifyService/:id"
            element={
              savedToken !== null ? (
                <ModifyService />
              ) : (
                <Navigate to="/connexion" />
              )
            }
          />
          <Route
            path="/deleteService/:id"
            element={
              savedToken !== null ? (
                <DeleteService />
              ) : (
                <Navigate to="/connexion" />
              )
            }
          />
          <Route
            path="/adminUser"
            element={
              savedToken !== null ? <AdminUser /> : <Navigate to="/connexion" />
            }
          />
          <Route path="/*" element={<Page404 />} />
          {/* <Route path="/messagerie" element={<Messagerie />} /> */}
          <Route path="/services" element={<Services />} />
          <Route
            path="/services/:id"
            element={
              savedToken !== null ? <KnowMore /> : <Navigate to="/connexion" />
            }
          />
          <Route
            path="/createService"
            element={
              savedToken !== null ? (
                <CreateService />
              ) : (
                <Navigate to="/connexion" />
              )
            }
          />
          <Route
            path="/finaliseService/:id"
            element={
              savedToken !== null ? (
                <FinaliseService />
              ) : (
                <Navigate to="/connexion" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
