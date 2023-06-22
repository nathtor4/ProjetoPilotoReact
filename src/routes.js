import PesquisaCliente from "pages/PesquisaCliente";
import CadastroCliente from "pages/CadastroCliente";
import PaginaBase from "pages/PaginaBase";
import PaginaNaoEncontrada from "./pages/PaginaNaoEncontrada";
import EditarCliente from "pages/EditarCliente";

const { BrowserRouter, Route, Routes } = require("react-router-dom");

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PaginaBase />}>
                    <Route path="clientes" element={<CadastroCliente />} />
                    <Route path="clientes/pesquisa" element={<PesquisaCliente />} />
                    <Route path="clientes/:id" element={<EditarCliente />} />
                </Route>
                <Route path="*" element={<PaginaNaoEncontrada />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;