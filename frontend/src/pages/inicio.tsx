import { Link } from "react-router-dom";
import { Gamepad2 } from "lucide-react";
import Logo from "../assets/Logo.png";
import { useTema } from "../contexts/ThemeContext";
import { useEffect } from "react";

export default function Inicio() {
  useEffect(() => {
    document.title = "Início | Game Stream";
  }, []);
  const tema = useTema();

  return (
    <div
      className={`min-h-screen px-6 py-8 transition-colors duration-300 ${
        tema?.temaEscuro
          ? "bg-[#17131f] text-white"
          : "bg-blue-100 text-violet-950"
      }`}
    >
      <div className="md:grid md:grid-cols-2">
        <div className="flex flex-col justify-center gap-6 p-8 md:pl-50">
          <div className="font-[650] md:leading-12">
            <h2 className="text-[40px] select-none md:text-[60px]">
              Bem-Vindo à
            </h2>

            <h1 className="text-7xl text-violet-900 select-none text-shadow-[0_0_3px_rgb(112_7_231)]">
              Game Stream!
            </h1>
          </div>

          <div className="text-[18px]">
            <p className="font-semibold md:leading-6.5">
              Encontre, salve e compartilhe seus jogos favoritos.
            </p>

            <p className="mt-2">
              Explore novos títulos, monte sua própria coleção e personalize seu
              perfil para mostrar os jogos que fazem parte da sua história.
            </p>
          </div>

          <div className="flex flex-row">
            <Link
              className="flex cursor-pointer gap-2 rounded-[13px] bg-violet-800 px-4 py-3 text-white hover:bg-violet-900"
              to="/jogos"
            >
              <Gamepad2 size={24} />
              Explorar Catálogo
            </Link>
          </div>
        </div>

        <div className="hidden justify-center md:flex">
          <img className="h-full w-1/2" src={Logo} alt="" />
        </div>
      </div>
    </div>
  );
}
