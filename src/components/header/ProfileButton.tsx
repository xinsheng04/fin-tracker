import './header.module.css'
type ProfileButtonProps ={
  username: String;
  profilePicUrl: String;
  role: String;
}

const ProfileButton: React.FC<ProfileButtonProps> = (props) => {
  return(
    <div className="profile-button">
      <img src={`${props.profilePicUrl}`} alt="Profile" />
      <div className='profile-info'>
        <p>{props.username}</p>
        <p>{props.role}</p>
      </div>
    </div>
  );
}

export default ProfileButton;