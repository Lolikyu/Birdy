import styles from '../styles/Recherche.module.css'

export default function Recherche({setdateRecherche, reloadListeBird, setReloadListeBird}){
    var dateduJour = new Date();
    dateduJour = dateduJour.toLocaleDateString('fr');
    
    function initDate(){
        setdateRecherche([Date.now()-(12*3600*1000),Date.now()+1800000]); 
    }

    function checkDate(e){
        e.preventDefault();

        const dateDebut = Date.parse(e.target[0].value);
        const dateFin = Date.parse(e.target[1].value)+24*3600000; //afin que le jour de fin soit compté.
        if (dateFin < dateDebut) {alert("La date de fin doit être supérieure à la date de début !");}
        else {
            setdateRecherche([dateDebut, dateFin]); 
        }
    }
    
    return (
        <div>
            <form onSubmit={checkDate}>
                Recherche de posts entre le 
                <input className={styles.input} name ="debut" type="date" required/> 
                et le 
                <input className={styles.input} name = "fin" type='date' required max={dateduJour}/>
                <button type="submit">Valider</button>
                <button onClick={initDate}>Init</button>
            </form>  
        </div>
    )
}