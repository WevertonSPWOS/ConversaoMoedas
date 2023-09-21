import { useState }    from "react";
import Conversao       from '../../components/conversao';
import Info            from "../../components/Info" 

export default function Cotacao(){
    const [moeda, setMoeda] = useState('USD-BRL');
    const atualizaMoeda = (novaMoeda) => {
        setMoeda(novaMoeda)
    } 
    return(
        <div className="container">
            <Conversao atualizaMoeda={atualizaMoeda}/>
            <Info moeda={moeda}/>
        </div>
    );
};