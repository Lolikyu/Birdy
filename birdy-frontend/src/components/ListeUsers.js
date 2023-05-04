import styles from '../styles/ListeUsers.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import User from './User';

export default function ListeUsers({isConnected, userInfos, mode}) {
    const [users, setUsers] = useState(null);
    const [isLoading, updateIsLoading] = useState(true);

    async function usersFetching(mode) {
        updateIsLoading(true);
        if (mode === 'follows') {
            var response = await axios.post("http://localhost:8000/api/user/getUsersListeId",
                {listeIdUser: userInfos.follows}
            )
            setUsers(response.data);
        }
        if (mode === 'followers') {
            var response = await axios.post("http://localhost:8000/api/user/getUsersListeId",
                {listeIdUser: userInfos.followers}
            )
            setUsers(response.data);
        }
        updateIsLoading(false);
    }

    useEffect(() => {
        usersFetching(mode);
    }, []);

    if (isLoading){
        return (
            <h2>Loading ...</h2>
        )
    } 
    if (isConnected) {
        if (users) {
            return (
                <div className={styles.listeUsers}> 
                    <ul>
                        {
                            users.map((u)=>
                                <li key={u._id}>
                                    <User
                                        pseudo= {u.pseudo}
                                        avatar= {u.avatar}
                                        follows= {u.follows}
                                        followers= {u.followers}
                                    />
                                </li>
                            )
                        }
                    </ul>
                </div>
            )
        }
    }
    else {
        return (
            <div className={styles.error}>
                Vous ne pouvez pas commenter sans être connecté 😢<br></br>
                <nav>
                    <Link to='/'>Retourner à l'écran d'accueil</Link>
                </nav>
            </div>
        )
    }
}