import Botao from "./botao";

type CardInfos = {
    name: string;
    image: string;
    desc: string;
    text: string;
    link: string
}

function CardItem({name, image, desc, text, link}: CardInfos) {
    return (
        <div className="flex flex-col items-center w-55 h-full border border-zinc-950 rounded-[15px] shadow-[0_1px_5px] shadow-zinc-950 p-[20px_10px] transition-[scale] hover:scale-105">
            <img src={image} alt="" className="size-40 mb-2"/>
            <h2 className="font-bold text-[1.2em] mb-1 text-violet-950">{name}</h2>
            <p className="text-center text-[0.9em]">{desc}</p>
            <div className="flex flex-col mt-auto p-1">
                <Botao cor="bg-violet-700" hover="hover:bg-violet-800" texto={text} link={link}></Botao>
            </div>
        </div>
    )
}

export default CardItem;