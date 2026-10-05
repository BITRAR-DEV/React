import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useParams, NavLink } from "react-router-dom";
import { Star, Pencil, ArrowRight } from "lucide-react";
import FotoPadrao from "../assets/FotoPadrao.jfif";
import Overlay from "../components/overlay";
import { useTema } from "../contexts/ThemeContext";
import BannerPadrao from "../assets/BannerPadrao.jpg";

const api = import.meta.env.VITE_API_URL;
const rawgKey = import.meta.env.VITE_RAWG_API_KEY;

export default function Perfil() {
  const { nick } = useParams();
  useEffect(() => {
    document.title = `Perfil de ${nick} | Game Stream`;
  }, []);

  const auth = useContext(AuthContext);
  const tema = useTema();
  const [edicaoPerm, setEdicaoPerm] = useState(false);
  const [editandoInfo, setEditandoInfo] = useState(false);

  useEffect(() => {
    if (nick === auth?.usuario?.nick) {
      setEdicaoPerm(true);
    }
  });

  type Usuario = {
    id: number;
    nome: string;
    nick: string;
    fotoPerfil: string;
    banner: string;
    bio: string;
  };

  type Jogo = {
    id: number;
    name: string;
    background_image: string;
    rating: number;
  };

  const [jogos, setJogos] = useState<Jogo[]>([]);
  const [dados, setDados] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [bio, setBio] = useState("");

  async function buscarPerfil() {
    try {
      const resposta = await fetch(`${api}/usuarios/${nick}`);

      const resultado = await resposta.json();

      setDados(resultado);
    } catch (error) {
      console.log(error);
    }
  }

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
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscarPerfil();
    buscarJogos();
  }, [nick]);

  async function mudarFoto(e: React.ChangeEvent<HTMLInputElement>) {
    const arquivo = e.target.files?.[0];
    const formData = new FormData();

    if (!arquivo) {
      return;
    }

    formData.append("file", arquivo);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
    );

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    try {
      const resposta = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const dados = await resposta.json();

      const atualizar = await fetch(`${api}/editfotos`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fotoPerfil: dados.secure_url,
        }),
      });

      const atualizou = await atualizar.json();

      if (!atualizar.ok) {
        throw new Error(atualizou.erro);
      }
    } catch (error) {
      console.log(error);
    } finally {
      buscarPerfil();
    }
  }

  function validarBanner(arquivo: File) {
    const img = new Image();

    img.onload = () => {
      const proporcao = img.width / img.height;

      console.log(img.width, img.height);
      console.log(proporcao);

      if (Math.abs(proporcao - 16 / 9) > 0.01) {
        alert("O banner precisa estar na proporção 16:9.");
        return;
      }

      console.log("Banner válido!");
    };

    img.src = URL.createObjectURL(arquivo);
  }

  async function mudarBanner(e: React.ChangeEvent<HTMLInputElement>) {
    const arquivo = e.target.files?.[0];
    const formData = new FormData();

    if (!arquivo) {
      return;
    }

    validarBanner(arquivo);

    formData.append("file", arquivo);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
    );

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    try {
      const resposta = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const dados = await resposta.json();

      const atualizar = await fetch(`${api}/perfil`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          banner: dados.secure_url,
        }),
      });

      const atualizou = await atualizar.json();

      if (!atualizar.ok) {
        throw new Error(atualizou.erro);
      }
    } catch (error) {
      console.log(error);
    } finally {
      buscarPerfil();
    }
  }

  async function editarBio() {
    try {
      const atualizar = await fetch(`${api}/editbio`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bio: bio,
        }),
      });

      const atualizou = await atualizar.json();

      if (!atualizar.ok) {
        throw new Error(atualizou.erro);
      }
      
      alert("Bio alterada")
      setEditandoInfo(false)
      buscarPerfil()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      className={`flex flex-col items-center justify-center px-6 py-8 transition-colors duration-300 ${
        tema?.temaEscuro
          ? "bg-[#17131f] text-white"
          : "bg-blue-100 text-violet-950"
      }`}
    >
      {/* PERFIL */}
      <div
        className={`mt-8 flex w-[70vw] flex-col items-center justify-center overflow-hidden rounded-2xl shadow-[0px_0px_10px] shadow-gray-600 ${
          tema?.temaEscuro ? "bg-violet-950" : "bg-slate-50"
        }`}
      >
        {/* BANNER */}
        <div className="w-full shadow-[0_0_10px] shadow-gray-400">
          <label
            htmlFor="bannerPerfil"
            className={`group relative block ${edicaoPerm && "cursor-pointer"}`}
          >
            <img
              src={dados?.banner || BannerPadrao}
              alt=""
              className="h-50 w-full bg-gray-400 object-cover"
            />
            {edicaoPerm && <Overlay size={40} />}
          </label>

          {edicaoPerm && (
            <input
              id="bannerPerfil"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={mudarBanner}
            />
          )}
        </div>

        {/* INFORMAÇÕES DO USUÁRIO */}
        <div className="mb-4 flex w-full px-12">
          <div className="-mt-19 justify-self-start">
            <label
              htmlFor="fotoPerfil"
              className={`group relative block ${edicaoPerm && "cursor-pointer"}`}
            >
              <img
                src={dados?.fotoPerfil || FotoPadrao}
                alt="Foto de perfil"
                className={`h-37.5 w-37.5 rounded-full border-8 object-cover shadow-[0_0_10px] shadow-gray-600 ${
                  tema?.temaEscuro ? "border-violet-950" : "border-slate-50"
                }`}
              />
              {edicaoPerm && <Overlay rounded="rounded-full" size={20} />}
            </label>

            {edicaoPerm && (
              <input
                id="fotoPerfil"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={mudarFoto}
              />
            )}
          </div>

          <div className="mt-4 ml-4 max-w-[75%] flex flex-col">
            <h1 className="text-[22px] font-semibold">{dados?.nome}</h1>

            <h2 className="text-[16px] font-semibold">@{dados?.nick}</h2>

            <div className="mt-4 flex items-center gap-2">
              <h2 className="text-[14px] font-semibold">Bio</h2>

              {edicaoPerm && (
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    setBio(dados?.bio ?? "");
                    setEditandoInfo(true);
                  }}
                >
                  <Pencil size={14}></Pencil>
                </button>
              )}
            </div>
            {editandoInfo ? (
              <div className="w-fit">
                <textarea
                  cols={20}
                  rows={5}
                  maxLength={500}
                  className={`text-violet-white rounded-lg border-2 shadow-[0_0_5px] shadow-gray-600 focus:outline focus:outline-white ${
                    tema?.temaEscuro
                      ? "border-violet-950 bg-violet-500"
                      : "bg-slate-100"
                  }`}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
                <div className="flex justify-end gap-2">
                  <button
                    className="cursor-pointer rounded-lg bg-red-900 px-4 py-1 text-sm text-white hover:bg-violet-950"
                    onClick={() => setEditandoInfo(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    className="cursor-pointer rounded-lg bg-violet-900 px-4 py-1 text-sm text-white hover:bg-violet-950"
                    onClick={editarBio}
                  >
                    Salvar
                  </button>
                </div>
              </div>
            ):(
              <div className="">
                <h2 className="text-sm">{dados?.bio}</h2>
              </div>
            )}
          </div>
        </div>

        {/* JOGOS */}
        <div
          className={`w-full border-t ${
            tema?.temaEscuro ? "border-violet-900" : "border-violet-100"
          }`}
        >
          <h1 className="px-12 pt-6 pb-4 text-2xl font-semibold">
            Jogos Adicionados à Lista
          </h1>

          {carregando && (
            <div className="flex justify-center py-20">
              <p className="text-xl font-semibold">Carregando jogos...</p>
            </div>
          )}

          <div className="grid gap-3 px-12 pb-4 md:grid-cols-3 lg:grid-cols-4">
            {jogos.slice(0, 4).map((jogo, index) => (
              <div
                key={jogo.id}
                className={` ${index >= 1 ? "hidden md:block" : ""} ${index >= 3 ? "md:hidden lg:block" : ""} overflow-hidden rounded-2xl border shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  tema?.temaEscuro
                    ? "border-violet-900 bg-[#211b2b]"
                    : "border-violet-100 bg-white"
                }`}
              >
                <div className="relative">
                  <img
                    src={jogo.background_image}
                    alt="#"
                    className="h-56 w-full object-cover"
                  />

                  <div className="absolute top-3 right-3 flex items-center gap-1 rounded-lg bg-black/75 px-2 py-1 text-white">
                    <Star size={17} fill="#F1C338" color="#F1C338" />
                    {jogo.rating}
                  </div>
                </div>

                <div className="p-5">
                  <h2 className="truncate text-xl font-bold">{jogo.name}</h2>

                  <div className="mt-4 flex items-center justify-between">
                    <span
                      className={`text-sm ${
                        tema?.temaEscuro ? "text-gray-400" : "text-gray-500"
                      }`}
                    ></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex w-full justify-end px-12 pb-6">
            <NavLink to={`/perfil/${nick}/jogos`}>
              <div className="flex gap-2 font-semibold hover:underline">
                <p className="text-right">Ver Todos</p>
                <ArrowRight />
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
