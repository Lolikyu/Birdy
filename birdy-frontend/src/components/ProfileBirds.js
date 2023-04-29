import '../styles/ProfileBirds.css'
import axios from 'axios'
import {useState, useEffect} from 'react'
import Bird from './Bird'

export default function ProfileBirds({mode, userInfosCible, isConnected, userInfos, reloadListeBird, setReloadListeBird, condition, dateRecherche, setdateRecherche, reloadUserInfos, setReloadUserInfos}){
    const [birds, setBirds] = useState(null);
    const [isLoading, updateIsLoading] = useState(true);

    function unJourPlusTard() {
        const newDateRecherche = [...dateRecherche];
        newDateRecherche[0] = dateRecherche[0] - 24 * 3600000;
        setdateRecherche(newDateRecherche);
    }
    
    async function birdFetching(mod) {
        updateIsLoading(true);
        if (mod) {
            if (mod === 'birds') {
                var response = await axios.post("http://localhost:8000/api/bird/getBirdsFiltreIdList", 
                    {
                        dateDebut: dateRecherche[0], 
                        dateFin: dateRecherche[1],
                        listeIdBird: userInfosCible.birds
                    }
                )
            }
            else {
                if (mod === 'likes') {
                var response = await axios.post("http://localhost:8000/api/bird/getBirdsFiltreIdList", 
                    {
                        dateDebut: dateRecherche[0], 
                        dateFin: dateRecherche[1],
                        listeIdBird: userInfosCible.likes
                    }
                )
                }
                else {
                    if (mod === 'favorites') {
                        var response = await axios.post("http://localhost:8000/api/bird/getBirdsFiltreIdList", 
                            {
                                dateDebut: dateRecherche[0], 
                                dateFin: dateRecherche[1],
                                listeIdBird: userInfosCible.favorites
                            }
                        )
                    }
                }
            }
            
            setBirds(response.data.sort((a, b)=>(a.dateDepuis70 > b.dateDepuis70 ? -1 : 1))); //pour récupérer les posts du plus récent ou plus ancien
            updateIsLoading(false);
        }
    }

    useEffect(() => {
        birdFetching(mode);
    }, [reloadListeBird, dateRecherche, mode]
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
                                userInfos= {userInfos}
                                isConnected= {isConnected}
                                reloadListeBird= {reloadListeBird}
                                setReloadListeBird= {setReloadListeBird}
                                reloadUserInfos= {reloadUserInfos}
							    setReloadUserInfos= {setReloadUserInfos}
                            />
                        </li>
                    )
                }
            </ul>
            <button onClick={unJourPlusTard}>Voir plus</button>
        </div>
    )
}