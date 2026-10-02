import { useContext, useEffect, useRef, useState } from "react";
import { Star, X } from "lucide-react";
import { useTema } from "../contexts/ThemeContext";
import { useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const rawgKey = import.meta.env.VITE_RAWG_API_KEY;

type Jogo = {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  released: string;
  metacritic: number | null;
  genres?: {
    id: number;
    name: string;
  }[];
  platforms?: {
    platform: {
      id: number;
      name: string;
    };
  }[];
  website?: string;
};

function formatarData(data: string) {
  if (!data) return "Data desconhecida";

  const dataFormatada = new Date(data);

  return dataFormatada.toLocaleDateString("pt-BR");
}

const api = import.meta.env.VITE_API_URL;

export default function JogosUser() {
  const { nick } = useParams();
  const auth = useContext(AuthContext);
  const [jogos, setJogos] = useState<Jogo[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [edicaoPerm, setEdicaoPerm] = useState(false);

  useEffect(() => {
    if (nick === auth?.usuario?.nick) {
      setEdicaoPerm(true);
    }
  });

  const [jogoSelecionado, setJogoSelecionado] = useState<Jogo | null>(null);

  const modal = useRef<HTMLDialogElement>(null);
  const tema = useTema();

  async function buscarJogos() {
    setCarregando(true);
    try {
      const resposta = await fetch(`${api}/jogos/${nick}`);

      const resultado = await resposta.json();

      const requisicoes = resultado.map((jogo: { rawgId: number }) =>
        fetch(
          `https://api.rawg.io/api/games/${jogo.rawgId}?key=${rawgKey}`,
        ).then((resposta) => resposta.json()),
      );

      const jogosCompletos = await Promise.all(requisicoes);

      setJogos(jogosCompletos);
    } catch (error) {
      console.log(error);
      setErro(
        "Não foi possível carregar os jogos. Verifique sua conexão e a API Key."
      );
    } finally {
      setCarregando(false);
    }
  }

  async function removerJogos(jogoId: number) {
    if (auth?.usuario?.nick !== nick) {
      return alert("Você não pode deletar jogos de outro usuário");
    }
    try {
      const resposta = await fetch(`${api}/jogosdel/${jogoId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (resposta.ok) {
        setJogos((jogosAtuais) => jogosAtuais.filter((jogo) => jogo.id !== jogoId ));
      }

      console.log(resposta);
    } catch (error) {
      console.log(error);
    }
  }

  async function abrirModal(jogo: Jogo) {
    setJogoSelecionado(jogo);
    modal.current?.showModal();

    try {
      const resposta = await fetch(
        `https://api.rawg.io/api/games/${jogo.id}?key=${rawgKey}`,
      );

      if (!resposta.ok) {
        return;
      }

      const detalhes = await resposta.json();

      setJogoSelecionado((jogoAtual) => {
        if (!jogoAtual) return null;

        return {
          ...jogoAtual,
          description: detalhes.description,
          website: detalhes.website,
          genres: detalhes.genres,
          platforms: detalhes.platforms,
        };
      });
    } catch (error) {
      console.error("Erro ao buscar detalhes:", error);
    }
  }

  function fecharModal() {
    modal.current?.close();
    setJogoSelecionado(null);
  }

  useEffect(() => {
    buscarJogos();
  }, [nick]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        tema?.temaEscuro
          ? "bg-[#17131f] text-white"
          : "bg-blue-100 text-violet-950"
      }`}
    >
      {/* CABEÇALHO */}
      <section
        className={`border-b px-5 py-8 transition-colors md:px-10 ${
          tema?.temaEscuro
            ? "border-violet-900 bg-[#211b2b]"
            : "bg-blue-150 border-violet-200"
        }`}
      >
        <div className="mx-auto mb-6 flex max-w-7xl flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-4xl font-bold md:text-5xl">Jogos de {nick}</h1>

            <p
              className={`mt-2 ${
                tema?.temaEscuro ? "text-gray-300" : "text-violet-700"
              }`}
            >
              Jogos que <span className="font-bold">{nick}</span> adicionou em
              sua lista:
            </p>
          </div>
        </div>
      </section>
      {/* CONTEÚDO */}
      <div className="mx-auto max-w-7xl px-5 pb-12 md:px-10">
        {carregando && (
          <div className="flex justify-center py-20">
            <p className="text-xl font-semibold">Carregando jogos...</p>
          </div>
        )}

        {erro && !carregando && (
          <div className="rounded-xl bg-red-100 p-5 text-center text-red-700">
            {erro}
          </div>
        )}

        {!carregando && !erro && jogos.length === 0 && (
          <div className="py-20 text-center">
            <h2 className="text-2xl font-bold">Nenhum jogo encontrado</h2>

            <p className="mt-2">Tente pesquisar por outro nome.</p>
          </div>
        )}

        {/* JOGOS */}
        {!carregando && (
          <div className="grid grid-cols-1 gap-6 py-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {jogos.map((jogo) => (
              <div
                key={jogo.id}
                className={`overflow-hidden rounded-2xl border shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  tema?.temaEscuro
                    ? "border-violet-900 bg-[#211b2b]"
                    : "border-violet-100 bg-white"
                }`}
              >
                <div className="relative">
                  {edicaoPerm && (
                    <button
                      title="Remover da lista"
                      className="absolute top-3 left-3 flex cursor-pointer items-center gap-1 rounded-lg bg-red-900 px-1 py-1 text-red-500 hover:bg-red-800"
                      onClick={() => removerJogos(jogo.id)}
                    >
                      <X size={24} />
                    </button>
                  )}

                  <img
                    src={jogo.background_image}
                    alt={jogo.name}
                    className="h-56 w-full object-cover"
                  />

                  <div className="absolute top-3 right-3 flex items-center gap-1 rounded-lg bg-black/75 px-2 py-1 text-white">
                    <Star size={17} fill="#F1C338" color="#F1C338" />

                    {jogo.rating?.toFixed(1)}
                  </div>
                </div>

                <div className="p-5">
                  <h2 className="truncate text-xl font-bold">{jogo.name}</h2>

                  <div className="mt-4 flex items-center justify-between">
                    <span
                      className={`text-sm ${
                        tema?.temaEscuro ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {formatarData(jogo.released)}
                    </span>

                    <button
                      onClick={() => abrirModal(jogo)}
                      className="cursor-pointer rounded-lg bg-violet-700 px-4 py-2 font-semibold text-white transition hover:bg-violet-800"
                    >
                      Saiba mais
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      <dialog
        ref={modal}
        className={`m-auto w-[90%] max-w-4xl rounded-2xl border-2 border-violet-800 p-0 shadow-2xl backdrop:bg-black/70 ${
          tema?.temaEscuro
            ? "bg-[#211b2b] text-white"
            : "bg-white text-violet-950"
        }`}
      >
        {jogoSelecionado && (
          <div className="relative">
            {/* BOTÃO FECHAR */}
            <button
              onClick={fecharModal}
              className="absolute top-4 right-4 z-10 rounded-lg bg-violet-700 p-2 text-white hover:bg-violet-800"
            >
              <X size={24} />
            </button>

            {/* IMAGEM */}
            <img
              src={jogoSelecionado.background_image}
              alt={jogoSelecionado.name}
              className="h-64 w-full object-cover md:h-80"
            />

            <div className="p-6 md:p-8">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <h2 className="text-3xl font-bold md:text-4xl">
                  {jogoSelecionado.name}
                </h2>

                <div className="flex items-center gap-2 font-bold">
                  <Star size={22} fill="#F1C338" color="#F1C338" />
                  {jogoSelecionado.rating?.toFixed(1)}/5
                </div>
              </div>

              {/* INFORMAÇÕES */}
              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div
                  className={`rounded-xl p-4 ${
                    tema?.temaEscuro ? "bg-[#17131f]" : "bg-violet-50"
                  }`}
                >
                  <strong>Lançamento:</strong>

                  <p className="mt-1">
                    {formatarData(jogoSelecionado.released)}
                  </p>
                </div>

                <div
                  className={`rounded-xl p-4 ${
                    tema?.temaEscuro ? "bg-[#17131f]" : "bg-violet-50"
                  }`}
                >
                  <strong>Metacritic:</strong>

                  <p className="mt-1">
                    {jogoSelecionado.metacritic ?? "Não informado"}
                  </p>
                </div>
              </div>

              {/* GÊNEROS */}
              {jogoSelecionado.genres && jogoSelecionado.genres.length > 0 && (
                <div className="mt-5">
                  <strong>Gêneros:</strong>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {jogoSelecionado.genres.map((genero) => (
                      <span
                        key={genero.id}
                        className="rounded-full bg-violet-700 px-3 py-1 text-sm text-white"
                      >
                        {genero.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex gap-1">
                {/* SITE */}
                {jogoSelecionado.website && (
                  <a
                    href={jogoSelecionado.website}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-block rounded-lg bg-violet-700 px-5 py-2 font-semibold text-white hover:bg-violet-800"
                  >
                    Site oficial
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
