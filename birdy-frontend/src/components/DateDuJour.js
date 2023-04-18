import {useState, useEffect} from 'react'
import '../styles/DateDuJour.css'

function DateDuJour(){
  const [date, setDate] = useState(new Date());
 
  useEffect(() => {
    const interval = setInterval(() => setDate(new Date()), 1000);
 
    return function() {
      clearInterval(interval);
    }
  });

  return (
    <div>
      <p>{date.toLocaleString("fr-FR")}</p>
    </div>
  );
}

export default DateDuJour