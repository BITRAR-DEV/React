import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Gamepad2, Menu, LogOut, Pencil, Sun, Moon } from "lucide-react";
import { AuthContext } from "../contexts/AuthContext";
import { useTema } from "../contexts/ThemeContext";

const api = import.meta.env.VITE_API_URL;

export default function Navbar() {
  const auth = useContext(AuthContext);
  const tema = useTema();
  const navigate = useNavigate();

  const [aberto, setAberto] = useState(false);

  const estiloLink = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "underline p-[8px_6px] bg-[#3f1780] rounded-xl"
      : "p-[8px_6px] hover:bg-[#3f1780] rounded-xl";

  async function sair() {
    try {
      const resposta = await fetch(`${api}/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!resposta.ok) {
        throw new Error("Erro ao sair da conta");
      }

      auth?.setUsuario(null);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <nav className="flex w-full items-center justify-between bg-violet-950 p-4 text-[18px] font-medium text-white shadow-[0_0_10px] shadow-gray-800">
      {/* Logo */}
      <div className="flex gap-2">
        <Link to="/" className="flex cursor-pointer gap-2 text-3xl select-none">
          Game Stream
          <Gamepad2 size={42} />
        </Link>
      </div>

      {/* Menu mobile */}
      <div className="flex md:hidden">
        <button onClick={() => setAberto(!aberto)}>
          <Menu size={36} />
        </button>

        <div
          className={`fixed top-15 -right-px flex flex-col items-center gap-4 overflow-hidden rounded-bl-xl bg-violet-950 transition-all duration-500 ease-in-out md:hidden ${
            aberto ? "max-h-60 p-5 opacity-100" : "max-h-0 p-0 opacity-0"
          }`}
        >
          <NavLink className={estiloLink} end to="/">
            Inicio
          </NavLink>

          <NavLink className={estiloLink} to="/jogos">
            Jogos
          </NavLink>

          {auth?.usuario ? (
            <NavLink className={estiloLink} to={`/perfil/${auth.usuario.nick}`}>
              Perfil
            </NavLink>
          ) : (
            <NavLink className={estiloLink} to="/login">
              Login
            </NavLink>
          )}
        </div>
      </div>

      {/* Menu desktop */}
      <div className="hidden items-center gap-6 md:flex">
        <NavLink className={estiloLink} end to="/">
          Inicio
        </NavLink>

        <p className="p-[8px_0] select-none">|</p>

        <NavLink className={estiloLink} to="/jogos">
          Jogos
        </NavLink>

        <p className="p-[8px_0] select-none">|</p>

        {auth?.usuario ? (
          <div className="group relative">
            <NavLink className={estiloLink} to={`/perfil/${auth.usuario.nick}`}>
              Perfil
            </NavLink>

            <div className="absolute top-full -right-4 hidden pt-2 group-hover:block">
              <div className="w-52 rounded-xl bg-violet-950 p-2 shadow-xl">
                <Link
                  to="/editar-cadastro"
                  className="flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-white hover:bg-[#3f1780]"
                >
                  Editar cadastro
                  <Pencil size={24} />
                </Link>

                <Link
                  to={`/perfil/${auth.usuario.nick}/jogos`}
                  className="flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-white transition hover:bg-[#3f1780]"
                >
                  Meus jogos
                  <Gamepad2 />
                </Link>

                <button
                  onClick={sair}
                  className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-red-300 transition hover:bg-red-900"
                >
                  Sair da conta
                  <LogOut />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <NavLink className={estiloLink} to="/login">
            Login
          </NavLink>
        )}

        {/* BOTÃO DE TEMA */}
        <button
          onClick={tema?.mudarTema}
          className={`flex items-center gap-2 rounded-xl px-2 py-2 font-semibold transition ${
            tema?.temaEscuro
              ? "bg-yellow-400 text-black hover:bg-yellow-300"
              : "bg-violet-950 text-white hover:bg-[#240658]"
          }`}
        >
          {tema?.temaEscuro ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </nav>
  );
}
