import { NavLink } from "react-router-dom";

export default function Login() {
    return (
        <div className="flex justify-center items-center px-6 py-8">
            <div className="md:max-w-120 h-full border border-zinc-950 rounded-[15px] shadow-[0_1px_5px] shadow-zinc-950 p-6">
                <div className="flex justify-center items-center flex-col mb-6">
                    <h2 className="font-bold text-3xl mb-1 text-violet-950">Bem Vindo!</h2>
                    <p className="text-center text-lg"><strong>Logue</strong> ou <strong>Cadastre-se</strong> para ter acesso ao resto dos conteúdos</p>
                </div>
                <div className="flex flex-col gap-2 px-6">
                    <input type="email" className="border-2 border-violet-950 rounded-lg p-2" placeholder="Digite seu Email:"/>
                    <input type="password" className="border-2 border-violet-950 rounded-lg p-2" placeholder="Digite sua Senha:"/>
                    <button type="submit" className="flex justify-center text-white px-4 py-3 rounded-[13px] cursor-pointer mt-2 bg-violet-800 hover:bg-violet-900"><strong>Login</strong></button>
                    <div className="flex items-center text-gray-500">
                        <hr className="flex-1"/>
                        <p>Ou</p>
                        <hr className="flex-1"/>
                    </div>
                    <NavLink to={"/cadastro"} className="font-bold hover:underline text-violet-800">Cadastre-se aqui</NavLink>
                </div>
            </div>
        </div>
    );
}