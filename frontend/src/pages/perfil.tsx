import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Perfil(){
    const auth = useContext(AuthContext);
    return (
        <div>
            {auth?.usuario?.nome}
            <div>
                {auth?.usuario?.email}
            </div>
        </div>
    );
}