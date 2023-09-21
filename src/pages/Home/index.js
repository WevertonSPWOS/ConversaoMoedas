import React           from "react";
import Cotacao  from "../../components/cotacao";    
import EstruturaPagina from "../../components/EstruturaPagina";
import "./styles.css";

export default function Home(){
    return(
        <EstruturaPagina className="EstruturaPagina">
                <Cotacao />
        </EstruturaPagina>
    );
};