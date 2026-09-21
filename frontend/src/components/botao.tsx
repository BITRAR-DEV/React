import type { ReactNode } from "react";

type BotaoProps = {
    texto: ReactNode;
    cor: string;
    hover?: string;
    link: string;
}

export default function Botao({texto, cor, hover, link}: BotaoProps) {
    return (
        <a href={link} className={`flex gap-2 ${cor} text-white px-4 py-3 rounded-[13px] ${hover} cursor-pointer`}>{texto}</a>
    )
}