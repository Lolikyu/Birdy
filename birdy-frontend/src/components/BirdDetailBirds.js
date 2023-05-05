import styles from '../styles/BirdDetailBirds.module.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Bird from './Bird'
import ListeBirds from './ListeBirds'
import PostBird from './PostBird'
    
export default function BirdDetailBirds({isConnected, userInfos, reloadListeBird, setReloadListeBird, reloadUserInfos, setReloadUserInfos, mainBird}) {
    const [fatherBird, updateFatherBird] = useState(null);
    const [sideBirds, updateSideBirds] = useState([]);
    const [page, updatePage] = useState(0); 

    const navigate = useNavigate();

    function handleScroll () {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
            updatePage(prev => prev + 1);
        }
    }

    async function supprimerBird() {
        if (mainBird) {
            await axios.post("http://localhost:8000/api/bird/deleteBird", 
                {
                    idBird: mainBird._id
                }
            )
            .then((response) => {console.log(mainBird, response)});
            setReloadListeBird(reloadListeBird +1);
            navigate('/');
        }
    }

    const birdCommentairesFetching = async function() {
        if (mainBird) {
            await axios.post("http://localhost:8000/api/bird/getBirdsByPageListeId", 
                {
                    page: page,
                    listeId: mainBird.commentaires
                }
            )
            .then((response) => {updateSideBirds([...sideBirds, ...response.data])}); 
        }
    }

    const birdFatherFechting = async function() {
        if (mainBird) {
            var response3 = await axios.post("http://localhost:8000/api/bird/getBirdById",
                {
                    idBird: mainBird.isComment
                }
            )
            updateFatherBird(response3.data);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    useEffect(() => {
        birdFatherFechting();
        birdCommentairesFetching();
    }, [page, reloadListeBird]);
    
    if (mainBird) {
        if (isConnected()) {
            if (userInfos) {
                if (userInfos.pseudo === mainBird.pseudo){
                    //CONNECTE ET PROPRIETAIRE DU BIRD
                    return (
                        <div className={styles.birdDetail}>
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
                                        reloadUserInfos= {reloadUserInfos}
                                        setReloadUserInfos= {setReloadUserInfos}
                                    />
                                    :
                                    (mainBird.isComment) ?
                                        <div className={styles.Bird}>Le tweet parent n'existe plus, il a été supprimé !</div>
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
                                    reloadUserInfos= {reloadUserInfos}
                                    setReloadUserInfos= {setReloadUserInfos}
                                />
                                <button onClick={supprimerBird}>Supprimer</button>
                                <PostBird
                                    isConnected= {isConnected}
                                    userInfos= {userInfos}
                                    reloadListeBird= {reloadListeBird}
                                    setReloadListeBird= {setReloadListeBird}
							    />
                                {
                                    (sideBirds && (sideBirds !== [])) ?
                                        <div> 
                                            <ListeBirds
                                                isConnected= {isConnected}
                                                userInfos= {userInfos}
                                                reloadUserInfos= {reloadUserInfos}
                                                setReloadUserInfos= {setReloadUserInfos}
                                                birds= {sideBirds}
                                            />
                                        </div>  
                                        :
                                        null
                                }
                            </ul>
                        </div>
                    )
                }
                else {
                    //CONNECTE ET NON-PROPRIETAIRE DU BIRD
                    return( <div>Chelou</div>)
                    return (
                        <div className={styles.birdDetail}>
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
                                                reloadUserInfos= {reloadUserInfos}
                                                setReloadUserInfos= {setReloadUserInfos}
                                            />
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                    )
                }
            }
        }
        //DECONNECTE
        return( <div>Chelou 2</div>)
        return (
            <div className={styles.birdDetail}>
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
                                    reloadUserInfos= {reloadUserInfos}
                                    setReloadUserInfos= {setReloadUserInfos}
                                />
                            </li>
                        )
                    }
                </ul>
            </div>
        )
    }
}