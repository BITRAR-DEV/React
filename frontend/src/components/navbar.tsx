import { Link } from "react-router-dom";
import { Gamepad2 } from "lucide-react";


function Navbar() {
  return (
    <nav className="flex items-center justify-center bg-violet-800 p-5 text-[18px] font-medium text-white shadow-[0_0_30px] shadow-gray-800">
      <div className="flex basis-full gap-2">
        <h1 className="text-4xl cursor-default select-none">Game Stream</h1> <Gamepad2 size={48} />
      </div>
      <div className="flex basis-full justify-end gap-6">
        <Link className="p-[8px_6px] hover:bg-violet-900 rounded-xl" to="/">Inicio</Link><p className="p-[8px_0] select-none">|</p><Link className="p-[8px_6px] hover:bg-violet-900 rounded-xl" to="/jogos">Jogos</Link><p className="p-[8px_0] select-none">|</p>
        <Link className="p-[8px_6px] hover:bg-violet-900 rounded-xl" to="/sobre">Sobre Mim</Link>
      </div>
    </nav>
  );
}

export default Navbar;
