import { Link } from "react-router-dom";
import { Gamepad2, Mail } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Footer() {
  const auth = useContext(AuthContext);
  return (
    <footer className="bg-violet-950">
      <div className="grid gap-y-4 px-4 py-3 md:grid-cols-3">
        <div className="flex cursor-default gap-1 text-[18px] font-medium text-white select-none">
          <Gamepad2 size={26} /> <h1>Game Stream</h1>
        </div>
        <div className="font-medium text-white">
          <h1 className="pb-2">Navegações</h1>
          <div className="flex flex-col gap-1.5 text-[12px]">
            <Link to="/" className="max-w-fit">
              Início
            </Link>
            <Link to="/jogos" className="max-w-fit">
              Jogos
            </Link>
            {auth?.usuario ? (
              <Link
                className="max-w-fit"
                to={`/perfil/${auth.usuario.nick}`}
              >
                Perfil
              </Link>
            ) : (
              <Link className="max-w-fit" to="/login">
                Login
              </Link>
            )}
          </div>
        </div>
        <div className="font-medium text-white">
          <h1 className="pb-2">Contatos</h1>
          <p className="flex gap-1 text-[12px]">
            <Mail size={18}></Mail>
            <a href="mailto:contato@gamestream.com">contato@gamestream.com</a>
          </p>
        </div>
      </div>
      <div className="flex columns-[1/-1] justify-center border-t-2 border-violet-950 p-2 align-middle text-[12px] text-white">
        <p>&#169; Todos direitos reservados à Game Stream Corporations.</p>
      </div>
    </footer>
  );
}
