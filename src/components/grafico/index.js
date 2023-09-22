import React    from 'react';
import { useState, useEffect } from 'react';
import api      from '../../services/api';
import { Line } from 'react-chartjs-2';
import './grafico.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
    );
  
export function Grafico(props) {
    const[infoGrafico, setInfoGrafico] = useState([]);
    useEffect(() => {
        async function lerInformacoes(){
            const path = props.tipo + props.moeda + '/' + props.quantidade;
            // api.js https://economia.awesomeapi.com.br/json/:tipo/:moeda/:quantidade
            const resposta = await api.get(path)
            setInfoGrafico(resposta.data);
        };
        
        lerInformacoes();
    }, [props.moeda, props.tipo, props.quantidade]);
    if (infoGrafico.length === 0 || (undefined in infoGrafico)){
        return(
            <h1>Carregando...</h1>
            )
        }
        else{
            const options = {
                responsive: true,
                scales: {
                    yAxis: [
                        {
                            reverse: true

                        }
                    ]
                }
            }

            const data = {
            labels: infoGrafico.map(() => ''),
            datasets: [{
                label: 'Valorização',
                data: infoGrafico.map((info) => parseFloat(info.bid)),
                borderColor: '#336611',
                pointBackgroundColor: '#558833',
                tension: 0.4
            }] 
        }
            return (
                <div className='grafico'>
                    <Line data={data} options={options}/>
                </div>
            )

    }

}
    