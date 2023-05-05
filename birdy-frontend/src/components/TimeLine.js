import '../styles/TimeLine.css'
import axios from 'axios'
import {useState, useEffect, useContext} from 'react'
import ListeBirds from './ListeBirds';
import { AppContext } from '../App';

export default function TimeLine ({ condition }) {
    const [birds, setBirds] = useState([]);
    const [page, updatePage] = useState(0);
    var ignore = false;

    const { userInfos, reloadListeBird } = useContext(AppContext);

    function handleScroll () {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
            updatePage(prev => prev + 1);
        }
    }

    async function birdFetching() {
        if (ignore === false) {
            if (condition === "private")
                if (userInfos){
                    await axios.post("http://localhost:8000/api/bird/getBirdsByPageConnected", 
                        {
                            page: page,
                            idUser: userInfos.id,
                            follows: userInfos.follows
                        }
                    )
                    .then((response) => { setBirds(prev => [...prev, ...response.data])});
                }
            else {
                await axios.post("http://localhost:8000/api/bird/getBirdsByPageDisconnected", 
                    {
                        page: page
                    }
                )
                .then((response) => { setBirds(prev => [...prev, ...response.data])});
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
    }, [reloadListeBird]);

    useEffect(() => {
        birdFetching();
    }, [page, reloadListeBird]);
    
    if (ignore === true){
        return (null)
    }
    if (birds && (birds.length > 0)) {
        return (
            <div> 
                <ListeBirds
                    birds= {birds}
                />
            </div>
        )
    }
}