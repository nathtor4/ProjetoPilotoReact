import "./Rodape.css";
import React, { useState, useEffect } from 'react';

export default function Rodape() {

    const [dataHora, setDataHora] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setDataHora(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    
    return(
        <footer className="d-flex justify-content-between px-3 rodape border-top">
            <p>Usuário logado: </p>
            <p>{dataHora.toLocaleString()}</p>
        </footer>
    )
}