import { Gamepad2, CodeXml, Pencil, Book, User } from "lucide-react";
import Foto from "../assets/435494488_1094963621543709_8267387487772838812_n.jpg";
import { useState, useEffect } from "react";

export default function Sobre() {
  const [atual, setAtual] = useState(0);

  const cards = [
    {
      id: 1,
      icone: <Gamepad2 size={32} />,
      titulo: "Gamer",
      paragrafo: "Gosto de jogar jogos de vídeogame. Inclusive criei este site para compartilhar esse mundo com outras pessoas!"
    },
    {
      id: 2,
      icone: <CodeXml size={32} />,
      titulo: "Desenvolvedor",
      paragrafo: "Desenvolvo aplicações para web (Como essa), aplicações para sistemas, alguns jogos, etc."
    },
    {
      id: 3,
      icone: <Book size={32} />,
      titulo: "Estudante",
      paragrafo: "Sou estudante de TI no Curso Técnico em Informática do Senac Salto."
    },
    {
      id: 4,
      icone: <Pencil size={32} />,
      titulo: "Artista",
      paragrafo: "Além de jogos como hobby, gosto de fazer desenhos artisticos, como graffiti, personagens, letreiros, etc."
    },
  ]

  useEffect(() => {
    const intervalo = setInterval(() => {
      setAtual((anterior) => (anterior + 1) % 4)
    }, 3000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="px-10">
      <div className="py-10 flex flex-col md:flex-row justify-center items-center gap-[10%] gap-y-6 text-violet-900">
        <div className="w-70 md:w-100">
          <img src={Foto} alt="" className="size-70 rounded-[50%]" />
        </div>
        <div className="flex md:w-120 flex-col justify-center text-center">
          <h1 className="flex justify-center gap-2 text-[24px] md:text-[28px] font-bold text-violet-900">
            <User size={32} color="#000" /> Sobre Mim
          </h1>
          <p className="text-[20px] md:text-[24px]">
            Meu nome é Samuel, tenho 17 anos e moro em São Paulo. Gosto de
            tecnologias e jogos. Atualmente estou fazendo curso de TI, estamos
            quase acabando e logo logo entrarei em uma faculdade de ADS!
          </p>
        </div>
      </div>

      <div className="md:hidden p-5 mb-10 overflow-hidden">
        <div
          className="gap-10 flex transition-transform duration-500 text-violet-900"
          style={{
            transform: `translateX(calc(-${atual * 100}% - ${atual * 40}px))`,
          }}
        >
          {cards.map((card) => (
          <div key={card.id} className="bg-blue-50 min-w-full md:min-w-0 md:w-60 flex flex-col items-center rounded-[10px] border border-zinc-950 p-2 shadow-[0_1px_5px] shadow-gray-700">
            {card.icone}
            <h1 className="text-[20px] font-bold">{card.titulo}</h1>
            <p className="text-center">
              {card.paragrafo}
            </p>
          </div>
        ))}
        </div>
      </div>

      <div className="hidden p-5 gap-10 md:flex justify-center md:gap-[2%] text-violet-900">
        {cards.map((card) => (
          <div key={card.id} className="bg-blue-50 min-w-full md:min-w-0 md:w-60 flex flex-col items-center rounded-[10px] border border-zinc-950 p-2 shadow-[0_1px_5px] shadow-gray-700">
            {card.icone}
            <h1 className="text-[20px] font-bold">{card.titulo}</h1>
            <p className="text-center">
              {card.paragrafo}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}