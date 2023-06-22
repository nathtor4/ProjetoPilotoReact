import Cabecalho from "componentes/Cabecalho";
import MenuLateral from "componentes/MenuLateral";
import Rodape from "componentes/Rodape";
import { Outlet } from "react-router-dom";

export default function PaginaBase() {
    return(
        <main>
            <Cabecalho />
            <div className="row m-0 p-0 ">
                <div className="col-3 m-0 p-0 col-lg-3 col-md-3">
                    <MenuLateral />
                </div>
                <div className="col-9 m-0 p-2 col-lg-9 col-md-9">
                    <Outlet />
                </div>
            </div>
            <Rodape />
        </main>
    )
}