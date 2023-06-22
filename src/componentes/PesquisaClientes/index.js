import CampoFormulario from "componentes/CampoFormulario";
import "./PesquisaClientes.css";

import InputMask from 'react-input-mask';
import TabelaPesquisa from "componentes/TabelaPesquisa";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function PesquisaClientes() {

    const [clientes, setClientes] = useState([]);

    const getClientes = async () => {
        try {
            const resposta = await axios.get("https://contratos.smedtecnologia.com.br/contratos-service/estag-clientes/all");
            const data = resposta.data;
            console.log(data);

            setClientes(data);

        } catch (error) {
            console.log(error);
            
        }
    };

    useEffect( () => {
        getClientes();
    },[]);

    const [pesquisaNome, setPesquisaNome] = useState("");
    const [pesquisaCPF, setPesquisaCPF] = useState("");
    const [clientesFiltrados, setClientesFiltrados] = useState([]);

    const aoPesquisar = (e) => {   
        e.preventDefault();

        const clientesPesquisados = (
            clientes.filter((cliente) => (
                cliente.nome.toLowerCase().includes(pesquisaNome.toLowerCase()) && cliente.cpf.includes(pesquisaCPF)
            ))
        )
        return setClientesFiltrados(clientesPesquisados)
    };

    const aoDeletar = (id) => {
        axios.delete(`https://contratos.smedtecnologia.com.br/contratos-service/estag-clientes/${id}`)
        .then(response => {
            console.log('Item excluído com sucesso');
            setClientes(clientes.filter((cliente) => cliente.id !== id));
            setClientesFiltrados(clientesFiltrados.filter((cliente) => cliente.id !== id));
        }).catch(error => {
            console.error('Erro ao excluir item:', error);
        })
    };

    return(
        <>
            <form className="my-3 mx-5" data-formulario >
                <CampoFormulario 
                    tituloCampo="Nome:"
                    id="name"
                    tagInput= {<input 
                                    type="text" 
                                    id="name" 
                                    className="form-control"
                                    autoComplete="off"
                                    value={pesquisaNome}
                                    onChange={(e) => setPesquisaNome(e.target.value)}
                                >
                                </input>}
                />    

                <CampoFormulario 
                    tituloCampo="CPF:"
                    id="CPF"
                    tagInput= {<InputMask 
                                    type="text" 
                                    id="CPF" 
                                    className="form-control"
                                    autoComplete="off"
                                    mask={"999.999.999-99"}
                                    value={pesquisaCPF}
                                    onChange={(e) => setPesquisaCPF(e.target.value)}
                                >
                                </InputMask>}
                />
                    
                <div className="d-flex justify-content-md-end m-1">
                <button 
                    type="search" 
                    className="btn btn-primary botao button-verificador"
                    onClick={aoPesquisar}
                >
                    Pesquisar
                </button> 
                </div>
            </form>   
            
            <TabelaPesquisa 
                camposPesquisados={clientesFiltrados.map((cliente) => (
                    <tr key={cliente.id}>
                        <td className="p-0 m-0 align-middle text-center">{cliente.nome}</td>
                        <td className="p-0 m-0 align-middle text-center">{cliente.cpf}</td>
                        <td className="p-0 m-0 align-middle text-center">{cliente.telefone}</td>
                        <td className="p-0 m-0 align-middle text-center">{cliente.email}</td>
                        <td className="p-0 m-0 align-middle text-center">
                            <button className="btn border-0"
                                onClick={() => aoDeletar(cliente.id)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                                </svg>  
                            </button>
                        </td>
                        <td> 
                            <Link className="border-0"
                                to={`/clientes/${cliente.id}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                    <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/>
                                </svg> 
                            </Link>                      
                        </td>
                    </tr>
                ))}
            />   
        </>
    )
}