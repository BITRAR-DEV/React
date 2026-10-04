import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { use, useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useTema } from "../contexts/ThemeContext";

const api = import.meta.env.VITE_API_URL;

export default function Cadastro() {
  useEffect(() => {
    document.title = "Editar Cadastro | Game Stream";
  }, []);

  const auth = useContext(AuthContext);
  const tema = useTema();

  const navigate = useNavigate();

  const [editar, setEditar] = useState({});

  /* if (auth?.carregando) {
    return <p>Carregando...</p>;
  }

  if (auth?.usuario) {
    return <Navigate to={`/perfil/${auth.usuario.nick}`} replace />;
  } */

  return (
    <div
      className={`min-h-screen px-6 py-8 transition-colors duration-300 ${
        tema?.temaEscuro
          ? "bg-[#17131f] text-white"
          : "bg-blue-100 text-violet-950"
      }`}
    >
      {/* CADASTRO */}
      <div className="flex items-center justify-center">
        <div
          className={`h-full rounded-[15px] border p-6 shadow-[0_1px_5px] shadow-zinc-950 transition-colors md:w-200 ${
            tema?.temaEscuro
              ? "border-violet-800 bg-[#211b2b]"
              : "border-zinc-950 bg-blue-50"
          }`}
        >
          <div className="justify- mb-6 flex flex-col items-center">
            <h2
              className={`mb-1 text-3xl font-bold ${
                tema?.temaEscuro ? "text-violet-300" : "text-violet-950"
              }`}
            >
              Editar Cadastro
            </h2>
          </div>

          <div className="px-10 font-semibold">
            <div>
              <h2
                className={`text-xl font-bold ${
                  tema?.temaEscuro ? "text-violet-300" : "text-violet-950"
                }`}
              >
                Informações Pessoais
              </h2>
              <div className="flex flex-col gap-4 py-4">
                <div className="flex items-center justify-between">
                  <p className="">Nome Real</p>
                  <div className="flex items-center gap-4">
                    <p>{auth?.usuario?.nome}</p>
                    <button className="cursor-pointer rounded-lg bg-violet-900 px-6 py-2 text-white hover:bg-violet-950">
                      Editar
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="">Nome de Usuário</p>
                  <div className="flex items-center gap-4">
                    <p>{auth?.usuario?.nick}</p>
                    <button className="cursor-pointer rounded-lg bg-violet-900 px-6 py-2 text-white hover:bg-violet-950">
                      Editar
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="">Email</p>
                  <div className="flex items-center gap-4">
                    <p>{auth?.usuario?.email}</p>
                    <button className="cursor-pointer rounded-lg bg-violet-900 px-6 py-2 text-white hover:bg-violet-950">
                      Editar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2
                className={`pt-4 text-xl font-bold ${
                  tema?.temaEscuro ? "text-violet-300" : "text-violet-950"
                }`}
              >
                Segurança
              </h2>
              <div className="flex items-center justify-between py-4">
                <p className="">Senha</p>
                <button className="cursor-pointer rounded-lg bg-violet-900 px-6 py-2 text-white hover:bg-violet-950">
                  Editar
                </button>
              </div>
            </div>
          </div>
          <dialog
            open
            className={`fixed inset-0 m-auto overflow-hidden transition-colors duration-300 rounded-2xl border-2 border-violet-900 shadow-[0_1px_5px] shadow-zinc-950 ${
              tema?.temaEscuro
                ? "border-violet-800 bg-[#211b2b]"
                : "border-zinc-950 bg-blue-50"
            }`}
          >
            <div
              className={`flex flex-col items-center justify-center gap-4 px-6 py-8 ${
                tema?.temaEscuro
                  ? "bg-[#211b2b] text-white"
                  : "bg-white text-violet-950"
              }`}
            >
              <h2
                className={`text-xl font-bold ${
                  tema?.temaEscuro ? "text-violet-300" : "text-violet-950"
                }`}
              >
                Editar
              </h2>
              <input type="text" className={`rounded-lg border-2 p-2 outline-none focus:ring-2 focus:ring-violet-500 ${
                  tema?.temaEscuro
                    ? "border-violet-700 bg-[#17131f] text-white placeholder:text-gray-400"
                    : "border-violet-950 bg-white text-violet-950"
                }`}
                placeholder=""/>
              <input type="text" className={`rounded-lg border-2 p-2 outline-none focus:ring-2 focus:ring-violet-500 ${
                  tema?.temaEscuro
                    ? "border-violet-700 bg-[#17131f] text-white placeholder:text-gray-400"
                    : "border-violet-950 bg-white text-violet-950"
                }`}
                placeholder="Digite sua senha:"/>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
}
