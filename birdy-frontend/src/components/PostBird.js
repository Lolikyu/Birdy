import '../styles/PostBird.css'
import axios from 'axios'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom';

export default function PostBird({isConnected, userInfos, reloadListeBird, setReloadListeBird}){
    const [isChecked, setIsChecked] = useState(false);
    const params = useParams();
    const idBirdCible = params.id;

    function TextAreaWithEnter({placeholder}) {
      const [text, setText] = useState("");
    
      return (
        <textarea
          value= {text}
          onChange= {(e) => setText(e.target.value)}
          placeholder= {placeholder}
        />
      );
    }
    
    function handleOnChange() {
      setIsChecked(!isChecked);
    };

    async function postBird(formulairePostBird) {
        formulairePostBird.preventDefault();
        var date = new Date().toLocaleDateString("fr");
        var heure = new Date().toLocaleTimeString("fr");
        var dateDepuis70 = Date.now();//pour classer les posts par ordre chrono
        
        //si le message est privé alors ## isPublic = false ##
        var retour = await axios.post('http://localhost:8000/api/bird/postBird',
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
        <div>
            <form onSubmit={postBird}>
                <label htmlFor='message'>Nouveau bird: </label><br></br>
                
                <TextAreaWithEnter placeholder='Contenu du Bird'/><br></br>

                <label htmlFor='public'>Rendre le bird publique </label>
                <input type="checkbox" name='isPublic' checked={isChecked} onChange={handleOnChange} /><br></br>
                
                <button type='submit'>Envoyer</button>
            </form>
        </div>
      )
    }
    else {
      return (
        <div>
            Vous ne pouvez pas commenter sans être connecté 😢<br></br>
            <nav>
                <Link to='/'>Retourner à l'écran d'accueil</Link>
            </nav>
        </div>
      )
    }
}