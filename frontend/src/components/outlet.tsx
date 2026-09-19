import { Routes, Route } from "react-router-dom";
import Inicio from "../pages/inicio";
import Jogos from "../pages/jogos";
import Sobre from "../pages/sobre";
import Login from "../pages/login";
import Cadastro from "../pages/cadastro";
function Outlet() {
    return (
        <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/jogos" element={<Jogos />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
    );
}

export default Outlet;
