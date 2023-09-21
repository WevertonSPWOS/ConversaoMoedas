import { useState, useEffect } from 'react';
import api                     from '../../services/api';
import './info.css';
import { Grafico } from '../grafico';



function Info(props){
    const[infoMoedas, setInfoMoedas] = useState([]);
    useEffect(() => {
        async function lerInformacoes(){
            const path = "last/" + props.moeda;
            // api.js https://economia.awesomeapi.com.br/json/available 
            const resposta = await api.get(path)
            setInfoMoedas(resposta.data);
        };
        
        lerInformacoes();
    }, [props.moeda]);
    if (infoMoedas.length === 0 || !(props.moeda.replace('-', '') in infoMoedas)) {
        return (
            <h1>Carregando informações...</h1>
            )
    }
    else { 
        return(
            <div className='Painel'>
                <span className='Data'> Data: {infoMoedas[props.moeda.replace('-', '')].create_date}</span>
                <div className='infos'>
                    <p><span>Compra: {infoMoedas[props.moeda.replace('-', '')].bid}</span>
                    <span className='espacamento'>Venda: {infoMoedas[props.moeda.replace('-', '')].ask}</span></p>
                    <p><span>Variação: {infoMoedas[props.moeda.replace('-', '')].varBid}</span>
                    <span className='espacamento'>Variação percentual: {infoMoedas[props.moeda.replace('-', '')].pctChange}%</span>
                    </p>
                    <p><span>Máxima: {infoMoedas[props.moeda.replace('-', '')].high}</span>
                    <span className='espacamento'>Mínima: {infoMoedas[props.moeda.replace('-', '')].low}</span>
                    </p>
                </div>
                <Grafico moeda={props.moeda}/>
            </div>
        );
    }
}

export default Info;