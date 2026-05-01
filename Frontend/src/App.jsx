import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import { PrivateRoute } from "./components/PrivateRoute";

import Header from "./components/structural/header/Header";
import Main from "./components/structural/main/Main";
import Footer from "./components/structural/footer/Footer";

import Inicio from "./pages/inicio/Inicio";
import Mujer from "./pages/mujer/Mujer";
import Hombre from "./pages/hombre/Hombre";
import Registro from "./pages/registro/Registro";
import Login from "./pages/login/Login";
import WelcomeClient from "./pages/welcome/WelcomeClient";
import Panel from "./pages/panel/Panel";

function HomeRedirect() {
  const { user } = useContext(AuthContext);
  if (!user) return <Inicio />;
  return <WelcomeClient />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="structural">
          <Header />
          <Main>
            <Routes>
              <Route path="/" element={<HomeRedirect />} />
              <Route path="/mujer" element={<Mujer />} />
              <Route path="/hombre" element={<Hombre />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/iniciar" element={<Login />} />
              <Route
                path="/welcome"
                element={
                  <PrivateRoute roles={["CLIENTE", "ADMINISTRADOR"]}>
                    <WelcomeClient />
                  </PrivateRoute>
                }
              />
              <Route
                path="/panel"
                element={
                  <PrivateRoute roles={["ADMINISTRADOR"]}>
                    <Panel />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;