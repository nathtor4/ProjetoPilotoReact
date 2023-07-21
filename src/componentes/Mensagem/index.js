import { toast } from 'react-toastify';


const mensagem = (error) => {

    const mensagem = error.response?.data?.message;
    if (mensagem) {
        toast.error(mensagem,
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
    } else {
        toast.error("Ocorreu um erro no API",
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

export default mensagem;

