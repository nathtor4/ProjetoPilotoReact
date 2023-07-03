import CampoFormulario from "componentes/CampoFormulario";
import CampoFormularioCheckbox from "componentes/CampoFormularioCheckbox";
import "./EditarClientes.css";

import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

import {CPFValido} from "componentes/ValidaCPF";

import InputMask from 'react-input-mask';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function EditarClientes() {

    const {id} = useParams();
    const navigate = useNavigate();

    const schemaDeValidacao = yup.object({
        nome: yup.string().required("Campo obrigatório").min(3, "Mínimo 3 caracteres"),
        telefone: yup.string().nullable().required("Campo obrigatório").min(11, "Telefone inválido").max(15, "Telefone inválido").matches(/\(?[0-9]{2}\)?[\s][0-9]{5}-?[0-9]{4}/, "Formato inválido"),
        email: yup.string().required("Campo obrigatório").email("E-mail inválido"),
        cpf: yup.string().nullable().required("Campo obrigatório").min(11, "CPF inválido")
        .max(14, "CPF inválido")
        .test('validacaoCPF', 'CPF inválido', CPFValido),
        checkboxes: yup.array().required('Selecione pelo menos uma opção').min(1, 'Selecione pelo menos uma opção').transform((value) => (Array.isArray(value) ? value : [])),
    })

    const {handleSubmit, register, formState: { errors }, reset} = useForm({
        resolver: yupResolver(schemaDeValidacao)
    })

    const [cpfValor, setCPFValor] = useState("");
    const [telefoneValor, setTelefoneValor] = useState("");

    useEffect(() => {
        const carregarRegistro = async () => {
            try {
                const response = await axios.get(`https://contratos.smedtecnologia.com.br/contratos-service/estag-clientes/${id}`);
                const registro = response.data;
                const { cpf, telefone } = registro;

                reset(registro);
        
                setCPFValor(cpf || "");
                setTelefoneValor(telefone || "");
            } catch (error) {

                if(error.response.status === 404 || error.response.status === 400){
                    navigate("*")
                }

                console.log(error)
            }
        };
    
        carregarRegistro();
    }, [id, reset, navigate]);
      

    const editarCadastro = async (variaveis) => {

        const dados = { 
            "id": id,
            "nome": variaveis.nome, 
            "cpf": variaveis.cpf, 
            "email": variaveis.email, 
            "telefone": variaveis.telefone}

        console.log(dados);
        
        try {
            await axios.post(`https://contratos.smedtecnologia.com.br/contratos-service/estag-clientes`, dados);
            toast.success("Editado com sucesso!", 
                {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                }
            );
        } catch(error) {
            console.log(error);
            toast.error("Ocorreu algum erro com a API!",
                {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                }
            );
        }
    }


    const save = (data) => {

        editarCadastro(data)

        reset({
            nome: '',
            telefone:'',
            email: '',
            cpf: '',
            checkboxes: [],
        })

        setCPFValor('')
        setTelefoneValor('')
    }

    return(
        <form className="m-5" data-formulario onSubmit={handleSubmit(save)} >
            <CampoFormulario 
                tituloCampo="Nome:"
                id="name"
                required = "required"
                erro = {errors?.nome && <p className="mensagem-erro">{errors?.nome?.message}</p>  }
                tagInput= {<input 
                                type="text" 
                                id="name" 
                                className={`form-control ${errors.nome ? "erro": " "}`}
                                {...register("nome")} 
                                autoComplete="off"
                            >
                            </input>}
            />    

            <CampoFormulario 
                tituloCampo="Telefone:"
                id="tel"
                required = "required"
                erro = {errors?.telefone && <p className="mensagem-erro">{errors?.telefone?.message}</p>  }
                tagInput= {<InputMask 
                                type="tel" 
                                id="tel" 
                                className={`form-control ${errors.telefone ? "erro": " "}`}  
                                {...register("telefone")}
                                autoComplete="off"
                                mask={"(99) 99999-9999"}
                                value={telefoneValor}
                                onChange={(e) => setTelefoneValor(e.target.value)}
                            >
                            </InputMask>}
            />        

            <CampoFormulario 
                tituloCampo="CPF:"
                id="CPF"
                required = "required"
                erro = {errors?.cpf && <p className="mensagem-erro">{errors?.cpf?.message}</p>  }
                tagInput= {<InputMask 
                                type="text" 
                                id="CPF" 
                                className={`form-control ${errors.cpf ? "erro": " "}`}  
                                {...register("cpf")} 
                                autoComplete="off"
                                mask={"999.999.999-99"}
                                value={cpfValor}
                                onChange={(e) => setCPFValor(e.target.value)}
                            >
                            </InputMask>}
            />

            <CampoFormulario 
                tituloCampo="Email:"
                id="email" 
                required = "required"
                erro = {errors?.email && <p className="mensagem-erro">{errors?.email?.message}</p>  }
                tagInput= {<input 
                                type="email" 
                                id="email" 
                                className={`form-control ${errors.email ? "erro": " "}`}  
                                {...register("email")} 
                                autoComplete="off"
                            >
                            </input>}        
            />

            <div className="row mb-3">
                <label className="mb-3 required">Categorias de interesse: </label>
                <div>
                    {errors?.checkboxes && <p className="mensagem-erro">{errors?.checkboxes?.message}</p>}
                </div>
                <div className="col-sm-10 offset-sm-2">
                    <div>
                        <CampoFormularioCheckbox 
                            id="inlineCheckbox1"
                            nomeCampo="Artes"
                            tagInput={<input 
                                        className={`form-check-input border-2 checkbox ${errors.checkboxes ? "erro": " "}`}  
                                        type="checkbox" 
                                        id="inlineCheckbox1"
                                        value="Artes"
                                        {...register("checkboxes")}
                                       >
                                       </input>}
                        />
                        <CampoFormularioCheckbox 
                            id="inlineCheckbox2"
                            nomeCampo="Esportes"
                            tagInput={<input 
                                        className={`form-check-input border-2 checkbox ${errors.checkboxes ? "erro": " "}`}
                                        type="checkbox" 
                                        id="inlineCheckbox2"
                                        value="Esportes"
                                        {...register("checkboxes")}
                                      >
                                      </input>}
                        />
                        <CampoFormularioCheckbox 
                            id="inlineCheckbox3"
                            nomeCampo="Dança"
                            tagInput={<input 
                                        className={`form-check-input border-2 checkbox ${errors.checkboxes ? "erro": " "}`} 
                                        type="checkbox" 
                                        id="inlineCheckbox3"
                                        value="Dança"
                                        {...register("checkboxes")}
                                      >
                                      </input>}
                            
                        />
                        <CampoFormularioCheckbox 
                            id="inlineCheckbox4"
                            nomeCampo="Ficção"
                            tagInput={<input 
                                        className={`form-check-input border-2 checkbox ${errors.checkboxes ? "erro": " "}`}
                                        type="checkbox" 
                                        id="inlineCheckbox4"
                                        value="Ficção"
                                        {...register("checkboxes")}
                                      >
                                      </input>}
                        />
                    </div>
                </div>
            </div>
                
            <div className="d-flex justify-content-md-end m-1">
            <button 
                type="submit" 
                className="btn btn-primary botao button-verificador"
            >
                Salvar
            </button> 
            </div>
        </form>                      
    )
}