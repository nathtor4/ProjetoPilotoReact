import { Link } from "react-router-dom";
import "./NavClientes.css";

export default function NavClientes() {
    return(
        <div className=" ">
            <div className="d-flex justify-content-between py-2 px-4 align-items-center border-bottom">
                <h3 className="texto-principal">Clientes</h3>
                <div className="">
                    <Link className="abas text-decoration-none border border-2 p-1 rounded-2 m-1" to="/clientes">
                        Cadastro
                    </Link>
                    <Link className="abas text-decoration-none border border-2 p-1 rounded-2 m-1" to="/clientes/pesquisa">
                        Pesquisa
                    </Link>
                </div>  
            </div>
        </div>
    )
}