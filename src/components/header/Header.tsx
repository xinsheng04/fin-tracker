import calendarLogo from '../../assets/calendarLogo.png';
import ProfileButton from './ProfileButton';
import { useSelector } from 'react-redux';
import styles from "./header.module.css"

// type header props
type HeaderProps = {
  title: string;

}

export default function Header({ title }: HeaderProps) {
  // calling from the userInfo Store 
  const user = useSelector((state: any) => state.userInfo);
  console.log(user)
  const renderWelcome = title === "Overview";
  return (
    <div className={`${styles.header}`}>
      {/* upper header */}
      <div className={`${styles['header-upper']}`}>
        <h1>{title}</h1>
        {/* profile button */}
        <ProfileButton/>
      </div>
      {/* lower header */}
      {renderWelcome && 
      <div className={`${styles['header-lower']}`}>
        <h1>Welcome, {user?.fname || "Sheng"} 🔥</h1>
        <button className={`${styles['date-display']}`}>
          <img src={calendarLogo} alt="Calendar Logo" />
          <p>March 1, 2024</p>
        </button>
      </div>
      }
    </div>
  );
}

