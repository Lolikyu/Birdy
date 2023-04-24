import '../styles/TimeLine.css'
import axios from 'axios'
import {useState,useEffect} from 'react'
import Bird from './Bird'

function TimeLine({updatePage, userInfos, isConnected, updateUserInfos, birds, page, setBirds, reloadListeBird, setReloadListeBird, condition, dateRecherche, setdateRecherche, updateIdBirdCourant, updateListeIdCommentairesCourant}){

    useEffect(() => {
        axios.post("http://localhost:8000/api/bird/getBirdsFiltre", 
            {dateDebut: dateRecherche[0], dateFin: dateRecherche[1]}
        )
        .then((response) => {
            setBirds(response.data.sort((a, b)=>(a.dateDepuis70 > b.dateDepuis70 ? -1 : 1))); //pour récupérer les posts du plus récent ou plus ancien
            setReloadListeBird(reloadListeBird +1);
        })
    }, [birds, reloadListeBird, dateRecherche]
    );

    if (!birds) return null;
    
    function unJourPlusTard() {
        const newDateRecherche = [...dateRecherche];
        newDateRecherche[0] = dateRecherche[0] - 24 * 3600000;
        setdateRecherche(newDateRecherche);
    }

    function birdEstPublique(bird) {
        return (!bird.isPrivate);
    }

    return (
        <div> 
            <ul>
                {
                    birds.filter (
                        (b) => (condition=='private')
                        ?
                        //Affichage une fois connecté
                        (true)
                        :
                        //Affichage en déconnecté
                        (birdEstPublique(b))
                    )
                    .map((b)=>
                        <li key={b._id}>
                            <Bird
                                updatePage= {updatePage}
                                isConnected= {isConnected}
                                userInfos= {userInfos}
                                reloadListeBird= {reloadListeBird}
                                setReloadListeBird= {setReloadListeBird}
                                idBird= {b._id}
                                pseudo= {b.pseudo}
                                avatar= {b.avatar}
                                content= {b.content}
                                date= {b.date}
                                heure= {b.heure}
                                isPrivate= {b.isPrivate}
                                commentaires= {b.commentaires}
                                updateIdBirdCourant= {updateIdBirdCourant}
                                updateListeIdCommentairesCourant= {updateListeIdCommentairesCourant}
                            />
                        </li>
                    )
                }
            </ul>
            <button onClick={unJourPlusTard}>Voir plus</button>
        </div>
    )
}
export default TimeLine