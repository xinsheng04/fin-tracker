import { createBrowserRouter } from 'react-router';
import App from '../App';
import MyWallet from '../pages/MyWallet/MyWalletPage';
import Overview from '../pages/Overview/OverviewPage';
import StatsPage from '../pages/Stats/StatsPage';
import Login from '../pages/Login/Login';
import Budgeting from '../pages/Budgeting/Budgeting';

const router = createBrowserRouter([
  {
    // This is a standalone page
    path:'/',
    element:<Login/>,
  },
  {
    path:'/',
    element:<App/>,
    children: [
      {path:'/Overview', element:<Overview/>},
      {path:'MyWallet',element:<MyWallet/>},
      {path:'Stats', element:<StatsPage/>},
      {path:'Budgeting', element:<Budgeting/>}
    ]
  }
])

export default router;