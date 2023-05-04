import styles from '../styles/User.module.css';
import { useNavigate } from 'react-router-dom';

export default function User({pseudo, avatar, follows, followers}) {
    const navigate = useNavigate();

    function checkProfile(e) {
        e.stopPropagation();

        navigate('/profile/' + String(pseudo));
    }

    return (
        <div className={styles.user} onClick={checkProfile}>
            Pseudo: {pseudo}<br></br>
            Avatar: <br></br>
            <img className={styles.avatar} src={avatar} rel="pdp"></img><br></br>
            Follows: {follows.length}<br></br>
            Followers: {followers.length}<br></br>
        </div>
    );
}