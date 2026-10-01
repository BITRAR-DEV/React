import { useState } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EditarCadastro() {
  const navigate = useNavigate();

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarCSenha, setMostrarCSenha] = useState(false);

  const [form, setForm] = useState({
    nome: "",
    nick: "",
    email: "",
    senha: "",
    csenha: "",
  });

  function alterarCampo(campo: string, valor: string) {
    setForm({
      ...form,
      [campo]: valor,
    });
  }

  function salvar(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log(form);
  }

  return (
    <div className="min-h-screen bg-blue-100 px-6 py-10 text-violet-950">

      {/* Card */}
      <div className="mx-auto w-full max-w-xl rounded-2xl border border-zinc-950 bg-white p-6 shadow-[0_2px_8px] shadow-zinc-950/40">

        {/* Cabeçalho */}
        <div className="mb-7 flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-lg p-2 transition hover:bg-zinc-100"
          >
            <ArrowLeft size={22} />
          </button>

          <div>
            <h1 className="text-3xl font-bold text-violet-950">
              Editar cadastro
            </h1>

            <p className="text-gray-500">
              Altere as informações da sua conta.
            </p>
          </div>
        </div>

        {/* Formulário */}
        <form onSubmit={salvar} className="flex flex-col gap-4">

          {/* Nome */}
          <div>
            <label className="mb-1 block font-semibold">
              Nome completo
            </label>

            <input
              type="text"
              value={form.nome}
              onChange={(e) => alterarCampo("nome", e.target.value)}
              placeholder="Digite seu nome completo"
              className="w-full rounded-lg border-2 border-violet-950 bg-white p-2.5 outline-none transition focus:ring-2 focus:ring-violet-300"
            />
          </div>

          {/* Nick */}
          <div>
            <label className="mb-1 block font-semibold">
              Nick
            </label>

            <input
              type="text"
              value={form.nick}
              onChange={(e) => alterarCampo("nick", e.target.value)}
              placeholder="Digite seu nick"
              className="w-full rounded-lg border-2 border-violet-950 bg-white p-2.5 outline-none transition focus:ring-2 focus:ring-violet-300"
            />

            <p className="mt-1 text-sm text-gray-500">
              Seu nick será usado no endereço do seu perfil.
            </p>
          </div>

          {/* Email */}
          <div>
            <label className="mb-1 block font-semibold">
              Email
            </label>

            <input
              type="email"
              value={form.email}
              onChange={(e) => alterarCampo("email", e.target.value)}
              placeholder="Digite seu email"
              className="w-full rounded-lg border-2 border-violet-950 bg-white p-2.5 outline-none transition focus:ring-2 focus:ring-violet-300"
            />
          </div>

          {/* Senha */}
          <div>
            <label className="mb-1 block font-semibold">
              Nova senha
            </label>

            <div className="relative">
              <input
                type={mostrarSenha ? "text" : "password"}
                value={form.senha}
                onChange={(e) => alterarCampo("senha", e.target.value)}
                placeholder="Digite uma nova senha"
                className="w-full rounded-lg border-2 border-violet-950 bg-white p-2.5 pr-12 outline-none transition focus:ring-2 focus:ring-violet-300"
              />

              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {mostrarSenha ? (
                  <Eye size={20} color="#2f0d68" />
                ) : (
                  <EyeOff size={20} color="#2f0d68" />
                )}
              </button>
            </div>
          </div>

          {/* Confirmar senha */}
          <div>
            <label className="mb-1 block font-semibold">
              Confirmar nova senha
            </label>

            <div className="relative">
              <input
                type={mostrarCSenha ? "text" : "password"}
                value={form.csenha}
                onChange={(e) => alterarCampo("csenha", e.target.value)}
                placeholder="Confirme sua nova senha"
                className="w-full rounded-lg border-2 border-violet-950 bg-white p-2.5 pr-12 outline-none transition focus:ring-2 focus:ring-violet-300"
              />

              <button
                type="button"
                onClick={() => setMostrarCSenha(!mostrarCSenha)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {mostrarCSenha ? (
                  <Eye size={20} color="#2f0d68" />
                ) : (
                  <EyeOff size={20} color="#2f0d68" />
                )}
              </button>
            </div>
          </div>

          {/* Botões */}
          <div className="mt-3 flex gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 rounded-xl border-2 border-violet-800 px-4 py-3 font-semibold text-violet-800 transition hover:bg-violet-50"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="flex-1 rounded-xl bg-violet-800 px-4 py-3 font-semibold text-white transition hover:bg-violet-900"
            >
              Salvar alterações
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}