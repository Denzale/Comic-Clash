import { useEffect} from 'react';
import './Stats.css';

const Stats = ({ actualStats1, actualStats2, setActualStats1, setActualStats2 }) =>{

    useEffect(() =>{

        // setActualStats1(JSON.parse(localStorage.getItem("marvel_character1")));
        // setActualStats2(JSON.parse(localStorage.getItem("marvel_character2")));
        console.log(1);
    })

    const showStats = (number) =>{
        
        if(number === 1){
            if(actualStats1.name !== undefined){
                let stats1 = actualStats1.powerstats.map((item, index) =>{
                     return <p key={index} ><b>{item[0]}:</b> {item[1]}</p>
                 })
                 return stats1;
             }
        }else{
            if(actualStats2.name !== undefined){
                let stats2 = actualStats2.powerstats.map((item, index) =>{
                     return <p key={index} ><b>{item[0]}:</b> {item[1]}</p>
                 })
                 return stats2;
             }
        }

    }
    return(
        <div className='statsContainer'>
            <div className='stats z-depth-1'>
                <div className='statsImage'>
                    <h1>{actualStats1.name}</h1>
                    <img src={actualStats1.image} alt={actualStats1.name} loading='lazy' />
                </div>
                <div className='statsValues'>

                    {showStats(1)}
                    <p><b>Description: </b>{actualStats1.description}</p>

                </div>
            </div>
            <div className='stats z-depth-1'>
                <div className='statsImage'>
                    <h1>{actualStats2.name}</h1>
                    <img src={actualStats2.image} alt={actualStats2.name} loading='lazy' />
                </div>
                <div className='statsValues'>

                    {showStats(2)}
                    <p><b>Description: </b>{actualStats2.description}</p>

                </div>
            </div>
        </div>
    )
}

export default Stats;
