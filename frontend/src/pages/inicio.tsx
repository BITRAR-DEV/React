import { Link } from "react-router-dom";
import { Gamepad2 } from "lucide-react";
import Logo from "../assets/Logo.png";

function Inicio() {
  return (
    <div className="h-full grid grid-cols-2 px-6 my-14">
      <div className="flex flex-col justify-center m-8 gap-6">
        <div className="leading-12 font-[650]">
          <h2 className="text-[60px] select-none">Bem-Vindo à</h2>
          <h1 className="text-violet-900 text-7xl text-shadow-[0_0_3px_rgb(112_7_231)] select-none">Game Stream!</h1>
        </div>
        <div className="text-[18px] leading-12">
          <p className="leading-6.5">Aqui você encontra vários jogos grátis para jogar e se <br /> divertir com a melhor experiência de jogos da web.</p>
          <p>Entre abaixo em nosso catálogo e explore nossos jogos.</p>
        </div>
        <div className="flex flex-row">
          <Link className="flex gap-2 text-white px-4 py-3 rounded-[13px] cursor-pointer bg-violet-700 hover:bg-violet-800" to="/jogos"><><Gamepad2 size={24} />Explorar Catálago</></Link>
        </div>
      </div>
      <div className="flex justify-center">
        <img className="w-1/2 h-auto" src={Logo} alt="" />
      </div>
    </div>
  );
}

export default Inicio;
