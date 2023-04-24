import '../styles/BirdDetail.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Bird from './Bird'

function BirdDetail({isConnected, idBirdCourant, updateIdBirdCourant, listeIdCommentairesCourant, updateListeIdCommentairesCourant, dateRecherche, reloadListeBird, setReloadListeBird, birds, setBirds, userInfos}){
    const [mainBird, updateMainBird] = useState(0);

    useEffect(() => {
        async function getBird(){
            var retour = await axios.post("http://localhost:8000/api/bird/getBirds",
            {
                idBird: {idBirdCourant}
            }
            )
            updateMainBird(retour.data);
        }
    
        async function getBirdCommentaires(){
            var retour = await axios.post("http://localhost:8000/api/bird/getBirdsFiltreIdList",
            {
                listeIdBird: listeIdCommentairesCourant,
                dateDebut: dateRecherche[0],
                dateFin: dateRecherche[1],
            }
            )
            setBirds(retour.data.sort((a, b)=>(a.dateDepuis70 > b.dateDepuis70 ? -1 : 1))); //pour récupérer les posts du plus récent ou plus ancien
            setReloadListeBird(reloadListeBird +1);
        }
        getBird();
        getBirdCommentaires();
    }, [idBirdCourant, listeIdCommentairesCourant, reloadListeBird]
    );

    if (!mainBird){
        return (
            <>{console.log("mainBird", mainBird)} mainBird pas updated</>
        )
    } 
    else {
        return (
            <div>
                <ul>
                    <Bird
                        isConnected= {isConnected}
                        userInfos= {userInfos}
                        reloadListeBird= {reloadListeBird}
                        setReloadListeBird= {setReloadListeBird}
                        idBird= {mainBird._id}
                        pseudo= {mainBird.pseudo}
                        avatar= {mainBird.avatar}
                        content= {mainBird.content}
                        date= {mainBird.date}
                        heure= {mainBird.heure}
                        isPrivate= {mainBird.isPrivate}
                        commentaires= {mainBird.commentaires}
                        updateIdBirdCourant= {updateIdBirdCourant}
                        updateListeIdCommentairesCourant= {updateListeIdCommentairesCourant}
                    />

                    {
                        birds.filter(() => true)
                        .map((b)=>
                            <li key={b._id}>
                                <Bird
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
            </div>
        )
    }
}

export default BirdDetail;