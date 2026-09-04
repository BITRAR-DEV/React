import Navbar from "./navbar";
import { Routes, Route } from "react-router-dom";
import Inicio from "../pages/inicio";
import Jogos from "../pages/jogos";
import Sobre from "../pages/sobre";

function Header() {
  return (
    <header className="min-h-[78vh] w-[60vw]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/jogos" element={<Jogos />} />
        <Route path="/sobre" element={<Sobre />} />
      </Routes>
    </header>
  );
}

export default Header;
