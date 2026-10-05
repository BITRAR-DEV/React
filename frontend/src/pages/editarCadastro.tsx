import { useParams, Navigate, useNavigate } from "react-router-dom";
import { use, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useTema } from "../contexts/ThemeContext";
import { Eye, EyeOff, X } from "lucide-react";

const api = import.meta.env.VITE_API_URL;

export default function Cadastro() {
  useEffect(() => {
    document.title = "Editar Cadastro | Game Stream";
  }, []);

  const auth = useContext(AuthContext);

  
  const tema = useTema();
  const [mostrar, setMostrar] = useState(false);
  const [erro, setErro] = useState("");
  const [senhaerro, setSenhaErro] = useState(false);
  
  
  type CampoEditavel = "nome" | "nick" | "email" | "senha";
  
  type Usuario = {
    id: number;
    nome: string;
    nick: string;
    email: string;
  };
  
  const [editar, setEditar] = useState<CampoEditavel | null>(null);
  const [dados, setDados] = useState<Usuario | null>(null);
  
  async function buscarPerfil() {
    try {
      const resposta = await fetch(`${api}/usuarios/${auth?.usuario?.nick}`);
      
      const resultado = await resposta.json();
      
      setDados(resultado);
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    if (auth?.usuario?.nick) {
      buscarPerfil();
    }
  }, [auth?.usuario?.nick]);
  
  
  async function EditarSenha(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    
    setErro("");
    
    if (form.novasenha !== form.csenha) {
      setErro("As senhas não coincidem");
      return;
    }
    
    const resposta = await fetch(`${api}/editsenha`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        senhaAtual: form.senha,
        novaSenha: form.novasenha,
      }),
    });
    
    const resultado = await resposta.json();
    
    if (!resposta.ok) {
      setErro(resultado.erro);
      return;
    }
    
    alert(resultado.mensagem);
    setEditar(null);
  }
  
  async function EditarCampo(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    
    if (!editar) {
      return;
    }
    
    const resposta = await fetch(`${api}/editinfo`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        campo: editar,
        valor: form[editar],
        senhaAtual: form.senha,
      }),
    });
    
    const resultado = await resposta.json();
    if (!resposta.ok) {
      setErro(resultado.erro);
      return;
    }
    
    alert(resultado.mensagem);
    setDados(resultado.usuario);
    auth?.setUsuario(resultado.usuario);
    setEditar(null);
  }
  
  function abrirEditar(campo: CampoEditavel) {
    setEditar(campo);
    
    if (campo !== "senha" && dados) {
      setForm({
        ...form,
        [campo]: dados[campo],
        senha: "",
      });
    }
  }
  
  const [form, setForm] = useState({
    nome: dados?.nome,
    email: dados?.email,
    nick: dados?.nick,
    senha: "",
    novasenha: "",
    csenha: "",
  });
  
  const configuracao = {
    nome: {
      titulo: "Editar nome",
      label: "Novo nome:",
    },
    
    nick: {
      titulo: "Editar nome de usuário",
      label: "Novo nome de usuário:",
    },
    
    email: {
      titulo: "Editar de email",
      label: "Novo email:",
    },
    
    senha: {
      titulo: "Alterar senha",
      label: "Nova senha:",
      labelc: "Confirme nova senha:",
    },
  };

  if (auth?.carregando) {
    return <p>Carregando...</p>;
  }

  if (!auth?.usuario) {
    return <Navigate to={`/login`} replace />;
  }
  
  
  return (
    <div
    className={` px-6 py-8 transition-colors duration-300 ${
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
                    <p>{dados?.nome}</p>
                    <button
                      className="cursor-pointer rounded-lg bg-violet-900 px-6 py-2 text-white hover:bg-violet-950"
                      onClick={() => abrirEditar("nome")}
                    >
                      Editar
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="">Nome de Usuário</p>
                  <div className="flex items-center gap-4">
                    <p>{dados?.nick}</p>
                    <button
                      className="cursor-pointer rounded-lg bg-violet-900 px-6 py-2 text-white hover:bg-violet-950"
                      onClick={() => abrirEditar("nick")}
                    >
                      Editar
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="">Email</p>
                  <div className="flex items-center gap-4">
                    <p>{dados?.email}</p>
                    <button
                      className="cursor-pointer rounded-lg bg-violet-900 px-6 py-2 text-white hover:bg-violet-950"
                      onClick={() => abrirEditar("email")}
                    >
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
                <button
                  className="cursor-pointer rounded-lg bg-violet-900 px-6 py-2 text-white hover:bg-violet-950"
                  onClick={() => setEditar("senha")}
                >
                  Editar
                </button>
              </div>
            </div>
          </div>
          {editar && (
            <>
              <div className="fixed inset-0 z-40 bg-black/70" />
              <dialog
                open
                className={`fixed z-50 inset-0 m-auto w-100 overflow-hidden rounded-2xl border-2 border-violet-900 shadow-[0_1px_5px] shadow-zinc-950 transition-colors duration-300 ${
                  tema?.temaEscuro
                    ? "border-violet-800 bg-[#211b2b]"
                    : "border-zinc-950 bg-blue-50"
                }`}
              >
                <button
                  onClick={() => setEditar(null)}
                  className="absolute top-4 right-4 z-10 rounded-lg bg-violet-700 p-2 text-white hover:bg-violet-800"
                >
                  <X size={24} />
                </button>
                <div
                  className={`flex flex-col items-center justify-center gap-4 px-10 py-8 ${
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
                    {configuracao[editar].titulo}
                  </h2>
                  {editar !== "senha" ? (
                    <form
                      onSubmit={EditarCampo}
                      className="flex w-full flex-col gap-2"
                    >
                      <input
                        type="text"
                        required
                        className={`rounded-lg border-2 p-2 outline-none focus:ring-2 focus:ring-violet-500 ${
                          tema?.temaEscuro
                            ? "border-violet-700 bg-[#17131f] text-white placeholder:text-gray-400"
                            : "border-violet-950 bg-white text-violet-950"
                        }`}
                        placeholder={configuracao[editar].label}
                        value={form[editar]}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            [editar]: e.target.value,
                          })
                        }
                      />
                      <input
                        type="password"
                        required
                        className={`rounded-lg border-2 p-2 outline-none focus:ring-2 focus:ring-violet-500 ${
                          tema?.temaEscuro
                            ? "border-violet-700 bg-[#17131f] text-white placeholder:text-gray-400"
                            : "border-violet-950 bg-white text-violet-950"
                        }`}
                        placeholder="Digite sua senha:"
                        value={form.senha}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            senha: e.target.value,
                          })
                        }
                      />
                      {erro && <p className="pl-2 text-red-600">{erro}</p>}
                      <button className="mt-2 cursor-pointer rounded-lg bg-violet-900 px-6 py-2 text-white hover:bg-violet-950">
                        Salvar
                      </button>
                    </form>
                  ) : (
                    <form
                      onSubmit={EditarSenha}
                      className="flex w-full flex-col gap-2"
                    >
                      <div className="relative">
                        <input
                          type={mostrar ? "text" : "password"}
                          required
                          minLength={8}
                          className={`w-full rounded-lg border-2 p-2 outline-none focus:ring-2 focus:ring-violet-500${
                            tema?.temaEscuro
                              ? "border-violet-700 bg-[#17131f] text-white placeholder:text-gray-400"
                              : "border-violet-950 bg-white text-violet-950"
                          }`}
                          placeholder="Senha atual:"
                          value={form.senha}
                          onChange={(e) =>
                            setForm({ ...form, senha: e.target.value })
                          }
                        />

                        <button
                          type="button"
                          onClick={() => setMostrar(!mostrar)}
                          className="absolute top-1/2 right-3 -translate-y-1/2"
                        >
                          {mostrar ? (
                            <Eye
                              color={tema?.temaEscuro ? "#c4b5fd" : "#2f0d68"}
                            />
                          ) : (
                            <EyeOff
                              color={tema?.temaEscuro ? "#c4b5fd" : "#2f0d68"}
                            />
                          )}
                        </button>
                      </div>
                      <input
                        type={mostrar ? "text" : "password"}
                        required
                        minLength={8}
                        className={`w-full rounded-lg border-2 p-2 outline-none focus:ring-2 focus:ring-violet-500 ${
                          tema?.temaEscuro
                            ? "border-violet-700 bg-[#17131f] text-white placeholder:text-gray-400"
                            : "border-violet-950 bg-white text-violet-950"
                        }`}
                        placeholder={configuracao.senha.label}
                        value={form.novasenha}
                        onChange={(e) =>
                          setForm({ ...form, novasenha: e.target.value })
                        }
                      />

                      {/* CONFIRMAR SENHA */}
                      <div>
                        <input
                          type={mostrar ? "text" : "password"}
                          required
                          className={`w-full rounded-lg border-2 p-2 outline-none focus:ring-2 focus:ring-violet-500 ${
                            tema?.temaEscuro
                              ? "border-violet-700 bg-[#17131f] text-white placeholder:text-gray-400"
                              : "border-violet-950 bg-white text-violet-950"
                          }`}
                          placeholder={configuracao.senha.labelc}
                          value={form.csenha}
                          onChange={(e) =>
                            setForm({ ...form, csenha: e.target.value })
                          }
                        />

                        {senhaerro && (
                          <p className="pl-2 text-red-600">
                            As senhas não coincidem!
                          </p>
                        )}

                        {erro && <p className="pl-2 text-red-600">{erro}</p>}
                      </div>
                      <button className="mt-2 cursor-pointer rounded-lg bg-violet-900 px-6 py-2 text-white hover:bg-violet-950">
                        Salvar
                      </button>
                    </form>
                  )}
                </div>
              </dialog>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
