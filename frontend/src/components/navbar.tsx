import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Gamepad2, Menu } from "lucide-react";

function Navbar() {
  const estiloLink = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "underline p-[8px_6px] bg-violet-950 rounded-xl"
      : "p-[8px_6px] hover:bg-violet-950 rounded-xl";
  
  const [aberto, setAberto] = useState(false);
    
  return (
    <nav className="flex w-full items-center justify-between bg-violet-900 p-4 text-[18px] font-medium text-white shadow-[0_0_10px] shadow-gray-800">
      <div className="flex gap-2">
        <Link to="/" className="flex cursor-pointer gap-2 text-3xl select-none">
          Game Stream <Gamepad2 size={42} />
        </Link>
      </div>

      <div className="flex md:hidden">
        <button onClick={() => setAberto(!aberto)}>
          <Menu size={36} />
        </button>

        <div
          className={`fixed top-15 -right-px flex flex-col items-center gap-4 overflow-hidden rounded-bl-xl bg-violet-900 transition-all duration-500 ease-in-out md:hidden ${
            aberto ? "max-h-60 p-5 opacity-100" : "max-h-0 p-0 opacity-0"
          } `}
        >
          <NavLink className={estiloLink} end to="/">
            Inicio
          </NavLink>

          <NavLink className={estiloLink} to="/jogos">
            Jogos
          </NavLink>

          <NavLink className={estiloLink} to="/sobre">
            Sobre Mim
          </NavLink>
        </div>
      </div>

      <div className="hidden gap-6 md:flex">
        <NavLink className={estiloLink} end to="/">
          Inicio
        </NavLink>
        <p className="p-[8px_0] select-none">|</p>
        <NavLink className={estiloLink} to="/jogos">
          Jogos
        </NavLink>
        <p className="p-[8px_0] select-none">|</p>
        <NavLink className={estiloLink} to="/sobre">
          Sobre Mim
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
