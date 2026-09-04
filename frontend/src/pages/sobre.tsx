import { Gamepad2, CodeXml, Pencil, Book, User } from "lucide-react";
import Foto from "../assets/435494488_1094963621543709_8267387487772838812_n.jpg";


function Sobre() {
    return (
        <main>
            <div className="flex flex-row justify-around m-[40px_0] text-violet-900">
                <div className="w-100">
                    <img src={Foto} alt="" className="rounded-[50%] size-87.5" />
                </div>
                <div className="w-120 flex justify-center flex-col text-center">
                    <h1 className="flex justify-center gap-2 text-violet-900 font-bold text-[28px]"> <User size={32} color="#000"/> Sobre Mim</h1>
                    <p className="text-[24px]">Meu nome é Samuel, tenho 17 anos e moro em São Paulo. Gosto de tecnologias e jogos. Atualmente estou fazendo curso de TI, estamos quase acabando e logo logo entrarei em uma faculdade de ADS!</p>
                </div>
            </div>
            <div className="grid grid-cols-4 m-5 text-violet-900">
                <div className="flex flex-col items-center w-60 border border-zinc-950 rounded-[10px] p-2 shadow-[0_1px_5px] shadow-gray-700">
                    < Gamepad2 size={32}/>
                    <h1 className="font-bold text-[20px]">Gamer</h1>
                    <p className="text-center">Gosto de jogar jogos de vídeogame. Inclusive criei este site para compartilhar esse mundo com outras pessoas!</p>
                </div>
                <div className="flex flex-col items-center w-60 border border-zinc-950 rounded-[10px] p-2 shadow-[0_1px_5px] shadow-gray-700">
                    < CodeXml size={32}/>
                    <h1 className="font-bold text-[20px]">Desenvolvedor</h1>
                    <p className="text-center">Desenvolvo aplicações para web (Como essa), aplicações para sistemas, alguns jogos, etc.</p>
                </div>
                <div className="flex flex-col items-center w-60 border border-zinc-950 rounded-[10px] p-2 shadow-[0_1px_5px] shadow-gray-700">
                    < Book size={32}/>
                    <h1 className="font-bold text-[20px]">Estudante</h1>
                    <p className="text-center">Estou estudando e pretendo continuar estudando na minha área de desenvolvimento.</p>
                </div>
                <div className="flex flex-col items-center w-60 border border-zinc-950 rounded-[10px] p-2 shadow-[0_1px_5px] shadow-gray-700">
                    < Pencil size={32}/>
                    <h1 className="font-bold text-[20px]">Artista</h1>
                    <p className="text-center">Além de jogos como hobby, gosto de fazer desenhos artisticos, como graffiti, personagens, letreiros, etc.</p>
                </div>
            </div>
        </main>
    )
}

export default Sobre;