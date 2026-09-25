import { useEffect, useRef, useState } from "react";
import {
  Grid3X3,
  List,
  Moon,
  Search,
  Star,
  Sun,
  X,
} from "lucide-react";

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

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
  description?: string;
  description_raw?: string;
  website?: string;
};

type Ordenacao =
  | "relevance"
  | "name"
  | "-released"
  | "released"
  | "-rating"
  | "-metacritic";

type ModoExibicao = "grid" | "list";

function formatarData(data: string) {
  if (!data) return "Data desconhecida";

  const dataFormatada = new Date(data);

  return dataFormatada.toLocaleDateString("pt-BR");
}

function limparHTML(texto: string) {
  return texto.replace(/<[^>]*>/g, "");
}

export default function Jogos() {
  const [jogos, setJogos] = useState<Jogo[]>([]);
  const [busca, setBusca] = useState("");
  const [ordenacao, setOrdenacao] =
    useState<Ordenacao>("relevance");

  const [modoExibicao, setModoExibicao] =
    useState<ModoExibicao>("grid");

  const [temaEscuro, setTemaEscuro] = useState(false);

  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  const [jogoSelecionado, setJogoSelecionado] =
    useState<Jogo | null>(null);

  const modal = useRef<HTMLDialogElement>(null);

  async function buscarJogos() {
    setCarregando(true);
    setErro("");

    try {
      const parametros = new URLSearchParams({
        key: API_KEY,
        page_size: "20",
      });

      if (busca.trim()) {
        parametros.set("search", busca);
      }

      if (ordenacao !== "relevance") {
        parametros.set("ordering", ordenacao);
      }

      const resposta = await fetch(
        `https://api.rawg.io/api/games?${parametros.toString()}`
      );

      if (!resposta.ok) {
        throw new Error("Não foi possível buscar os jogos.");
      }

      const dados = await resposta.json();

      setJogos(dados.results);
    } catch (error) {
      console.error(error);

      setErro(
        "Não foi possível carregar os jogos. Verifique sua conexão e a API Key."
      );
    } finally {
      setCarregando(false);
    }
  }

  async function abrirModal(jogo: Jogo) {
    setJogoSelecionado(jogo);
    modal.current?.showModal();

    try {
      const resposta = await fetch(
        `https://api.rawg.io/api/games/${jogo.id}?key=${API_KEY}`
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
    const temaSalvo = localStorage.getItem("tema-jogos");

    if (temaSalvo === "escuro") {
      setTemaEscuro(true);
    }

    buscarJogos();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "tema-jogos",
      temaEscuro ? "escuro" : "claro"
    );
  }, [temaEscuro]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        temaEscuro
          ? "bg-[#17131f] text-white"
          : "bg-blue-100 text-violet-950"
      }`}
    >
      {/* CABEÇALHO */}
      <section
        className={`border-b px-5 py-8 transition-colors md:px-10 ${
          temaEscuro
            ? "border-violet-900 bg-[#211b2b]"
            : "border-violet-200 bg-blue-150"
        }`}
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-4xl font-bold md:text-5xl">
                Catálogo de Jogos
              </h1>

              <p
                className={`mt-2 ${
                  temaEscuro
                    ? "text-gray-300"
                    : "text-violet-700"
                }`}
              >
                Explore jogos disponíveis na RAWG
              </p>
            </div>

            {/* TEMA */}
            <button
              onClick={() => setTemaEscuro(!temaEscuro)}
              className={`flex w-fit items-center gap-2 rounded-xl px-4 py-2 font-semibold transition ${
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

          {/* BUSCA */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              buscarJogos();
            }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <div className="relative flex-1">
              <Search
                size={22}
                className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                  temaEscuro
                    ? "text-gray-400"
                    : "text-violet-500"
                }`}
              />

              <input
                type="text"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar jogos..."
                className={`w-full rounded-xl border py-3 pl-12 pr-4 outline-none transition focus:ring-2 focus:ring-violet-500 ${
                  temaEscuro
                    ? "border-violet-800 bg-[#15111c] text-white placeholder:text-gray-500"
                    : "border-violet-200 bg-white text-gray-900"
                }`}
              />
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-violet-700 px-6 py-3 font-bold text-white transition hover:bg-violet-800"
            >
              <Search size={20} />
              Buscar
            </button>
          </form>
        </div>
      </section>

      {/* CONTROLES */}
      <section className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 md:flex-row md:items-center md:justify-between md:px-10">
        {/* ORDENAÇÃO */}
        <div className="flex items-center gap-3">
          <label
            htmlFor="ordenacao"
            className="font-semibold"
          >
            Ordenar por:
          </label>

          <select
            id="ordenacao"
            value={ordenacao}
            onChange={(e) => {
              setOrdenacao(e.target.value as Ordenacao);
            }}
            className={`rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-violet-500 ${
              temaEscuro
                ? "border-violet-800 bg-[#211b2b] text-white"
                : "border-violet-200 bg-white"
            }`}
          >
            <option value="relevance">Relevância</option>
            <option value="-rating">Melhor avaliação</option>
            <option value="name">Nome</option>
            <option value="-released">
              Mais recentes
            </option>
            <option value="released">
              Mais antigos
            </option>
            <option value="-metacritic">
              Metacritic
            </option>
          </select>

          <button
            onClick={buscarJogos}
            className="rounded-lg bg-violet-700 px-4 py-2 font-semibold text-white hover:bg-violet-800"
          >
            Aplicar
          </button>
        </div>

        {/* MODO DE EXIBIÇÃO */}
        <div className="flex items-center gap-3">
          <span className="font-semibold">
            Opções de exibição:
          </span>

          <div
            className={`flex overflow-hidden rounded-lg border ${
              temaEscuro
                ? "border-violet-800"
                : "border-violet-200"
            }`}
          >
            <button
              onClick={() => setModoExibicao("grid")}
              title="Exibição em grade"
              className={`p-2 ${
                modoExibicao === "grid"
                  ? "bg-violet-700 text-white"
                  : temaEscuro
                    ? "bg-[#211b2b] text-gray-300"
                    : "bg-white text-violet-700"
              }`}
            >
              <Grid3X3 size={22} />
            </button>

            <button
              onClick={() => setModoExibicao("list")}
              title="Exibição em lista"
              className={`p-2 ${
                modoExibicao === "list"
                  ? "bg-violet-700 text-white"
                  : temaEscuro
                    ? "bg-[#211b2b] text-gray-300"
                    : "bg-white text-violet-700"
              }`}
            >
              <List size={22} />
            </button>
          </div>
        </div>
      </section>

      {/* CONTEÚDO */}
      <main className="mx-auto max-w-7xl px-5 pb-12 md:px-10">
        {carregando && (
          <div className="flex justify-center py-20">
            <p className="text-xl font-semibold">
              Carregando jogos...
            </p>
          </div>
        )}

        {erro && !carregando && (
          <div className="rounded-xl bg-red-100 p-5 text-center text-red-700">
            {erro}
          </div>
        )}

        {!carregando && !erro && jogos.length === 0 && (
          <div className="py-20 text-center">
            <h2 className="text-2xl font-bold">
              Nenhum jogo encontrado
            </h2>

            <p className="mt-2">
              Tente pesquisar por outro nome.
            </p>
          </div>
        )}

        {/* GRID */}
        {!carregando && modoExibicao === "grid" && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {jogos.map((jogo) => (
              <article
                key={jogo.id}
                className={`overflow-hidden rounded-2xl border shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  temaEscuro
                    ? "border-violet-900 bg-[#211b2b]"
                    : "border-violet-100 bg-white"
                }`}
              >
                <div className="relative">
                  <img
                    src={jogo.background_image}
                    alt={jogo.name}
                    className="h-56 w-full object-cover"
                  />

                  <div className="absolute right-3 top-3 flex items-center gap-1 rounded-lg bg-black/75 px-2 py-1 text-white">
                    <Star
                      size={17}
                      fill="#F1C338"
                      color="#F1C338"
                    />

                    {jogo.rating?.toFixed(1)}
                  </div>
                </div>

                <div className="p-5">
                  <h2 className="truncate text-xl font-bold">
                    {jogo.name}
                  </h2>

                  <p
                    className={`mt-2 line-clamp-3 text-sm ${
                      temaEscuro
                        ? "text-gray-300"
                        : "text-gray-600"
                    }`}
                  >
                    {jogo.description_raw}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <span
                      className={`text-sm ${
                        temaEscuro
                          ? "text-gray-400"
                          : "text-gray-500"
                      }`}
                    >
                      {formatarData(jogo.released)}
                    </span>

                    <button
                      onClick={() => abrirModal(jogo)}
                      className="rounded-lg bg-violet-700 px-4 py-2 font-semibold text-white transition hover:bg-violet-800"
                    >
                      Saiba mais
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* LISTA */}
        {!carregando && modoExibicao === "list" && (
          <div className="flex flex-col gap-5">
            {jogos.map((jogo) => (
              <article
                key={jogo.id}
                className={`flex flex-col overflow-hidden rounded-2xl border shadow-md transition md:flex-row ${
                  temaEscuro
                    ? "border-violet-900 bg-[#211b2b]"
                    : "border-violet-100 bg-white"
                }`}
              >
                <img
                  src={jogo.background_image}
                  alt={jogo.name}
                  className="h-56 w-full object-cover md:h-48 md:w-72"
                />

                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h2 className="text-2xl font-bold">
                        {jogo.name}
                      </h2>

                      <span className="flex items-center gap-1 font-semibold">
                        <Star
                          size={18}
                          fill="#F1C338"
                          color="#F1C338"
                        />

                        {jogo.rating?.toFixed(1)}
                      </span>
                    </div>

                    <p
                      className={`mt-3 ${
                        temaEscuro
                          ? "text-gray-300"
                          : "text-gray-600"
                      }`}
                    >
                      {jogo.description_raw}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <span
                      className={`text-sm ${
                        temaEscuro
                          ? "text-gray-400"
                          : "text-gray-500"
                      }`}
                    >
                      Lançamento:{" "}
                      {formatarData(jogo.released)}
                    </span>

                    <button
                      onClick={() => abrirModal(jogo)}
                      className="rounded-lg bg-violet-700 px-5 py-2 font-semibold text-white hover:bg-violet-800"
                    >
                      Saiba mais
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* MODAL */}
      <dialog
        ref={modal}
        className={`m-auto w-[90%] max-w-4xl overflow-hidden rounded-2xl border-2 border-violet-800 p-0 shadow-2xl backdrop:bg-black/70 ${
          temaEscuro
            ? "bg-[#211b2b] text-white"
            : "bg-white text-violet-950"
        }`}
      >
        {jogoSelecionado && (
          <div className="relative">
            {/* BOTÃO FECHAR */}
            <button
              onClick={fecharModal}
              className="absolute right-4 top-4 z-10 rounded-lg bg-violet-700 p-2 text-white hover:bg-violet-800"
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
                  <Star
                    size={22}
                    fill="#F1C338"
                    color="#F1C338"
                  />

                  {jogoSelecionado.rating?.toFixed(1)}/5
                </div>
              </div>

              <div
                className={`mt-6 leading-relaxed ${
                  temaEscuro
                    ? "text-gray-300"
                    : "text-gray-700"
                }`}
              >
                {jogoSelecionado.description_raw ? (
                  <p>
                    {limparHTML(
                      jogoSelecionado.description_raw
                    )}
                  </p>
                ) : (
                  <p>{jogoSelecionado.description_raw}</p>
                )}
              </div>

              {/* INFORMAÇÕES */}
              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div
                  className={`rounded-xl p-4 ${
                    temaEscuro
                      ? "bg-[#17131f]"
                      : "bg-violet-50"
                  }`}
                >
                  <strong>Lançamento:</strong>

                  <p className="mt-1">
                    {formatarData(
                      jogoSelecionado.released
                    )}
                  </p>
                </div>

                <div
                  className={`rounded-xl p-4 ${
                    temaEscuro
                      ? "bg-[#17131f]"
                      : "bg-violet-50"
                  }`}
                >
                  <strong>Metacritic:</strong>

                  <p className="mt-1">
                    {jogoSelecionado.metacritic ??
                      "Não informado"}
                  </p>
                </div>
              </div>

              {/* GÊNEROS */}
              {jogoSelecionado.genres &&
                jogoSelecionado.genres.length > 0 && (
                  <div className="mt-5">
                    <strong>Gêneros:</strong>

                    <div className="mt-2 flex flex-wrap gap-2">
                      {jogoSelecionado.genres.map(
                        (genero) => (
                          <span
                            key={genero.id}
                            className="rounded-full bg-violet-700 px-3 py-1 text-sm text-white"
                          >
                            {genero.name}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}

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
        )}
      </dialog>
    </div>
  );
}