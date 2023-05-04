import '../styles/TimeLine.css'
import axios from 'axios'
import {useState, useEffect} from 'react'
import Bird from './Bird'

export default function TimeLine({isConnected, userInfos, reloadListeBird, setReloadListeBird, condition, dateRecherche, setdateRecherche, reloadUserInfos, setReloadUserInfos}){
    const [birds, setBirds] = useState([]);
    const [isLoading, updateIsLoading] = useState(true);
    const [page, updatePage] = useState(0);

    function handleScroll () {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
            updatePage(prev => prev + 1);
        }
    }

    async function birdFetching() {
        updateIsLoading(true);
        if (userInfos){
            await axios.post("http://localhost:8000/api/bird/getBirdsByPage", 
                {
                    page: page,
                    idUser: userInfos.id,
                    follows: userInfos.follows,
                    condition: condition
                }
            )
            .then((response) => { setBirds(prev => [...prev, ...response.data])});
        }
        updateIsLoading(false);
    }

    useEffect(() => {
        birdFetching();
    }, [page, reloadListeBird, dateRecherche, reloadUserInfos, userInfos]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (birds && (birds !== [])) {
        if (birds.length > 0) {
            return (
                <div> 
                    <ul>
                        {
                            birds.map((b) =>
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
                    {(isLoading)} {
                        <h2>Loading ...</h2>
                    } 
                </div>
            )
        }
    }
}