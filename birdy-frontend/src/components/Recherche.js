import styles from '../styles/Recherche.module.css'
import { useState } from 'react'
import axios from 'axios'
import ListeBirds from './ListeBirds';
import User from './User';

export default function Recherche ({mode}) {
    const [keyword, updateKeyword] = useState("");
    const [resultat, updateResultat] = useState([]);
  
    const handleSearchInput = (event) => {
        updateKeyword(event.target.value);
    };

    if (mode === 'bird') {
        const handleSearch = async () => {
            const response = await axios.post('http://localhost:8000/api/bird/getBirdsFiltre', {
                keyword: keyword
            });
            updateResultat(response.data);
        };
  
        return (
        <div>
            <div className={styles.recherche}>
                <div className={styles.title}>Recherche de Birds</div>
                <div className={styles.barre}>
                    <input
                        className={styles.input}
                        type="text"
                        value={keyword}
                        onChange={handleSearchInput}
                    />
                    <button onClick={handleSearch}>Rechercher</button>
                </div>
                <ListeBirds 
                    birds= {resultat}
                />
            </div>
        </div>
        );
    }

    else {
        const handleSearch = async () => {
            const response = await axios.post('http://localhost:8000/api/user/getUsersFiltre', {
                keyword: keyword
            });
            updateResultat(response.data);
        };

        return (
            <div>
                <div className={styles.recherche2}>
                <div className={styles.title}>Recherche d'utilisateurs</div>
                    <div className={styles.barre}>
                        <input
                            className={styles.input}
                            type="text"
                            value={keyword}
                            onChange={handleSearchInput}
                        />
                        <button onClick={handleSearch}>Rechercher</button>
                    </div>
                    {
                        resultat.map((u)=>
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
                </div>
            </div>
        );
    }
}