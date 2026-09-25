import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Eye, EyeOff, Moon, Sun } from "lucide-react";

const api = import.meta.env.VITE_API_URL;

export default function Cadastro() {
  const [mostrar, setMostrar] = useState(false);

  const [temaEscuro, setTemaEscuro] = useState(false);

  const [form, setForm] = useState({
    id: 0,
    name: "",
    email: "",
    senha: "",
    csenha: "",
    nick: "",
  });

  const [senhaerro, setSenhaErro] = useState(false);
  const [emailerro, setEmailErro] = useState("");

  const senhaErroEstilo = senhaerro
    ? "bg-red-100"
    : "";

  const emailErroEstilo = emailerro
    ? "bg-red-100"
    : "";

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

  async function cadastrar(
    e: React.SubmitEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setSenhaErro(false);
    setEmailErro("");

    if (form.senha != form.csenha) {
      setSenhaErro(true);
      return;
    }

    try {
      const resposta = await fetch(`${api}/usuarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: form.name,
          email: form.email,
          senha: form.senha,
          nick: form.nick,
        }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.erro);
      }

      setForm({
        id: 0,
        name: "",
        email: "",
        senha: "",
        csenha: "",
        nick: "",
      });
    } catch (error) {
      const mensagem =
        error instanceof Error
          ? error.message
          : "Erro inesperado!";

      setEmailErro(mensagem);
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

      {/* CADASTRO */}
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
              Para <strong>cadastrar-se</strong>, insira as
              informações abaixo.
            </p>
          </div>

          <div className="flex flex-col gap-2 px-6">
            <form
              onSubmit={cadastrar}
              className="flex flex-col gap-2"
            >
              {/* NOME */}
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                className={`rounded-lg border-2 p-2 outline-none focus:ring-2 focus:ring-violet-500 ${
                  temaEscuro
                    ? "border-violet-700 bg-[#17131f] text-white placeholder:text-gray-400"
                    : "border-violet-950 bg-white"
                }`}
                placeholder="Digite seu Nome Completo:"
              />

              {/* NICK */}
              <input
                type="text"
                required
                value={form.nick}
                onChange={(e) =>
                  setForm({
                    ...form,
                    nick: e.target.value,
                  })
                }
                className={`rounded-lg border-2 p-2 outline-none focus:ring-2 focus:ring-violet-500 ${
                  temaEscuro
                    ? "border-violet-700 bg-[#17131f] text-white placeholder:text-gray-400"
                    : "border-violet-950 bg-white"
                }`}
                placeholder="Digite seu Nick de Usuário:"
              />

              {/* EMAIL */}
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                className={`rounded-lg border-2 p-2 outline-none focus:ring-2 focus:ring-violet-500 ${emailErroEstilo} ${
                  temaEscuro
                    ? "border-violet-700 bg-[#17131f] text-white placeholder:text-gray-400"
                    : "border-violet-950 bg-white"
                }`}
                placeholder="Digite seu Email:"
              />

              {/* SENHA */}
              <div className="relative">
                <input
                  type={mostrar ? "text" : "password"}
                  required
                  minLength={8}
                  value={form.senha}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      senha: e.target.value,
                    })
                  }
                  className={`w-full rounded-lg border-2 p-2 outline-none focus:ring-2 focus:ring-violet-500 ${senhaErroEstilo} ${
                    temaEscuro
                      ? "border-violet-700 bg-[#17131f] text-white placeholder:text-gray-400"
                      : "border-violet-950 bg-white"
                  }`}
                  placeholder="Digite sua Senha:"
                />

                <button
                  type="button"
                  onClick={() => setMostrar(!mostrar)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {mostrar ? (
                    <Eye
                      color={
                        temaEscuro
                          ? "#c4b5fd"
                          : "#2f0d68"
                      }
                    />
                  ) : (
                    <EyeOff
                      color={
                        temaEscuro
                          ? "#c4b5fd"
                          : "#2f0d68"
                      }
                    />
                  )}
                </button>
              </div>

              {/* CONFIRMAR SENHA */}
              <div>
                <input
                  type={mostrar ? "text" : "password"}
                  required
                  value={form.csenha}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      csenha: e.target.value,
                    })
                  }
                  className={`w-full rounded-lg border-2 p-2 outline-none focus:ring-2 focus:ring-violet-500 ${senhaErroEstilo} ${
                    temaEscuro
                      ? "border-violet-700 bg-[#17131f] text-white placeholder:text-gray-400"
                      : "border-violet-950 bg-white"
                  }`}
                  placeholder="Confirme sua Senha:"
                />

                {senhaerro && (
                  <p className="pl-2 text-red-600">
                    As senhas não coincidem!
                  </p>
                )}

                {emailerro && (
                  <p className="pl-2 text-red-600">
                    {emailerro}
                  </p>
                )}
              </div>

              {/* BOTÃO */}
              <button
                type="submit"
                className="mt-2 cursor-pointer rounded-[13px] bg-violet-800 px-4 py-3 text-white hover:bg-violet-900"
              >
                <strong>Cadastrar</strong>
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
                Já tem um cadastro?
              </p>

              <hr className="flex-1" />
            </div>

            {/* LOGIN */}
            <NavLink
              to="/login"
              className="w-fit font-bold text-violet-500 hover:underline"
            >
              Logue aqui!
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}