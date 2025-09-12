import calendarLogo from '../../assets/calendarLogo.png';
import ProfileButton from './ProfileButton';
export default function Header(){

  return(
    <div className="header">
      {/* upper header */}
      <div className="header-upper">
        <h1>Overview</h1>
        {/* profile button */}
        <ProfileButton 
          username="John Doe" 
          profilePicUrl="https://via.placeholder.com/150" 
          role="User" 
        />
      </div>
      {/* lower header */}
      <div className="header-lower">
        <h1>Welcome, user 🔥</h1>
        <div className="date-display">
          <img src={calendarLogo} alt="Calendar Logo" />
          <p>March 1, 2024</p>
        </div>
      </div>
    </div>
  );
}

