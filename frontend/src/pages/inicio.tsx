import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Gamepad2, Moon, Sun } from "lucide-react";
import Logo from "../assets/Logo.png";
import { AuthContext } from "../contexts/AuthContext";

export default function Inicio() {
  const auth = useContext(AuthContext);

  const [temaEscuro, setTemaEscuro] = useState(false);

  useEffect(() => {
    const temaSalvo = localStorage.getItem("tema-jogos");

    if (temaSalvo === "escuro") {
      setTemaEscuro(true);
    }
  }, []);

  function mudarTema() {
    const novoTema = !temaEscuro;

    setTemaEscuro(novoTema);

    localStorage.setItem(
      "tema-jogos",
      novoTema ? "escuro" : "claro"
    );
  }

  return (
    <div
      className={`min-h-screen px-6 py-8 transition-colors duration-300 ${
        temaEscuro
          ? "bg-[#17131f] text-white"
          : "bg-blue-100 text-violet-950"
      }`}
    >
      {/* BOTÃO DE TEMA */}
      <div className="flex justify-end">
        <button
          onClick={mudarTema}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 font-semibold transition ${
            temaEscuro
              ? "bg-yellow-400 text-black hover:bg-yellow-300"
              : "bg-violet-700 text-white hover:bg-violet-800"
          }`}
        >
          {temaEscuro ? (
            <>
              <Sun size={20} />
              Tema claro
            </>
          ) : (
            <>
              <Moon size={20} />
              Tema escuro
            </>
          )}
        </button>
      </div>

      <div className="md:grid md:grid-cols-2">
        <div className="flex flex-col justify-center gap-6 p-8 md:pl-50">
          <div className="font-[650] md:leading-12">
            <h2 className="select-none text-[40px] md:text-[60px]">
              Bem-Vindo à
            </h2>

            <h1 className="text-7xl text-violet-900 text-shadow-[0_0_3px_rgb(112_7_231)] select-none">
              Game Stream!
            </h1>
          </div>

          <div className="text-[18px]">
            <p className="md:leading-6.5">
              Olá {auth?.usuario?.nome}! Aqui você encontra vários
              jogos grátis para jogar e se divertir com a melhor
              experiência de jogos da web.
            </p>

            <p className="mt-2">
              Entre abaixo em nosso catálogo e explore nossos jogos.
            </p>
          </div>

          <div className="flex flex-row">
            <Link
              className="flex cursor-pointer gap-2 rounded-[13px] bg-violet-800 px-4 py-3 text-white hover:bg-violet-900"
              to="/jogos"
            >
              <Gamepad2 size={24} />
              Explorar Catálogo
            </Link>
          </div>
        </div>

        <div className="hidden justify-center md:flex">
          <img
            className="h-full w-1/2"
            src={Logo}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}