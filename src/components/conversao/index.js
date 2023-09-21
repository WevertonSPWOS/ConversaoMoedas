import { useState, useEffect } from 'react';
import api                     from '../../services/api';
import './conversao.css';

function Conversao(props){
    const [currencies, setCurrencies] = useState([]);
    const [valor, setValor] = useState(null);
    const [valorConvertido, setValorConvertido] = useState(null);
    const [select, setSelect] = useState('USD-BRL');

    const ConverterValores = async (e) => {
        setValor(e.target.value)
        const moeda = select;
        const path = "last/" + moeda;

        //api.js https://economia.awesomeapi.com.br/last/:moeda
        const resposta = await api.get(path)
        const cotacao = resposta.data
        setValorConvertido(e.target.value * parseFloat(cotacao[moeda.replace('-', '')].bid))
    }

    const selecionarMoeda = (e) => {
        setSelect(e.target.value)
        setValor('')
        setValorConvertido('')
        props.atualizaMoeda(e.target.value)

    }



    useEffect(() => {
        async function lerInformacoes(){
            const path = "json/available";

            //api.js https://economia.awesomeapi.com.br/json/available 
            const resposta = await api.get(path)
            setCurrencies(resposta.data);
        };
        
        lerInformacoes();
    }, []);
    if (currencies.length === 0) {
        return (
            <h1>Carregando informações...</h1>
            )
    }
    else { 
        const moedas = Object.entries(currencies);
        return(
            <div className='Painel-Conversao'>
                <div className='display'>
                    <input id='converterDe' type='number' value={valor} onChange={ConverterValores}></input>
                    <span className='vale'>vale</span>
                    <input id='converterPara' type='number' disabled value={valorConvertido}></input>
                </div>
                <form className='opcoes'>
                    <label for='moeda'>Selecione a conversão:</label>
                    <select id='moeda' name='moeda' value={select} onChange={selecionarMoeda}>
                    {moedas.map((moeda) => {
                        return(
                            <option value={moeda[0]}>{moeda[1]}</option>
                            )
                        })}
                    </select>
                </form>
           </div>  
        );

    }
}

export default Conversao;