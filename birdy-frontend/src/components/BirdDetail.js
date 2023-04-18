import '../styles/BirdDetail.css'
import axios from 'axios'
import {useState, useEffect} from 'react'
import Bird from './Bird'

function BirdDetail({updatePage, isConnected, idBirdCourant, updateIdBirdCourant, listeIdCommentairesCourant, updateListeIdCommentairesCourant, dateRecherche, page, reloadListeBird, setReloadListeBird, birds, setBirds, userInfos, updateUserInfos}){
    const [mainBird, updateMainBird] = useState(0);

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
        setReloadListeBird(true);
    }

    useEffect(() => {
        getBird();
        getBirdCommentaires();
    }, [reloadListeBird, dateRecherche, idBirdCourant, listeIdCommentairesCourant, isConnected, birds]
    );

    if (!mainBird) return null;

    return (
        <div>
            <ul>
                <Bird
                    updatePage= {updatePage}
                    userInfos= {userInfos}
                    isConnected= {isConnected}
                    updateUserInfos= {updateUserInfos}
                    updateIdBirdCourant= {updateIdBirdCourant}
                    updateListeIdCommentairesCourant= {updateListeIdCommentairesCourant}
                    reloadListeBird= {reloadListeBird}
                    setReloadListeBird= {setReloadListeBird}
                    page= {page}
                    idBird= {mainBird._id}
                    pseudo= {mainBird.pseudo}
                    avatar= {mainBird.avatar}
                    content= {mainBird.content}
                    date= {mainBird.date}
                    heure= {mainBird.heure}
                    isPrivate= {mainBird.isPrivate}
                    dateDepuis70= {mainBird.dateDepuis70}
                    commentaires= {mainBird.commentaires}
                    birds= {birds}
                />
                {
                    birds.filter(() => true)
                    .map((b)=>
                        <li key={b._id}>
                            <Bird
                                updatePage= {updatePage}
                                userInfos= {userInfos}
                                isConnected= {isConnected}
                                updateUserInfos= {updateUserInfos}
                                updateIdBirdCourant= {updateIdBirdCourant}
                                updateListeIdCommentairesCourant= {updateListeIdCommentairesCourant}
                                reloadListeBird= {reloadListeBird}
                                setReloadListeBird= {setReloadListeBird}
                                page= {page}
                                idBird= {b._id}
                                pseudo= {b.pseudo}
                                avatar= {b.avatar}
                                content= {b.content}
                                date= {b.date}
                                heure= {b.heure}
                                isPrivate= {b.isPrivate}
                                dateDepuis70= {b.dateDepuis70}
                                commentaires= {b.commentaires}
                                birds= {birds}
                            />
                        </li>
                    )
                }
            </ul>
        </div>
    )
}

export default BirdDetail;