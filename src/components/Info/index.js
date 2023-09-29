import { useState, useEffect } from 'react';
import api                     from '../../services/api';
import './info.css';
import { Grafico } from '../grafico';



function Info(props){
    const[infoMoedas, setInfoMoedas] = useState([]);
    const [select, setSelect] = useState('daily/');
    const [quantidade, setQuantidade] = useState(90);
    const selecionarGrafico = (e) => {
        setSelect(e.target.value)
    }
    const mudarQuantidade = (e) => {
        setQuantidade(e.target.value)
    }
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
                <div className='Tipo-Grafico'>
                    <div>
                        <label>Tipo do Gráfico: </label>
                        <select id='tipo_grafico' value={select} onChange={selecionarGrafico}>
                            <option value='daily/'>Fechamento diário</option>
                            <option value=''>Cotações sequenciais</option>
                        </select>
                    </div>
                    <div>
                        <label>Quantidade: </label>
                        <input type='number' value={quantidade} onChange={mudarQuantidade}></input>
                    </div>
                </div>
                <Grafico moeda={props.moeda} tipo={select} quantidade={quantidade}/>
            </div>
        );
    }
}

export default Info;
