import styles from '../styles/BirdDetail.module.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import BirdDetailBirds from './BirdDetailBirds';

export default function BirdDetail({isConnected, userInfos, reloadListeBird, setReloadListeBird, reloadUserInfos, setReloadUserInfos}){
    const [mainBird, updateMainBird] = useState(null);
    const [isLoading, updateIsLoading] = useState(false);
    const params = useParams();

    const birdMainFetching = async function() {
        updateIsLoading(true);
        await axios.post("http://localhost:8000/api/bird/getBirdById",
            {
                idBird: params.id
            }
        )
        .then((response) => {updateMainBird(response.data)});
        updateIsLoading(false);
    }
    
    useEffect(() => {
        birdMainFetching();
    }, [reloadListeBird, params])

    if (isLoading){
        return (null)
    }
    if (mainBird) {
        return (
            <div className= {styles.birdDetail}>
                <BirdDetailBirds
                    isConnected= {isConnected}
                    userInfos= {userInfos}
                    reloadListeBird= {reloadListeBird}
                    setReloadListeBird= {setReloadListeBird}
                    reloadUserInfos= {reloadUserInfos}
                    setReloadUserInfos= {setReloadUserInfos}
                    mainBird= {mainBird}
                />
            </div>
        )
    }
}