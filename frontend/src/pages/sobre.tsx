import { Gamepad2, CodeXml, Pencil, Book, User } from "lucide-react";
import Foto from "../assets/435494488_1094963621543709_8267387487772838812_n.jpg";

function Sobre() {
  return (
    <div className="px-20">
      <div className="py-10 flex flex-row justify-around text-violet-900">
        <div className="w-100">
          <img src={Foto} alt="" className="size-87.5 rounded-[50%]" />
        </div>
        <div className="flex w-120 flex-col justify-center text-center">
          <h1 className="flex justify-center gap-2 text-[28px] font-bold text-violet-900">
            {" "}
            <User size={32} color="#000" /> Sobre Mim
          </h1>
          <p className="text-[24px]">
            Meu nome é Samuel, tenho 17 anos e moro em São Paulo. Gosto de
            tecnologias e jogos. Atualmente estou fazendo curso de TI, estamos
            quase acabando e logo logo entrarei em uma faculdade de ADS!
          </p>
        </div>
      </div>
      <div className="p-5 grid grid-cols-4 text-violet-900">
        <div className="flex w-60 flex-col items-center rounded-[10px] border border-zinc-950 p-2 shadow-[0_1px_5px] shadow-gray-700">
          <Gamepad2 size={32} />
          <h1 className="text-[20px] font-bold">Gamer</h1>
          <p className="text-center">
            Gosto de jogar jogos de vídeogame. Inclusive criei este site para
            compartilhar esse mundo com outras pessoas!
          </p>
        </div>
        <div className="flex w-60 flex-col items-center rounded-[10px] border border-zinc-950 p-2 shadow-[0_1px_5px] shadow-gray-700">
          <CodeXml size={32} />
          <h1 className="text-[20px] font-bold">Desenvolvedor</h1>
          <p className="text-center">
            Desenvolvo aplicações para web (Como essa), aplicações para
            sistemas, alguns jogos, etc.
          </p>
        </div>
        <div className="flex w-60 flex-col items-center rounded-[10px] border border-zinc-950 p-2 shadow-[0_1px_5px] shadow-gray-700">
          <Book size={32} />
          <h1 className="text-[20px] font-bold">Estudante</h1>
          <p className="text-center">
            Estou estudando e pretendo continuar estudando na minha área de
            desenvolvimento.
          </p>
        </div>
        <div className="flex w-60 flex-col items-center rounded-[10px] border border-zinc-950 p-2 shadow-[0_1px_5px] shadow-gray-700">
          <Pencil size={32} />
          <h1 className="text-[20px] font-bold">Artista</h1>
          <p className="text-center">
            Além de jogos como hobby, gosto de fazer desenhos artisticos, como
            graffiti, personagens, letreiros, etc.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Sobre;
