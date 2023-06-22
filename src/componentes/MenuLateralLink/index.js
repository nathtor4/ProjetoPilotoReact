import { Link } from "react-router-dom";
import "./MenuLateralLink.css";

export default function MenuLateralLink({url, viewBox, caminhoIcones, nomeLink}){
    return(
        <Link className="nav-link texto-menu-link" aria-current="page" to={url}> 
                <svg className="px-2" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox={viewBox}>
                    <path d={caminhoIcones}/>
                </svg>
                {nomeLink}
        </Link>
    )
}