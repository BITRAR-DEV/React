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
    descricao:
      "jogo de exploração e construção em um mundo feito de blocos. O jogador pode coletar recursos, criar ferramentas, construir estruturas e enfrentar criaturas.",
    site: "https://pt.minecraft.wiki",
  },
  {
    id: 2,
    name: "GTA 5",
    image: gta,
    descricao:
      "jogo de mundo aberto que acompanha a história de três criminosos. Ele possui missões, veículos, exploração pela cidade e um modo online com diversas atividades.",
    site: "https://gta.fandom.com/pt/wiki/Página_principal",
  },
  {
    id: 3,
    name: "Terraria",
    image: terraria,
    descricao:
      "jogo 2D de exploração, construção e sobrevivência. O jogador coleta recursos, fabrica equipamentos e enfrenta diversos inimigos e chefes.",
    site: "https://terraria.wiki.gg",
  },
  {
    id: 4,
    name: "Fortnite",
    image: fortnite,
    descricao:
      "jogo de ação conhecido principalmente pelo modo Battle Royale, no qual vários jogadores disputam até restar apenas um. Também possui construções, eventos e diferentes modos.",
    site: "https://fortnite.fandom.com/pt-br/wiki/Fortnite_Wiki",
  },
];

function Jogos() {
  return (
    <div>
      <div className="mt-8 mb-4 flex justify-center">
        <h1 className="text-[40px] font-bold text-violet-900">
          Catálogo de Jogos
        </h1>
      </div>
      <div className="flex justify-around">
        {joguinhos.map((jogo) => (
          <div key={jogo.id}>
            <CardItem
              text="Saiba Mais"
              desc={jogo.descricao}
              image={jogo.image}
              link={jogo.site}
              name={jogo.name}
            ></CardItem>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Jogos;
