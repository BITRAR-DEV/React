import { Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function MeuPerfil() {
  useEffect(() => {
      document.title = "Perfil | Game Stream";
    }, []);
  const auth = useContext(AuthContext);
  if (auth?.carregando) {
    return <p>Carregando...</p>;
  }
  
   if (!auth?.usuario) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Navigate
      to={`/perfil/${auth.usuario.nick}`}
      replace
    />
  );
}
