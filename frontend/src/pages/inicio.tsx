import { Link } from "react-router-dom";
import { Gamepad2 } from "lucide-react";
import Logo from "../assets/Logo.png";

export default function Inicio() {
  return (
    <div className="h-full md:grid md:grid-cols-2 px-6 py-8">
      <div className="flex flex-col justify-center p-8 md:pl-50 gap-6">
        <div className="md:leading-12 font-[650]">
          <h2 className="text-[40px] md:text-[60px] select-none">Bem-Vindo à</h2>
          <h1 className="text-violet-900 text-7xl text-shadow-[0_0_3px_rgb(112_7_231)] select-none">Game Stream!</h1>
        </div>
        <div className="text-[18px]">
          <p className="md:leading-6.5">Aqui você encontra vários jogos grátis para jogar e se divertir com a melhor experiência de jogos da web.</p>
          <p className="mt-2">Entre abaixo em nosso catálogo e explore nossos jogos.</p>
        </div>
        <div className="flex flex-row">
          <Link className="flex gap-2 text-white px-4 py-3 rounded-[13px] cursor-pointer bg-violet-800 hover:bg-violet-900" to="/jogos"><><Gamepad2 size={24} />Explorar Catálago</></Link>
        </div>
      </div>
      <div className="hidden md:flex justify-center">
        <img className="w-1/2 h-full" src={Logo} alt="" />
      </div>
    </div>
  );
}
