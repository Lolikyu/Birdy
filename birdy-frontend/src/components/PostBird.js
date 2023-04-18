import '../styles/PostBird.css'
import axios from 'axios'
import {useState} from 'react'

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

function PostBird({updatePage, userInfos, isConnected, reloadListeBird, setReloadListeBird, isCommentaire, idBirdCible, birds}){
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
        formulairePostBird.target[0].value='';
        setReloadListeBird(true);     
    };

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
export default PostBird