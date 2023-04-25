import '../styles/BirdDetail.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Bird from './Bird'
import { useParams } from 'react-router-dom'

function BirdDetail({reloadListeBird, dateRecherche, setdateRecherche}){
    const [mainBird, updateMainBird] = useState(null);
    const [sideBirds, updateSideBirds] = useState(null);
    const [isLoading, updateIsLoading] = useState(true);

    const params = useParams();
    
    function unJourPlusTard() {
        const newDateRecherche = [...dateRecherche];
        newDateRecherche[0] = dateRecherche[0] - 24 * 3600000;
        setdateRecherche(newDateRecherche);
    }

    const birdDetailFetching = async function() {
        updateIsLoading(true);
        var idBirdCourant = params.id;

        var response1 = await axios.post("http://localhost:8000/api/bird/getBirds",
            {
                idBird: {idBirdCourant}
            }
        )
        updateMainBird(response1.data);

        var response2 = await axios.post("http://localhost:8000/api/bird/getBirdsFiltreIdList",
            {
                listeIdBird: response1.data.commentaires,
                dateDebut: dateRecherche[0],
                dateFin: dateRecherche[1]
            }
        )
        updateSideBirds(response2.data.sort((a, b)=>(a.dateDepuis70 > b.dateDepuis70 ? -1 : 1))); //pour récupérer les posts du plus récent ou plus ancien
        updateIsLoading(false);
    }

    useEffect(() => {setdateRecherche([Date.now()-(12*3600*1000), Date.now()+1800000])}, []);
    
    useEffect(() => {
        birdDetailFetching();
    }, [params, reloadListeBird]
    );

    if (isLoading){
        return (
            <h2>Loading ...</h2>
        )
    } 
    
    return (
        <div>
            <ul>
                <Bird
                    idBird= {mainBird._id}
                    pseudo= {mainBird.pseudo}
                    avatar= {mainBird.avatar}
                    content= {mainBird.content}
                    date= {mainBird.date}
                    heure= {mainBird.heure}
                    isPrivate= {mainBird.isPrivate}
                />
                {
                    sideBirds.filter(() => true)
                    .map((b)=>
                        <li key={b._id}>
                            <Bird
                                idBird= {b._id}
                                pseudo= {b.pseudo}
                                avatar= {b.avatar}
                                content= {b.content}
                                date= {b.date}
                                heure= {b.heure}
                                isPrivate= {b.isPrivate}
                            />
                        </li>
                    )
                }
            </ul>
            <button onClick={unJourPlusTard}>Voir plus</button>
        </div>
    )
}


export default BirdDetail;