import MenuLateralLink from "componentes/MenuLateralLink";
import "./MenuLateral.css";
import linksMenuLateral from "json/linksMenuLateral.json";

export default function MenuLateral() {
    return (
        <div className="sidebar mx-0 my-0 pt-3 min-vw-30 w-100 h-100" id="side_nav" >  
            <nav className="nav .navbar-expand flex-column p-3 m-0">
                <h1 className="fs-5"><span className="px-4 texto-menu">Menu</span></h1>
                <hr className="traco-menu m-0"/>
                {linksMenuLateral.map((link) => (
                    <div key={link.id}>
                        <MenuLateralLink
                            url={link.url}
                            viewBox={link.viewBox}
                            caminhoIcones={link.caminhoIcones}
                            nomeLink={link.nomeLink} />
                    </div>
                    ))
                }
            </nav> 
        </div>
    )
}