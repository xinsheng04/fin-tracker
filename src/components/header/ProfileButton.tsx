import styles from './header.module.css'
import profileExample from '../../assets/profileExample.png';

import { useSelector } from 'react-redux';


const ProfileButton = () => {
  const user = useSelector((state:any)=>state.userInfo)
  return(
    <div className={`${styles['profile-button']}`}>
      <img src={`${profileExample}`} alt="Profile" />
      <div className={`${styles['profile-info']}`}>
        <p><strong>{user.fname +` ` +user?.lname}</strong></p>
        <p>{user.role}</p>
      </div>
    </div>
  );
}

export default ProfileButton;