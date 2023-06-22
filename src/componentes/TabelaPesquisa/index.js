import "./TabelaPesquisa.css"

export default function TabelaPesquisa({camposPesquisados}){
    return (
        <div className="table-container text-center p-0 border-top mw-100 table-responsive">
            <table className="table  table-hover table-striped">
                <thead> 
                    <tr className="fixa-titulo border-bottom">
                        <th colSpan={6} className="title-table py-0 my-1 text-center">Lista de Clientes</th>
                    </tr>
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">CPF</th>
                        <th scope="col">Telefone</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">Excluir</th>
                        <th scope="col">Editar</th>
                    </tr>
                </thead>
                <tbody>
                    {camposPesquisados}
                </tbody>
            </table>
        </div>               
    )
}

