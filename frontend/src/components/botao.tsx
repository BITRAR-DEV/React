import type { ReactNode } from "react";

type BotaoProps = {
    texto: ReactNode;
    cor: string;
    hover?: string
}

function Botao({texto, cor, hover}: BotaoProps) {
    return (
        <button className={`flex gap-2 ${cor} text-white px-4 py-3 rounded-[13px] ${hover}`}>{texto}</button>
    )
}

export default Botao;