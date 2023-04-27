import '../styles/TimeLine.css'
import axios from 'axios'
import {useState, useEffect} from 'react'
import Bird from './Bird'

export default function TimeLine({reloadListeBird, condition, dateRecherche, setdateRecherche}){
    const [birds, setBirds] = useState(null);
    const [isLoading, updateIsLoading] = useState(true);

    function unJourPlusTard() {
        const newDateRecherche = [...dateRecherche];
        newDateRecherche[0] = dateRecherche[0] - 24 * 3600000;
        setdateRecherche(newDateRecherche);
    }
    
    async function birdFetching() {
        updateIsLoading(true);

        var response = await axios.post("http://localhost:8000/api/bird/getBirdsFiltre", 
            {dateDebut: dateRecherche[0], dateFin: dateRecherche[1]}
        )
        
        setBirds(response.data.sort((a, b)=>(a.dateDepuis70 > b.dateDepuis70 ? -1 : 1))); //pour récupérer les posts du plus récent ou plus ancien
        updateIsLoading(false);
    }

    useEffect(() => {
        birdFetching();
    }, [reloadListeBird, dateRecherche]
    );

    if (isLoading){
        return (
            <h2>Loading ...</h2>
        )
    } 

    return (
        <div> 
            <ul>
                {
                    birds.filter (
                        (b) => (condition=='private')
                        ?
                        (true)
                        :
                        (b.isPublic)
                    )
                    .map((b)=>
                        <li key={b._id}>
                            <Bird
                                idBird= {b._id}
                                pseudo= {b.pseudo}
                                avatar= {b.avatar}
                                content= {b.content}
                                date= {b.date}
                                heure= {b.heure}
                                isPublic= {b.isPublic}
                                likes= {b.likes}
                                rebirds= {b.rebirds}
                            />
                        </li>
                    )
                }
            </ul>
            <button onClick={unJourPlusTard}>Voir plus</button>
        </div>
    )
}