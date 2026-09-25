import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useParams } from "react-router-dom";
import { Moon, Sun } from "lucide-react";

const api = import.meta.env.VITE_API_URL;

export default function Perfil() {
  const { nick } = useParams();

  const auth = useContext(AuthContext);

  const [temaEscuro, setTemaEscuro] = useState(false);

  async function buscarPerfil() {
    try {
      const resposta = await fetch(`${api}/usuarios/${nick}`);

      const dados = await resposta.json();

      console.log(dados);
    } catch (error) {
      console.log(error);
    }
  }

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

  useEffect(() => {
    buscarPerfil();
  }, [nick]);

  return (
    <div
      className={`min-h-screen px-6 py-8 transition-colors duration-300 ${
        temaEscuro
          ? "bg-[#17131f] text-white"
          : "bg-blue-100 text-violet-950"
      }`}
    >
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

      <div className="mt-8">
      </div>
    </div>
  );
}