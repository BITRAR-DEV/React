import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const api = import.meta.env.VITE_API_URL;

export default function Login() {
  const navigate = useNavigate();
  const [mostrar, setMostrar] = useState(false);
  const [form, setForm] = useState({
    email: "",
    senha: "",
  });

  const [ loginErro, setLoginErro ] = useState("")
  const auth = useContext(AuthContext);

  async function logar(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoginErro("");
    

    try {
      const resposta = await fetch(`${api}/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          senha: form.senha,
        }),
      });

      const login = await resposta.json();

      if (!resposta.ok) {
        throw new Error(login.erro);
      }

      auth?.setUsuario(login.usuario);

      setForm({
        email: "",
        senha: "",
      });
      
      navigate("/perfil");
    } catch (error) {
        const mensagem =
        error instanceof Error ? error.message : "Erro inesperado!";
        setLoginErro(mensagem);
    }
  }

  return (
    <div className="flex items-center justify-center px-6 py-8">
      <div className="bg-blue-50 h-full rounded-[15px] border border-zinc-950 p-6 shadow-[0_1px_5px] shadow-zinc-950 md:w-120">
        <div className="mb-6 flex flex-col items-center justify-center">
          <h2 className="mb-1 text-3xl font-bold text-violet-950">
            Bem Vindo!
          </h2>
          <p className="text-center text-lg">
            <strong>Logue</strong> ou <strong>Cadastre-se</strong> para ter
            acesso ao resto dos conteúdos
          </p>
        </div>
        <div className="flex flex-col gap-2 px-6">
          <form onSubmit={logar} className="flex flex-col gap-2">
            <input
              type="email"
              className="rounded-lg border-2 border-violet-950 p-2"
              placeholder="Digite seu Email:"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <div>
                <div className="relative">
                <input
                    type={mostrar ? "text" : "password"}
                    className="w-full rounded-lg border-2 border-violet-950 p-2"
                    placeholder="Digite sua Senha:"
                    value={form.senha}
                    onChange={(e) => setForm({ ...form, senha: e.target.value })}
                />
                <button
                    type="button"
                    onClick={() => setMostrar(!mostrar)}
                    className="absolute top-1/2 right-3 -translate-y-1/2"
                >
                    {mostrar ? <Eye color="#2f0d68" /> : <EyeOff color="#2f0d68" />}
                </button>
                </div>
                {loginErro && <p className="pl-2 text-red-600">{loginErro}</p>}
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
            <p className="mx-1.5 mb-0.5">Não tem um cadastro?</p>
            <hr className="flex-1" />
          </div>
          <NavLink
            to={"/cadastro"}
            className="w-fit font-bold text-violet-800 hover:underline"
          >
            Cadastre-se aqui
          </NavLink>
        </div>
      </div>
    </div>
  );
}
