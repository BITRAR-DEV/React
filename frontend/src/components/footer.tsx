import { Link } from "react-router-dom";
import { Gamepad2 } from "lucide-react";

function Footer() {
  return (
    <footer className="min-h-[20vh] bg-violet-800 shadow-[0_0_30px] shadow-gray-800 p-5">
        <div className="grid grid-cols-3">
            <div className="flex gap-1 text-3xl font-medium text-white">
                <Gamepad2 size={36} /> <h1>Game Stream</h1>
            </div>
            <div className=""> 
                Navegações
            </div>
            <div className="">
                Contato 
            </div>
        </div>
        <div className="text-white columns-[1/3]">
            &#169;
        </div>
    </footer>
  );
}

export default Footer;
