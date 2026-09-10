import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
      um: "jogo de exploração e construção em um mundo feito de blocos. O jogador pode coletar recursos, criar ferramentas, construir estruturas e enfrentar criaturas.",
      dois: "",
    }, 
    site: "https://pt.minecraft.wiki",
  },
  {
    id: 2,
    name: "GTA 5",
    image: gta,
    descricao: {
      um: "jogo de mundo aberto que acompanha a história de três criminosos. Ele possui missões, veículos, exploração pela cidade e um modo online com diversas atividades.",
      dois: "",
    },
    site: "https://gta.fandom.com/pt/wiki/Página_principal",
  },
  {
    id: 3,
    name: "Terraria",
    image: terraria,
    descricao: {
      um: "jogo 2D de exploração, construção e sobrevivência. O jogador coleta recursos, fabrica equipamentos e enfrenta diversos inimigos e chefes.",
      dois: "",
    },
    site: "https://terraria.wiki.gg",
  },
  {
    id: 4,
    name: "Fortnite",
    image: fortnite,
    descricao: {
      um: "jogo de ação conhecido principalmente pelo modo Battle Royale, no qual vários jogadores disputam até restar apenas um. Também possui construções, eventos e diferentes modos.",
      dois: ""
    },
    site: "https://fortnite.fandom.com/pt-br/wiki/Fortnite_Wiki",
  },
];

type Jogo = {
  id: number;
  name: string;
  descricao: {
    um: string;
    dois: string;
  };
  image: string;
};

function Jogos() {
  const [atual, setAtual] = useState(0);

  const anterior = () => {
    setAtual((atual) =>
      atual === 0 ? joguinhos.length - 1 : atual - 1
    );
  };

  const proximo = () => {
    setAtual((atual) =>
      atual === joguinhos.length - 1 ? 0 : atual + 1
    );
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
      <div className="py-4 flex justify-center">
        <h1 className="text-[40px] font-bold text-violet-900">
          Catálogo de Jogos
        </h1>
      </div>

      <div className="flex md:hidden justify-center items-center gap-4">
        <button className="bg-violet-700 h-fit p-2 rounded-2xl hover:bg-violet-800" onClick={anterior}><ChevronLeft color="#fff" size={32}/></button>
        <CardItem
          text="Saiba Mais"
          desc={joguinhos[atual].descricao.um}
          image={joguinhos[atual].image}
          name={joguinhos[atual].name}
        ></CardItem>
        <button className="bg-violet-700 h-fit p-2 rounded-2xl hover:bg-violet-800" onClick={proximo}><ChevronRight color="#fff" size={32}/></button>
      </div>

      <div className="hidden md:flex justify-center gap-[3%] px-40 pb-10">
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
        <div className="fixed inset-0 m-auto w-[60vw] h-[75vh] bg-blue-50 rounded-2xl border-2 border-violet-900 shadow-xl shadow-gray-700 p-10">
          <div className="h-full flex justify-center items-center gap-15">
            <img src={jogoSelecionado?.image} alt="" className="w-1/2 rounded-2xl border-2 border-violet-900 shadow-[0_0_10px] shadow-violet-900"/>
            <div className="flex flex-col justify-around h-full gap-4 flex-1">
              <h1 className="text-5xl font-bold text-center text-violet-950">{jogoSelecionado?.name}</h1>
              <p>{jogoSelecionado?.descricao.um}</p>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Jogos;
