import styles from '../styles/ListeUsers.module.css';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import User from './User';
import { AppContext } from '../App';

export default function ListeUsers({mode}) {
    const [users, setUsers] = useState(null);

    const { isConnected, userInfos } = useContext(AppContext);

    async function usersFetching(mode) {
        if (userInfos) {
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
        }
    }

    useEffect(() => {
        usersFetching(mode);
    }, [userInfos, mode]);

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