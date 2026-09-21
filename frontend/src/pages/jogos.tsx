import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star, X } from "lucide-react";
import CardItem from "../components/carditem";
import fortnite from "../assets/Fortnite_29_-_Cover_Art_-_Fortnite.png";
import minecraft from "../assets/Homepage_Discover-our-games_MC-Vanilla-KeyArt_864x864.jpg";
import gta from "../assets/Grand_Theft_Auto_V_capa.png";
import terraria from "../assets/Terraria_capa.png";

const joguinhos = [
  {
    id: 1,
    name: "Minecraft",
    image: minecraft,
    descricao: {
      um: "Jogo de exploração e construção em um mundo feito de blocos. O jogador pode coletar recursos, criar ferramentas, construir estruturas e enfrentar criaturas.",
      dois: "Jogo sandbox desenvolvido pela Mojang, focado em exploração, construção e sobrevivência. O jogador explora um mundo formado por blocos, coleta recursos, fabrica equipamentos e pode construir praticamente qualquer estrutura. Também possui diferentes modos e multiplayer.",
    },
    site: "https://pt.minecraft.wiki",
    estrelas: 4.2,
  },
  {
    id: 2,
    name: "GTA 5",
    image: gta,
    descricao: {
      um: "Jogo de mundo aberto que acompanha a história de três criminosos. Ele possui missões, veículos, exploração pela cidade e um modo online com diversas atividades.",
      dois: "Jogo de ação em mundo aberto desenvolvido pela Rockstar North. Ambientado em Los Santos, acompanha Michael, Franklin e Trevor em uma história envolvendo crimes e grandes assaltos.",
    },
    site: "https://gta.fandom.com/pt/wiki/Página_principal",
    estrelas: 4.25,
  },
  {
    id: 3,
    name: "Terraria",
    image: terraria,
    descricao: {
      um: "Jogo 2D de exploração, construção e sobrevivência. O jogador coleta recursos, fabrica equipamentos e enfrenta diversos inimigos e chefes.",
      dois: "Jogo sandbox 2D desenvolvido pela Re-Logic que mistura exploração, sobrevivência, construção e combate. O jogador coleta recursos, fabrica armas e equipamentos, constrói bases e explora diferentes biomas enquanto enfrenta inimigos e diversos chefes.",
    },
    site: "https://terraria.wiki.gg",
    estrelas: 4.2,
  },
  {
    id: 4,
    name: "Fortnite",
    image: fortnite,
    descricao: {
      um: "Jogo de ação conhecido principalmente pelo modo Battle Royale, no qual vários jogadores disputam até restar apenas um. Também possui construções, eventos e diferentes modos.",
      dois: "Jogo de ação e tiro desenvolvido pela Epic Games, conhecido principalmente pelo modo Battle Royale. Os jogadores competem em uma ilha, coletando armas e recursos para sobreviver. O jogo também possui diversos modos, construção, eventos.",
    },
    site: "https://fortnite.fandom.com/pt-br/wiki/Fortnite_Wiki",
    estrelas: 2.6,
  },
];

const API_KEY = "0bbafa70bc474534b89bd7b12e01ec53";

type Jogo = {
  id: number;
  name: string;
  descricao: {
    um: string;
    dois: string;
  };
  image: string;
  estrelas: number;
};

export default function Jogos() {
  const [atual, setAtual] = useState(0);
  const [animando, setAnimando] = useState(false);

  const anterior = () => {
    setAnimando(true);
    setTimeout(() => {
      setAtual((atual) => (atual === 0 ? joguinhos.length - 1 : atual - 1));

      setAnimando(false);
    }, 500);
  };

  const proximo = () => {
    setAnimando(true);
    setTimeout(() => {
      setAtual((atual) => (atual === joguinhos.length - 1 ? 0 : atual + 1));

      setAnimando(false);
    }, 500);
  };

  const [jogoSelecionado, setJogoSelecionado] = useState<Jogo | null>(null);
  const modal = useRef<HTMLDialogElement>(null);

  function abrirModal(jogo: Jogo) {
    setJogoSelecionado(jogo);
    modal.current?.showModal();
  }

  function fecharModal() {
    modal.current?.close();
  }

  return (
    <div className="">
      <div className="flex justify-center py-4">
        <h1 className="text-[40px] font-bold text-violet-900">
          Catálogo de Jogos
        </h1>
      </div>

      <div className="mb-4 flex items-center justify-center gap-4 md:hidden">
        <button
          className="h-fit rounded-2xl bg-violet-700 p-2 hover:bg-violet-800"
          onClick={anterior}
        >
          <ChevronLeft color="#fff" size={32} />
        </button>
        <div
          className={`transition-all duration-500 ease-in-out ${animando ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
        >
          <CardItem
            text="Saiba Mais"
            desc={joguinhos[atual].descricao.um}
            image={joguinhos[atual].image}
            name={joguinhos[atual].name}
            click={() => abrirModal(joguinhos[atual])}
          ></CardItem>
        </div>
        <button
          className="h-fit rounded-2xl bg-violet-700 p-2 hover:bg-violet-800"
          onClick={proximo}
        >
          <ChevronRight color="#fff" size={32} />
        </button>
      </div>

      <div className="hidden justify-center gap-[3%] px-40 pb-10 md:flex">
        {joguinhos.map((jogo) => (
          <div key={jogo.id}>
            <CardItem
              text="Saiba Mais"
              desc={jogo.descricao.um}
              image={jogo.image}
              name={jogo.name}
              click={() => abrirModal(jogo)}
            ></CardItem>
          </div>
        ))}
      </div>
      <dialog ref={modal}>
        <div className="fixed inset-0 m-auto h-[85vh] w-[90vw] rounded-2xl border-2 border-violet-900 bg-blue-50 p-8 shadow-xl shadow-gray-700 md:mt-25 md:h-[75vh] md:w-[60vw]">
          <button
            className="absolute right-4 flex justify-self-end rounded-[10px] border border-zinc-950 bg-violet-700 text-white hover:bg-violet-800"
            onClick={fecharModal}
          >
            <X size={30} />
          </button>
          <div className="flex h-full flex-col items-center justify-center md:flex-row md:gap-15">
            <img
              src={jogoSelecionado?.image}
              alt=""
              className="max-w-[80%] rounded-2xl border-2 border-violet-900 object-fill shadow-[0_0_10px] shadow-violet-900 md:w-[45%]"
            />
            <div className="flex h-full flex-1 flex-col justify-center gap-2 md:gap-4">
              <h1 className="mt-2 text-center text-3xl font-bold text-violet-950 md:text-5xl">
                {jogoSelecionado?.name}
              </h1>
              <p className="flex gap-1 self-center text-center font-bold">
                <Star color="#F1C338" />
                {jogoSelecionado?.estrelas}/5
              </p>
              <p className="text-center">{jogoSelecionado?.descricao.dois}</p>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}

