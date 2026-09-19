import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
    const [mostrar, setMostrar] = useState(false);

    return (
        <div className="flex justify-center items-center px-6 py-8">
            <div className="md:w-120 h-full border border-zinc-950 rounded-[15px] shadow-[0_1px_5px] shadow-zinc-950 p-6">
                <div className="flex justify-center items-center flex-col mb-6">
                    <h2 className="font-bold text-3xl mb-1 text-violet-950">Bem Vindo!</h2>
                    <p className="text-center text-lg"><strong>Logue</strong> ou <strong>Cadastre-se</strong> para ter acesso ao resto dos conteúdos</p>
                </div>
                <div className="flex flex-col gap-2 px-6">
                    <input type="email" className="border-2 border-violet-950 rounded-lg p-2" placeholder="Digite seu Email:"/>
                    <div className="relative">
                        <input type={mostrar? "text" : "password"} className="w-full border-2 border-violet-950 rounded-lg p-2" placeholder="Digite sua Senha:"/>
                        <button type="button" onClick={() => setMostrar(!mostrar)} className="absolute right-3 top-1/2 -translate-y-1/2">{mostrar? <Eye color="#2f0d68"/> : <EyeOff color="#2f0d68"/>}</button>
                    </div>
                    <button type="submit" className="text-white px-4 py-3 rounded-[13px] cursor-pointer mt-2 bg-violet-800 hover:bg-violet-900"><strong>Login</strong></button>
                    <div className="flex items-center text-gray-500 select-none">
                        <hr className="flex-1"/>
                        <p className="mx-1.5 mb-0.5">Não tem um cadastro?</p>
                        <hr className="flex-1"/>
                    </div>
                    <NavLink to={"/cadastro"} className="w-fit font-bold hover:underline text-violet-800">Cadastre-se aqui</NavLink>
                </div>
            </div>
        </div>
    );
}