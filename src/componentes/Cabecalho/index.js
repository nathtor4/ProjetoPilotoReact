import "./Cabecalho.css";
import logo from './logo_smed2.png';

export default function Cabecalho(){
    return(
        <div className="row m-0 p-0 border-bottom justify-content-between align-items-center">
            <div className="logo px-4 py-1 col-3 m-0 col-lg-3 col-md-3">
                <img className="h-50 w-auto d-inline-block p-0 m-0 imagem-logo" src={logo} alt="logo"></img>
            </div>
            <div className=" col-8 mx-0 col-lg-8 col-md-8">
                <h3 className="text-center titulo m-0">Projeto Piloto - FrontEnd</h3>
            </div>
            <div className="col-1 m-0 px-0 col-lg-1 col-md-1 text-center">    
                <button type="button" className="btn botao-sair">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                        <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"/>
                    </svg>
                </button>
            </div>
        </div>
    )
}