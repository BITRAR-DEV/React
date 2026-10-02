import { Routes, Route } from "react-router-dom";
import Inicio from "../pages/inicio";
import Jogos from "../pages/jogos";
import Sobre from "../pages/sobre";
import Login from "../pages/login";
import Cadastro from "../pages/cadastro";
import Perfil from "../pages/perfil";
import MeuPerfil from "../pages/meuperfil";
import EditarCadastro from "../pages/editarCadastro";
import JogosUser from "../pages/jogosUser";

export default function Outlet() {
    return (
        <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/jogos" element={<Jogos />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/perfil/:nick" element={<Perfil />} />
            <Route path="/perfil" element={<MeuPerfil />} />
            <Route path="/editar-cadastro" element={<EditarCadastro />}/>
            <Route path="/perfil/:nick/jogos" element={<JogosUser />}/>
        </Routes>
    );
}