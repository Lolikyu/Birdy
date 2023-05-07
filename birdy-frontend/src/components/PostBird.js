import styles from '../styles/PostBird.module.css'
import axios from 'axios'
import { useState, useContext } from 'react'
import { Link, useParams } from 'react-router-dom';
import { AppContext } from '../App';

export default function PostBird () {
    const [isChecked, setIsChecked] = useState(false);

    const { isConnected, userInfos, reloadListeBird, setReloadListeBird } = useContext(AppContext);

    const params = useParams();
    const idBirdCible = params.id;

    function handleOnChange() {
      setIsChecked(!isChecked);
    };

    async function postBird(formulairePostBird) {
        formulairePostBird.preventDefault();
        var date = new Date().toLocaleDateString("fr");
        var heure = new Date().toLocaleTimeString("fr");
        var dateDepuis70 = Date.now();//pour classer les posts par ordre chrono
        
        //si le message est privé alors ## isPublic = false ##
        await axios.post('http://localhost:8000/api/bird/postBird',
          {
            idUser: userInfos.id,
            pseudo: userInfos.pseudo,
            avatar: userInfos.avatar,
            content: formulairePostBird.target[0].value,
            date: date,
            heure: heure,
            isPublic: isChecked,
            isComment: idBirdCible,
            dateDepuis70: dateDepuis70
          }
        );
        formulairePostBird.target[0].value='';
        setReloadListeBird(reloadListeBird +1);
      }

    if (isConnected()){
      return (
        <div className={styles.postBird}>
            <form onSubmit={postBird}>
                <div className={styles.desc}>Nouveau Bird</div><br></br>
                
                <textarea className={styles.textarea}
                  placeholder= {"Contenu du Bird"}
                /><br></br>

                <div className={styles.checkbox}>
                  <label className={styles.label} htmlFor='isPublic'>Bird public</label>
                  <input className={styles.input} type="checkbox" id="isPublic" checked={isChecked} onChange={handleOnChange}/>
                </div>
                
                <div><button className={styles.button} type='submit'>Envoyer</button></div>
                
            </form>
        </div>
      )
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