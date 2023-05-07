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
            <div>
                <div><img className={styles.avatar} src={avatar} rel="pdp"></img><br></br></div>
                <div>{pseudo}<br></br></div>
            </div>
            <div>Follows: {follows.length}<br></br></div>
            <div>Followers: {followers.length}<br></br></div>
        </div>
    );
}