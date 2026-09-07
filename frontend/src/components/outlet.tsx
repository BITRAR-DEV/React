import { Routes, Route } from "react-router-dom";
import Inicio from "../pages/inicio";
import Jogos from "../pages/jogos";
import Sobre from "../pages/sobre";
function Outlet() {
    return (
        <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/jogos" element={<Jogos />} />
            <Route path="/sobre" element={<Sobre />} />
        </Routes>
    );
}

export default Outlet;
