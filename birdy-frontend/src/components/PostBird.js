import '../styles/PostBird.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function TextAreaWithEnter(props) {
  const [text, setText] = useState("");

  return (
    <textarea
      value= {text}
      onChange= {(e) => setText(e.target.value)}
      placeholder= {props.placeholder}
    />
  );
}

function PostBird({isConnected, userInfos, reloadListeBird, setReloadListeBird, isCommentaire, idBirdCible}){
    const [isChecked, setIsChecked] = useState(false);
    const handleOnChange = () => {setIsChecked(!isChecked);};

    async function postBird(formulairePostBird) {
        formulairePostBird.preventDefault();
        var date = new Date().toLocaleDateString("fr");
        var heure = new Date().toLocaleTimeString("fr");
        var dateDepuis70 = Date.now();//pour classer les posts par ordre chrono
        
        
        //si le message est privé alors ## isPrivate = true ##
        var retour = await axios.post('http://localhost:8000/api/bird/postBird', 
          {
            pseudo: userInfos.pseudo,
            avatar: userInfos.avatar,
            content: formulairePostBird.target[0].value,
            date: date,
            heure: heure,
            isPrivate: isChecked,
            dateDepuis70: dateDepuis70
          }
        );
        if (isCommentaire) {
          var retour2 = await axios.post('http://localhost:8000/api/bird/modifyBird',
              {idBirdCible: idBirdCible, idBirdCommentaire: retour.data.birdInfos.id}
          );
        };
        console.log("Ouais ça devait bien se passer jcomprends pas", retour2)
        formulairePostBird.target[0].value='';
        console.log('reloadListeBird:', reloadListeBird);
        setReloadListeBird(reloadListeBird +1);
        console.log('reloadListeBird:', reloadListeBird);
      }

    if (isConnected){
      return (
        <div>
            <form onSubmit={postBird}>
                <label htmlFor='message'>Nouveau post: </label><br></br>
                
                <TextAreaWithEnter placeholder='Contenu du post'/><br></br>

                <label htmlFor='private'>Rendre le post privé </label>
                <input type="checkbox" name='isPrivate' checked={isChecked} onChange={handleOnChange} /><br></br>
                
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
export default PostBird