import { Link } from "react-router-dom";
import { Gamepad2, Mail } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-violet-900">
        <div className="grid md:grid-cols-3 py-3 gap-y-4 px-4">
            <div className="flex gap-1 text-[18px] font-medium text-white cursor-default select-none">
                <Gamepad2 size={26} /> <h1>Game Stream</h1>
            </div>
            <div className="font-medium text-white"> 
                <h1 className="pb-2">Navegações</h1>
                <div className="flex flex-col text-[12px] gap-1.5">
                    <Link to="/" className="max-w-fit">Início</Link>
                    <Link to="/jogos" className="max-w-fit">Jogos</Link>
                    <Link to="/sobre" className="max-w-fit">Sobre Mim</Link>
                </div>
            </div>
            <div className="font-medium text-white">
                <h1 className="pb-2">Contatos</h1> 
                <p className="flex text-[12px] gap-1"><Mail size={18}></Mail><a href="mailto:contato@gamestream.com">contato@gamestream.com</a></p>
            </div>
        </div>
        <div className="flex justify-center align-middle text-[12px] text-white columns-[1/-1] border-t-2 border-violet-950 p-2">
            <p>&#169; Todos direitos reservados à Game Stream Corporations.</p>
        </div>
    </footer>
  );
}

export default Footer;
