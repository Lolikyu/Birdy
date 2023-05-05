import '../styles/ProfileBirds.css'
import axios from 'axios'
import {useState, useEffect} from 'react'
import ListeBirds from './ListeBirds';

export default function ProfileBirds({mode, userInfosCible, isConnected, userInfos, reloadListeBird, setReloadListeBird, reloadUserInfos, setReloadUserInfos}){
    const [birds, setBirds] = useState([]);
    const [page, updatePage] = useState(0);
    let ignore = false;

    function handleScroll () {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
            updatePage(prev => prev + 1);
        }
    }

    async function birdFetching() {
        if (ignore === false) {
            if (mode) {
                if (userInfosCible) {
                    if (mode === 'birds') {
                        await axios.post("http://localhost:8000/api/bird/getBirdsByPageProfileBirds", 
                            {
                                page: page,
                                idUser: userInfosCible.id
                            }
                        )
                        .then((response) => { setBirds(prev => [...prev, ...response.data])});
                    }
                    else {
                        if (mode === 'likes') {
                            await axios.post("http://localhost:8000/api/bird/getBirdsByPageListeId", 
                                {
                                    page: page,
                                    listeId: userInfosCible.likes
                                }
                            )
                            .then((response) => { setBirds(prev => [...prev, ...response.data])});
                        }
                        else {
                            if (mode === 'favorites') {
                                await axios.post("http://localhost:8000/api/bird/getBirdsByPageListeId", 
                                    {
                                        page: page,
                                        listeId: userInfosCible.favorites
                                    }
                                )
                                .then((response) => { setBirds(prev => [...prev, ...response.data])});
                            }
                        }
                    }
                }
            }
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            ignore = true;
        }
    }, []);

    useEffect(() => {
        updatePage(0);
        setBirds([]);
    }, [mode]);

    useEffect(() => {
        birdFetching();
    }, [page, mode]);

    if (birds && (birds.length > 0)) {
        return (
            <div> 
                <ListeBirds
                    isConnected= {isConnected}
                    userInfos= {userInfos}
                    reloadListeBird= {reloadListeBird}
                    setReloadListeBird= {setReloadListeBird}
                    reloadUserInfos= {reloadUserInfos}
                    setReloadUserInfos= {setReloadUserInfos}
                    birds= {birds}
                />
            </div>
        ) 
    }
}