import { NavLink } from "react-router-dom"
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Cadastro() {
    const [mostrar, setMostrar] = useState(false);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [csenha, setCSenha] = useState("");
    const [senhaerro, setErro] = useState(false);
    
    const erroEstilo = senhaerro ? "bg-red-100" : "bg-none"

    function cadastrar(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        if (senha != csenha) {
            setErro(true);
            return
        } else {
            setErro(false);
        };

        console.log(nome);
        console.log(email);
        console.log(senha);
        console.log(csenha);
    };

    return (
    <div className="flex justify-center items-center px-6 py-8">
        <div className="md:w-120 h-full border border-zinc-950 rounded-[15px] shadow-[0_1px_5px] shadow-zinc-950 p-6">
            <div className="flex justify-center items-center flex-col mb-6">
                <h2 className="font-bold text-3xl mb-1 text-violet-950">Bem Vindo!</h2>
                <p className="text-center text-lg">Para <strong>cadastrar-se</strong>, insira as informações abaixo.</p>
            </div>
            <div className="flex flex-col gap-2 px-6">
                <form onSubmit={cadastrar} className="flex flex-col gap-2">
                    <input type="text" required value={nome} onChange={(e) => setNome(e.target.value)} className="border-2 border-violet-950 rounded-lg p-2" placeholder="Digite seu Nome Completo:" />
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="border-2 border-violet-950 rounded-lg p-2" placeholder="Digite seu Email:"/>
                    <div className="relative">
                        <input type={mostrar? "text" : "password"} required minLength={8} value={senha} onChange={(e) => setSenha(e.target.value)} className={`w-full border-2 border-violet-950 rounded-lg p-2 ${erroEstilo}`} placeholder="Digite sua Senha:"/>
                        <button type="button" onClick={() => setMostrar(!mostrar)} className="absolute right-3 top-1/2 -translate-y-1/2">{mostrar? <Eye color="#2f0d68"/> : <EyeOff color="#2f0d68"/>}</button>
                    </div>
                    <div>
                        <input type={mostrar? "text" : "password"} required value={csenha} onChange={(e) => setCSenha(e.target.value)} className={`w-full border-2 border-violet-950 rounded-lg p-2 ${erroEstilo}`} placeholder="Confirme sua Senha:"/>
                        {senhaerro && <p className="pl-2 text-red-600">eoi</p>}
                    </div>
                    <button type="submit" className="text-white px-4 py-3 rounded-[13px] cursor-pointer mt-2 bg-violet-800 hover:bg-violet-900"><strong>Login</strong></button>
                </form>
                <div className="flex items-center text-gray-500 select-none">
                    <hr className="flex-1"/>
                    <p className="mx-1.5 mb-0.5">Já tem um cadastro?</p>
                    <hr className="flex-1"/>
                </div>
                <NavLink to={"/login"} className="w-fit font-bold hover:underline text-violet-800">Logue aqui!</NavLink>
            </div>
        </div>
    </div>
    )
}