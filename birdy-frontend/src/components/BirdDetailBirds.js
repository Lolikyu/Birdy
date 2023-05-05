import styles from '../styles/BirdDetailBirds.module.css'
import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Bird from './Bird'
import PostBird from './PostBird'
import { AppContext } from '../App';
    
export default function BirdDetailBirds({mainBird}) {
    const [fatherBird, updateFatherBird] = useState(null);
    const [sideBirds, updateSideBirds] = useState([]);
    const [page, updatePage] = useState(0); 

    const { isConnected, userInfos, reloadListeBird, setReloadListeBird } = useContext(AppContext);

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
        console.log("BirdDetail monté");
        window.addEventListener("scroll", handleScroll);
        return () => {
            console.log("BirdDetail démonté");
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    useEffect(() => {
        updateFatherBird(null);
        updateSideBirds([]);
        updatePage(0);
    }, [mainBird]);

    useEffect(() => {
        birdCommentairesFetching();
        birdFatherFechting();
    }, [page]);
    
    if (mainBird) {
        if (isConnected()) {
            if (userInfos) {
                if (userInfos.pseudo === mainBird.pseudo){
                    //CONNECTE ET PROPRIETAIRE DU BIRD
                    return (
                        <div className={styles.birdDetail}>
                            <ul>
                                {(fatherBird) ?
                                    <div>
                                        <div className={styles.title}>Interface avancée de Bird</div>
                                        <div className={styles.titreFather}>En réponse à</div>
                                        <div className={styles.father}> 
                                            <Bird className={styles.fatherBird}
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
                                            />
                                        </div>
                                    </div>
                                    :
                                    (mainBird.isComment) ?
                                        <div className={styles.Bird}>Le tweet parent n'existe plus, il a été supprimé !</div>
                                        :
                                        null
                                }
                                <div className={styles.titreMain}>Vue détaillée du Bird</div>
                                <div className={styles.main}> 
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
                                    />
                                </div>
                                <button className={styles.button} onClick={supprimerBird}>Supprimer</button>
                                <PostBird
                                    isConnected= {isConnected}
                                    userInfos= {userInfos}
                                    reloadListeBird= {reloadListeBird}
                                    setReloadListeBird= {setReloadListeBird}
							    />
                                {   
                                    (sideBirds && (sideBirds.length > 0)) ?
                                        <div>
                                            <div className={styles.titreCommentaires}>Commentaires</div>
                                                <div className={styles.commentaires}>
                                                {
                                                    sideBirds.map((b) =>
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
                                                            />
                                                        </li>
                                                    )
                                                }
                                            </div>  
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
                    return (
                        <div className={styles.birdDetail}>
                            <ul>
                                {(fatherBird) ?
                                    <div>
                                        <div className={styles.title}>Interface avancée de Bird</div>
                                        <div className={styles.titreFather}>En réponse à</div>
                                        <div className={styles.father}> 
                                            <Bird className={styles.fatherBird}
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
                                            />
                                        </div>
                                    </div>
                                    :
                                    (mainBird.isComment) ?
                                        <div className={styles.Bird}>Le tweet parent n'existe plus, il a été supprimé !</div>
                                        :
                                        null
                                }
                                <div className={styles.titreMain}>Vue détaillée du Bird</div>
                                <div className={styles.main}> 
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
                                    />
                                </div>
                                <PostBird
                                    isConnected= {isConnected}
                                    userInfos= {userInfos}
                                    reloadListeBird= {reloadListeBird}
                                    setReloadListeBird= {setReloadListeBird}
							    />
                                {   
                                    (sideBirds && (sideBirds.length > 0)) ?
                                        <div>
                                            <div className={styles.titreCommentaires}>Commentaires</div>
                                                <div className={styles.commentaires}>
                                                {
                                                    sideBirds.map((b) =>
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
                                                            />
                                                        </li>
                                                    )
                                                }
                                            </div>  
                                        </div>
                                        :
                                        null
                                }
                            </ul>
                        </div>
                    )
                }
            }
        }
        //DECONNECTE
        return (
            <div className={styles.birdDetail}>
                <ul>
                    {(fatherBird) ?
                        <div>
                            <div className={styles.title}>Interface avancée de Bird</div>
                            <div className={styles.titreFather}>En réponse à</div>
                            <div className={styles.father}> 
                                <Bird className={styles.fatherBird}
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
                                />
                            </div>
                        </div>
                        :
                        (mainBird.isComment) ?
                            <div className={styles.Bird}>Le tweet parent n'existe plus, il a été supprimé !</div>
                            :
                            null
                    }
                    <div className={styles.titreMain}>Vue détaillée du Bird</div>
                    <div className={styles.main}> 
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
                        />
                    </div>
                    {   
                        (sideBirds && (sideBirds.length > 0)) ?
                            <div>
                                <div className={styles.titreCommentaires}>Commentaires</div>
                                    <div className={styles.commentaires}>
                                    <ul>
                                        {
                                            sideBirds.map((b) =>
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
                                                    />
                                                </li>
                                            )
                                        }
                                    </ul>
                                </div>  
                            </div>
                            :
                            null
                    }
                </ul>
            </div>
        )
    } 
}