import styles from './header.module.css'
type ProfileButtonProps ={
  username: String;
  profilePicUrl: String;
  role: String;
}

const ProfileButton: React.FC<ProfileButtonProps> = (props) => {
  return(
    <div className={`${styles['profile-button']}`}>
      <img src={`${props.profilePicUrl}`} alt="Profile" />
      <div className={`${styles['profile-info']}`}>
        <p><strong>{props.username}</strong></p>
        <p>{props.role}</p>
      </div>
    </div>
  );
}

export default ProfileButton;