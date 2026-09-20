import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const api = import.meta.env.VITE_API_URL;

export default function Cadastro() {
  const [mostrar, setMostrar] = useState(false);
  const [form, setForm] = useState({
    id: 0,
    name: "",
    email: "",
    senha: "",
    csenha: "",
  });
  const [senhaerro, setSenhaErro] = useState(false);
  const [emailerro,  setEmailErro] = useState("");

  const senhaErroEstilo = senhaerro ? "bg-red-100" : "bg-none";
  const emailErroEstilo = emailerro ? "bg-red-100" : "bg-none";

  async function cadastrar(e: React.SubmitEvent<HTMLFormElement>) {
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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome: form.name,
            email: form.email,
            senha: form.senha,
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
        });
    } catch (error) {
       const mensagem =
        error instanceof Error ? error.message : "Erro inesperado!";
        setEmailErro(mensagem);
    }
  }

  return (
    <div className="flex items-center justify-center px-6 py-8">
      <div className="h-full rounded-[15px] border border-zinc-950 p-6 shadow-[0_1px_5px] shadow-zinc-950 md:w-120">
        <div className="mb-6 flex flex-col items-center justify-center">
          <h2 className="mb-1 text-3xl font-bold text-violet-950">
            Bem Vindo!
          </h2>
          <p className="text-center text-lg">
            Para <strong>cadastrar-se</strong>, insira as informações abaixo.
          </p>
        </div>
        <div className="flex flex-col gap-2 px-6">
          <form onSubmit={cadastrar} className="flex flex-col gap-2">
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="rounded-lg border-2 border-violet-950 p-2"
              placeholder="Digite seu Nome Completo:"
            />
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value})}
              className={`rounded-lg border-2 border-violet-950 p-2 ${emailErroEstilo}`}
              placeholder="Digite seu Email:"
            />
            <div className="relative">
              <input
                type={mostrar ? "text" : "password"}
                required
                minLength={8}
                value={form.senha}
                onChange={(e) => setForm({ ...form, senha: e.target.value})}
                className={`w-full rounded-lg border-2 border-violet-950 p-2 ${senhaErroEstilo}`}
                placeholder="Digite sua Senha:"
              />
              <button
                type="button"
                onClick={() => setMostrar(!mostrar)}
                className="absolute top-1/2 right-3 -translate-y-1/2"
              >
                {mostrar ? <Eye color="#2f0d68" /> : <EyeOff color="#2f0d68" />}
              </button>
            </div>
            <div>
              <input
                type={mostrar ? "text" : "password"}
                required
                value={form.csenha}
                onChange={(e) => setForm({ ...form, csenha: e.target.value})}
                className={`w-full rounded-lg border-2 border-violet-950 p-2 ${senhaErroEstilo}`}
                placeholder="Confirme sua Senha:"
              />
              {senhaerro && <p className="pl-2 text-red-600">As senhas não coincidem!</p>}
              {emailerro && <p className="pl-2 text-red-600">{emailerro}</p>}
            </div>
            <button
              type="submit"
              className="mt-2 cursor-pointer rounded-[13px] bg-violet-800 px-4 py-3 text-white hover:bg-violet-900"
            >
              <strong>Login</strong>
            </button>
          </form>
          <div className="flex items-center text-gray-500 select-none">
            <hr className="flex-1" />
            <p className="mx-1.5 mb-0.5">Já tem um cadastro?</p>
            <hr className="flex-1" />
          </div>
          <NavLink
            to={"/login"}
            className="w-fit font-bold text-violet-800 hover:underline"
          >
            Logue aqui!
          </NavLink>
        </div>
      </div>
    </div>
  );
}
