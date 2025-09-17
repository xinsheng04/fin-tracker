import calendarLogo from '../../assets/calendarLogo.png';
import profileExample from '../../assets/profileExample.png';
import ProfileButton from './ProfileButton';
import { useSelector } from 'react-redux';
import styles from "./header.module.css"

// type header props
type HeaderProps={
  overview:boolean;

}

export default function Header({overview}:HeaderProps){
  const user = useSelector((state: any) => state.user);
  return(
    <div className={`${styles.header}`}>
      {/* upper header */}
      <div className={`${styles['header-upper']}`}>
        {overview ?<h1>Overview</h1>: <h1>My Wallet</h1>}
        {/* profile button */}
        <ProfileButton 
          username={`${user?.fname || "John"} ${user?.lname || "Doe"}`}
          profilePicUrl={user?.profilePicUrl || profileExample} 
          role={user?.role || "User"} 
        />
      </div>
      {/* lower header */}
      <div className={`${styles['header-lower']}`}>
        <h1>Welcome, {user?.fname || "John"} 🔥</h1>
        <button className={`${styles['date-display']}`}>
          <img src={calendarLogo} alt="Calendar Logo" />
          <p>March 1, 2024</p>
        </button>
      </div>
    </div>
  );
}

