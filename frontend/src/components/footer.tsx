import { Link } from "react-router-dom";
import { Gamepad2, Mail } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-violet-800">
        <div className="grid grid-cols-3 p-5">
            <div className="flex gap-1 text-2xl font-medium text-white cursor-default select-none">
                <Gamepad2 size={36} /> <h1>Game Stream</h1>
            </div>
            <div className="font-medium text-white"> 
                <h1 className="text-xl pb-2">Navegações</h1>
                <div className="flex flex-col gap-1.5">
                    <Link to="/" className="max-w-fit">Início</Link>
                    <Link to="/jogoss" className="max-w-fit">Jogos</Link>
                    <Link to="/sobre" className="max-w-fit">Sobre Mim</Link>
                </div>
            </div>
            <div className="font-medium text-white">
                <h1 className="text-xl pb-2">Contatos</h1> 
                <p className="flex gap-1"><Mail size={24}></Mail><a href="mailto:contato@gamestream.com">contato@gamestream.com</a></p>
            </div>
        </div>
        <div className="flex justify-center align-middle text-white columns-[1/-1] border-t-2 border-violet-900 p-2">
            <p>&#169; Todos direitos reservados à Game Stream Corporations.</p>
        </div>
    </footer>
  );
}

export default Footer;
