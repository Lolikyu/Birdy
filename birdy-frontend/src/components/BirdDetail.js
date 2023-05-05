import styles from '../styles/BirdDetail.module.css'
import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import BirdDetailBirds from './BirdDetailBirds';
import { AppContext } from '../App';

export default function BirdDetail () {
    const [mainBird, updateMainBird] = useState(null);
    const [isLoading, updateIsLoading] = useState(false);
    const params = useParams();

    const { reloadListeBird } = useContext(AppContext);

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
        updateIsLoading(true);
        birdMainFetching();
    }, [reloadListeBird, params])

    if (isLoading) {
        return null
    }

    if (mainBird) {
        return (
            <div className= {styles.birdDetail}>
                <BirdDetailBirds
                    mainBird= {mainBird}
                />
            </div>
        )
    }
}
