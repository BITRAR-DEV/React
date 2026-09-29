import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useParams, Navigate } from "react-router-dom";
import { Moon, Sun } from "lucide-react";

const api = import.meta.env.VITE_API_URL;

export default function Perfil() {
  const { nick } = useParams();

  const auth = useContext(AuthContext);

  const [temaEscuro, setTemaEscuro] = useState(false);

  type Usuario = {
    id: number;
    nome: string;
    nick: string;
  };

  const [dados, setDados] = useState<Usuario | null>(null);

  async function buscarPerfil() {
    try {
      const resposta = await fetch(`${api}/usuarios/${nick}`);

      const resultado = await resposta.json();

      setDados(resultado);
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
      className={`flex justify-center items-center flex-col px-6 py-8 transition-colors duration-300 ${
        temaEscuro
          ? "bg-[#17131f] text-white"
          : "bg-blue-100 text-violet-950"
      }`}
    >
      <div className="self-end">
        <button
          onClick={mudarTema}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 font-semibold transition ${
            temaEscuro
              ? "bg-yellow-400 text-black hover:bg-yellow-300"
              : "bg-violet-950 text-white hover:bg-[#240658]"
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
      <div className={`flex flex-col justify-center items-center mt-8 w-[70vw] rounded-2xl overflow-hidden ${temaEscuro? "bg-violet-950" : "bg-cyan-100"}`}>
        <div className={`shadow-[0_0_10px] shadow-gray-400`}>
          <img src="https://placehold.co/1024x150" alt="" />
        </div>
        <div className="flex w-full px-12 mb-4">
          <div className="-mt-15 justify-self-start">
            <img src="https://placehold.co/150x150" alt="" className={`rounded-[50%] border-8 ${temaEscuro? "border-violet-950" : "border-blue-200"}`}/>
          </div>
          <div className="flex flex-col ml-4 mt-4">
            <h1 className="text-[22px]">{dados?.nome}</h1>
            <h2 className="text-[16px]">@{dados?.nick}</h2>
            <p>Adicionar Informações</p>
          </div>
        </div>
        <div className="">

        </div>
      </div>
    </div>
  );
}