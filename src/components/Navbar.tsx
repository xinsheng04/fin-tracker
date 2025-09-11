import { useNavigate } from "react-router";
export default function NavBar(){
  const navigate = useNavigate();
  return(
    <nav>
      <ul>
        <li><button onClick={() => navigate('/')}>Home</button></li>
        <li><button onClick={() => navigate('/mywallet')}>My Wallet</button></li>
        <li><button onClick={() => navigate('/statistics')}>Statistics</button></li>
        <li><button onClick={() => navigate('/budgeting')}>Budgeting</button></li>
      </ul>
    </nav>
  );
}

