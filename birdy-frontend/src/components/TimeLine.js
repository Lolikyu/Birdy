import '../styles/TimeLine.css'
import axios from 'axios'
import {useState, useEffect} from 'react'
import Bird from './Bird'

export default function TimeLine({isConnected, userInfos, reloadListeBird, setReloadListeBird, condition, dateRecherche, setdateRecherche, reloadUserInfos, setReloadUserInfos}){
    const [birds, setBirds] = useState(null);
    const [isLoading, updateIsLoading] = useState(true);

    function unJourPlusTard() {
        const newDateRecherche = [...dateRecherche];
        newDateRecherche[0] = dateRecherche[0] - 24 * 3600000;
        setdateRecherche(newDateRecherche);
    }
    
    function isInArray(elem, array){
        for (var i=0; i < array.length; i++){
            if (array[i] === elem){
                return true;
            }
        }
        return false;
    }

    async function birdFetching() {
        updateIsLoading(true);

        var response = await axios.post("http://localhost:8000/api/bird/getBirdsFiltre", 
            {dateDebut: dateRecherche[0], dateFin: dateRecherche[1]}
        )
        
        setBirds(response.data.sort((a, b)=>(a.dateDepuis70 > b.dateDepuis70 ? -1 : 1))); //pour récupérer les posts du plus récent ou plus ancien
        updateIsLoading(false);
    }

    function privateBirds(bird){
        if (bird) {
            return ((bird.idUser === userInfos.id) || isInArray(bird.idUser, userInfos.follows));
        }
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

    if (birds) {
        return (
            <div> 
                <ul>
                    {
                        birds.filter (
                            (b) => (condition === 'private')
                            ?
                            (privateBirds(b) || b.isPublic)
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
}