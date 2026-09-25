import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Moon,
  Sun,
} from "lucide-react";
import { AuthContext } from "../contexts/AuthContext";

const api = import.meta.env.VITE_API_URL;

export default function Login() {
  const navigate = useNavigate();

  const [mostrar, setMostrar] = useState(false);

  const [form, setForm] = useState({
    loginID: "",
    senha: "",
  });

  const [loginErro, setLoginErro] = useState("");

  const [temaEscuro, setTemaEscuro] = useState(false);

  const auth = useContext(AuthContext);

  // Recupera o tema salvo
  useEffect(() => {
    const temaSalvo = localStorage.getItem("tema-jogos");

    if (temaSalvo === "escuro") {
      setTemaEscuro(true);
    }
  }, []);

  // Troca o tema
  function mudarTema() {
    const novoTema = !temaEscuro;

    setTemaEscuro(novoTema);

    localStorage.setItem(
      "tema-jogos",
      novoTema ? "escuro" : "claro"
    );
  }

  async function logar(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoginErro("");

    try {
      const resposta = await fetch(`${api}/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          loginID: form.loginID,
          senha: form.senha,
        }),
      });

      const login = await resposta.json();

      if (!resposta.ok) {
        throw new Error(login.erro);
      }

      auth?.setUsuario(login.usuario);

      setForm({
        loginID: "",
        senha: "",
      });

      navigate("/perfil");
    } catch (error) {
      const mensagem =
        error instanceof Error
          ? error.message
          : "Erro inesperado!";

      setLoginErro(mensagem);
    }
  }

  return (
    <div
      className={`min-h-screen px-6 py-8 transition-colors duration-300 ${
        temaEscuro
          ? "bg-[#17131f] text-white"
          : "bg-white text-violet-950"
      }`}
    >
      {/* BOTÃO DE TEMA */}
      <div className="mb-6 flex justify-end">
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

      {/* LOGIN */}
      <div className="flex items-center justify-center">
        <div
          className={`h-full rounded-[15px] border p-6 shadow-[0_1px_5px] transition-colors md:w-120 ${
            temaEscuro
              ? "border-violet-800 bg-[#211b2b] shadow-black"
              : "border-zinc-950 bg-blue-50 shadow-zinc-950"
          }`}
        >
          <div className="mb-6 flex flex-col items-center justify-center">
            <h2
              className={`mb-1 text-3xl font-bold ${
                temaEscuro
                  ? "text-violet-300"
                  : "text-violet-950"
              }`}
            >
              Bem Vindo!
            </h2>

            <p className="text-center text-lg">
              <strong>Logue</strong> ou{" "}
              <strong>Cadastre-se</strong> para ter acesso ao
              resto dos conteúdos
            </p>
          </div>

          <div className="flex flex-col gap-2 px-6">
            <form
              onSubmit={logar}
              className="flex flex-col gap-2"
            >
              {/* EMAIL / NICK */}
              <input
                type="text"
                className={`rounded-lg border-2 p-2 outline-none focus:ring-2 focus:ring-violet-500 ${
                  temaEscuro
                    ? "border-violet-700 bg-[#17131f] text-white placeholder:text-gray-400"
                    : "border-violet-950 bg-white"
                }`}
                placeholder="Digite seu Email ou Nick:"
                value={form.loginID}
                onChange={(e) =>
                  setForm({
                    ...form,
                    loginID: e.target.value,
                  })
                }
              />

              {/* SENHA */}
              <div>
                <div className="relative">
                  <input
                    type={mostrar ? "text" : "password"}
                    className={`w-full rounded-lg border-2 p-2 outline-none focus:ring-2 focus:ring-violet-500 ${
                      temaEscuro
                        ? "border-violet-700 bg-[#17131f] text-white placeholder:text-gray-400"
                        : "border-violet-950 bg-white"
                    }`}
                    placeholder="Digite sua Senha:"
                    value={form.senha}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        senha: e.target.value,
                      })
                    }
                  />

                  <button
                    type="button"
                    onClick={() => setMostrar(!mostrar)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {mostrar ? (
                      <Eye
                        color={
                          temaEscuro ? "#c4b5fd" : "#2f0d68"
                        }
                      />
                    ) : (
                      <EyeOff
                        color={
                          temaEscuro ? "#c4b5fd" : "#2f0d68"
                        }
                      />
                    )}
                  </button>
                </div>

                {loginErro && (
                  <p className="pl-2 text-red-500">
                    {loginErro}
                  </p>
                )}
              </div>

              {/* BOTÃO LOGIN */}
              <button
                type="submit"
                className="mt-2 cursor-pointer rounded-[13px] bg-violet-800 px-4 py-3 text-white hover:bg-violet-900"
              >
                <strong>Login</strong>
              </button>
            </form>

            {/* DIVISOR */}
            <div
              className={`flex select-none items-center ${
                temaEscuro
                  ? "text-gray-400"
                  : "text-gray-500"
              }`}
            >
              <hr className="flex-1" />

              <p className="mx-1.5 mb-0.5">
                Não tem um cadastro?
              </p>

              <hr className="flex-1" />
            </div>

            {/* CADASTRO */}
            <NavLink
              to="/cadastro"
              className="w-fit font-bold text-violet-500 hover:underline"
            >
              Cadastre-se aqui
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}