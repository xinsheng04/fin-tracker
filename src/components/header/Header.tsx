import calendarLogo from '../../assets/calendarLogo.png';
import profileExample from '../../assets/profileExample.png';
import ProfileButton from './ProfileButton';
import styles from "./header.module.css"
export default function Header(){
  return(
    <div className={`${styles.header}`}>
      {/* upper header */}
      <div className={`${styles['header-upper']}`}>
        <h1>Overview</h1>
        {/* profile button */}
        <ProfileButton 
          username="John Doe" 
          profilePicUrl={profileExample} 
          role="User" 
        />
      </div>
      {/* lower header */}
      <div className={`${styles['header-lower']}`}>
        <h1>Welcome, Kyle 🔥</h1>
        <button className={`${styles['date-display']}`}>
          <img src={calendarLogo} alt="Calendar Logo" />
          <p>March 1, 2024</p>
        </button>
      </div>
    </div>
  );
}

