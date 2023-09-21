import React           from "react";
import Cotacao  from "../../components/cotacao";    
import EstruturaPagina from "../../components/EstruturaPagina";
import "./styles.css";
import { Grafico } from "../../components/grafico";

export default function Home(){
    return(
        <EstruturaPagina className="EstruturaPagina">
                <Cotacao />
        </EstruturaPagina>
    );
};