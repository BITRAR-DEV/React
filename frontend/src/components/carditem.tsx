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
        <div className="flex flex-col items-center w-65 h-120 border border-zinc-950 rounded-[15px] shadow-[0_1px_5px] shadow-zinc-950 p-[20px_10px] transition-[scale] hover:scale-105">
            <img src={image} alt="" className="size-48 mb-2"/>
            <h2 className="font-bold text-xl mb-1 text-violet-950">{name}</h2>
            <p className="text-center">{desc}</p>
            <div className="flex flex-col mt-auto">
                <Botao cor="bg-violet-700" hover="hover:bg-violet-800" texto={text} link={link}></Botao>
                
            </div>
        </div>
    )
}

export default CardItem;