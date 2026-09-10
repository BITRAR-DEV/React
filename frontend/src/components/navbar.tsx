import { Link, NavLink } from "react-router-dom";
import { Gamepad2 } from "lucide-react";


function Navbar() {
  const estiloLink = ({ isActive }: { isActive: boolean }) =>
        isActive
            ? "underline p-[8px_6px] bg-violet-900 rounded-xl"
            : "p-[8px_6px] hover:bg-violet-900 rounded-xl";

  return (
    <nav className="flex items-center justify-between bg-violet-800 p-4 text-[18px] font-medium text-white shadow-[0_0_10px] shadow-gray-800 w-full">
      <div className="flex gap-2">
        <Link to="/" className="text-3xl flex gap-2 cursor-pointer select-none">Game Stream <Gamepad2 size={42  } /></Link> 
      </div>


      <div className="hidden md:flex gap-6">
        <NavLink className={estiloLink} end to="/">Inicio</NavLink>
        <p className="p-[8px_0] select-none">|</p>
        <NavLink className={estiloLink} to="/jogos">Jogos</NavLink>
        <p className="p-[8px_0] select-none">|</p>
        <NavLink className={estiloLink} to="/sobre">Sobre Mim</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
