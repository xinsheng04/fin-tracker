import { createBrowserRouter } from 'react-router';
import App from '../App';
import MyWallet from '../components/MyWallet';
import Overview from '../components/Overview';
import Stats from '../components/Stats';

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children: [
      {index:true, element:<Overview/>},
      {path:'MyWallet',element:<MyWallet/>},
      {path:'Stats', element:<Stats/>},
      
    ]
  }
])

export default router;