import '../styles/BirdDetail.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Bird from './Bird'
import { useParams, useNavigate } from 'react-router-dom'

export default function BirdDetail({isConnected, userInfos, reloadListeBird, setReloadListeBird, dateRecherche, setdateRecherche, reloadUserInfos, setReloadUserInfos}){
    const [mainBird, updateMainBird] = useState(null);
    const [sideBirds, updateSideBirds] = useState(null);
    const [fatherBird, updateFatherBird] = useState(null);
    const [isLoading, updateIsLoading] = useState(true);
    const [isLoadingBis, updateIsLoadingBis] = useState(true);

    const params = useParams();
    const navigate = useNavigate();
    
    function unJourPlusTard() {
        const newDateRecherche = [...dateRecherche];
        newDateRecherche[0] = dateRecherche[0] - 24 * 3600000;
        setdateRecherche(newDateRecherche);
    }

    async function supprimerBird() {
        var id = params.id;
        var response = await axios.post("http://localhost:8000/api/bird/deleteBird", 
            {
                idBird: id
            }
        )
        navigate('/');
        setReloadListeBird(reloadListeBird +1);
    }

    const birdDetailFetching = async function() {
        updateIsLoading(true);
        var idBirdCourant = params.id;

        var response1 = await axios.post("http://localhost:8000/api/bird/getBirdById",
            {
                idBird: idBirdCourant
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

    const birdFatherFechting = async function() {
        updateIsLoadingBis(true);
        if (mainBird) {
            var response3 = await axios.post("http://localhost:8000/api/bird/getBirdById",
                {
                    idBird: mainBird.isComment
                }
            )
            updateFatherBird(response3.data);
        }
        updateIsLoadingBis(false);
    }

    useEffect(() => {setdateRecherche([Date.now()-(12*3600*1000), Date.now()+1800000])}, []);
    
    useEffect(() => {
        birdDetailFetching();
    }, [params, reloadListeBird]);

    useEffect(() => {
        birdFatherFechting();
    }, [mainBird]);

    if (isLoading || isLoadingBis){
        return (
            <h2>Loading ...</h2>
        )
    } 

    if (isConnected()) {
        if (userInfos.pseudo === mainBird.pseudo){
            //CONNECTE ET PROPRIETAIRE DU BIRD
            return (
                <div>
                    <ul>
                        {(fatherBird) ?
                            <Bird
                                idBird= {fatherBird._id}
                                pseudo= {fatherBird.pseudo}
                                avatar= {fatherBird.avatar}
                                content= {fatherBird.content}
                                date= {fatherBird.date}
                                heure= {fatherBird.heure}
                                isPublic= {fatherBird.isPublic}
                                isComment= {fatherBird.isComment}
                                isRebird= {fatherBird.isRebird}
                                likes= {fatherBird.likes}
                                rebirds= {fatherBird.rebirds}
                                userInfos= {userInfos}
                                isConnected= {isConnected}
                                reloadListeBird= {reloadListeBird}
                                setReloadListeBird= {setReloadListeBird}
                                reloadUserInfos= {reloadUserInfos}
                                setReloadUserInfos= {setReloadUserInfos}
                            />
                            :
                            (mainBird.isComment) ?
                                <div>Le tweet n'existe plus, il a été supprimé !</div>
                                :
                                null
                        }
                        <Bird
                            idBird= {mainBird._id}
                            pseudo= {mainBird.pseudo}
                            avatar= {mainBird.avatar}
                            content= {mainBird.content}
                            date= {mainBird.date}
                            heure= {mainBird.heure}
                            isPublic= {mainBird.isPublic}
                            isComment= {mainBird.isComment}
                            isRebird= {mainBird.isRebird}
                            likes= {mainBird.likes}
                            rebirds= {mainBird.rebirds}
                            userInfos= {userInfos}
                            isConnected= {isConnected}
                            reloadListeBird= {reloadListeBird}
                            setReloadListeBird= {setReloadListeBird}
                            reloadUserInfos= {reloadUserInfos}
                            setReloadUserInfos= {setReloadUserInfos}
                        />
                        <button onClick={supprimerBird}>Supprimer</button>
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
                                        isPublic= {b.isPublic}
                                        isComment= {b.isComment}
                                        isRebird= {b.isRebird}
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
        //CONNECTE ET NON-PROPRIETAIRE DU BIRD
        return (
            <div>
                <ul>
                    {(fatherBird) ?
                            <Bird
                                idBird= {fatherBird._id}
                                pseudo= {fatherBird.pseudo}
                                avatar= {fatherBird.avatar}
                                content= {fatherBird.content}
                                date= {fatherBird.date}
                                heure= {fatherBird.heure}
                                isPublic= {fatherBird.isPublic}
                                isComment= {fatherBird.isComment}
                                isRebird= {fatherBird.isRebird}
                                likes= {fatherBird.likes}
                                rebirds= {fatherBird.rebirds}
                                userInfos= {userInfos}
                                isConnected= {isConnected}
                                reloadListeBird= {reloadListeBird}
                                setReloadListeBird= {setReloadListeBird}
                                reloadUserInfos= {reloadUserInfos}
                                setReloadUserInfos= {setReloadUserInfos}
                            />
                            :
                            (mainBird.isComment) ?
                                <div>Le tweet n'existe plus, il a été supprimé !</div>
                                :
                                null
                        }
                    <Bird
                        idBird= {mainBird._id}
                        pseudo= {mainBird.pseudo}
                        avatar= {mainBird.avatar}
                        content= {mainBird.content}
                        date= {mainBird.date}
                        heure= {mainBird.heure}
                        isPublic= {mainBird.isPublic}
                        isComment= {mainBird.isComment}
                        isRebird= {mainBird.isRebird}
                        likes= {mainBird.likes}
                        rebirds= {mainBird.rebirds}
                        userInfos= {userInfos}
                        isConnected= {isConnected}
                        reloadListeBird= {reloadListeBird}
                        setReloadListeBird= {setReloadListeBird}
                        reloadUserInfos= {reloadUserInfos}
                        setReloadUserInfos= {setReloadUserInfos}
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
                                    isPublic= {b.isPublic}
                                    isComment= {b.isComment}
                                    isRebird= {b.isRebird}
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
    //DECONNECTE
    return (
        <div>
            <ul>
                {(fatherBird) ?
                    <Bird
                        idBird= {fatherBird._id}
                        pseudo= {fatherBird.pseudo}
                        avatar= {fatherBird.avatar}
                        content= {fatherBird.content}
                        date= {fatherBird.date}
                        heure= {fatherBird.heure}
                        isPublic= {fatherBird.isPublic}
                        isComment= {fatherBird.isComment}
                        isRebird= {fatherBird.isRebird}
                        likes= {fatherBird.likes}
                        rebirds= {fatherBird.rebirds}
                        userInfos= {userInfos}
                        isConnected= {isConnected}
                        reloadListeBird= {reloadListeBird}
                        setReloadListeBird= {setReloadListeBird}
                        reloadUserInfos= {reloadUserInfos}
                        setReloadUserInfos= {setReloadUserInfos}
                    />
                    :
                    (mainBird.isComment) ?
                        <div>Le tweet n'existe plus, il a été supprimé !</div>
                        :
                        null
                }
                <Bird
                    idBird= {mainBird._id}
                    pseudo= {mainBird.pseudo}
                    avatar= {mainBird.avatar}
                    content= {mainBird.content}
                    date= {mainBird.date}
                    heure= {mainBird.heure}
                    isPublic= {mainBird.isPublic}
                    isComment= {mainBird.isComment}
                    isRebird= {mainBird.isRebird}
                    likes= {mainBird.likes}
                    rebirds= {mainBird.rebirds}
                    userInfos= {userInfos}
                    isConnected= {isConnected}
                    reloadListeBird= {reloadListeBird}
                    setReloadListeBird= {setReloadListeBird}
                    reloadUserInfos= {reloadUserInfos}
                    setReloadUserInfos= {setReloadUserInfos}
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
                                isPublic= {b.isPublic}
                                isComment= {b.isComment}
                                isRebird= {b.isRebird}
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