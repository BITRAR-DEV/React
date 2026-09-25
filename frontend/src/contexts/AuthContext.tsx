import { createContext, useState, useEffect } from "react";

const api = import.meta.env.VITE_API_URL;

type Usuario = {
  id: number;
  nome: string;
  email: string;
  nick: string;
};

type AuthContextType = {
  usuario: Usuario | null;
  setUsuario: React.Dispatch<React.SetStateAction<Usuario | null>>;
};


export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  async function verificar(){
    try {
        const resposta = await fetch(`${api}/me`, {
            credentials: "include"
        })
  
        const dados = await resposta.json();
  
        if (resposta.ok) {
          setUsuario(dados);
        }
  
        console.log(dados)
    } catch (error) {
        const mensagem =
        error instanceof Error ? error.message : "Erro inesperado!";
        console.log(mensagem)
    }
  }
  
  useEffect(() => {
    verificar();
  }, []);
  return (
    <AuthContext value={{ usuario, setUsuario }}>
      {children}
    </AuthContext>
  );
}
