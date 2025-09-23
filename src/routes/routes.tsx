import { createBrowserRouter } from 'react-router';
import App from '../App';
import MyWallet from '../pages/MyWallet/MyWalletPage';
import Overview from '../pages/Overview/OverviewPage';
import StatsPage from '../pages/Stats/StatsPage';
import Login from '../pages/Login/Login';
import BudgetingPage from '../pages/Budgeting/BudgetingPage';
// import Budgeting from '../pages/Budgeting/Budgeting';
import Register from '../pages/Register/Register';


const router = createBrowserRouter([
  {
    // This is a standalone page
    path:'/',
    element:<Login/>,
    
  },
  {
    path:'/Register',
    element:<Register/>
  },
  {
    path:'/',
    element:<App/>,
    children: [
      {path:'/Overview', element:<Overview/>},
      {path:'MyWallet',element:<MyWallet/>},
      {path:'Stats', element:<StatsPage/>},
      {path:'Budgeting', element:<BudgetingPage/>}
    ]
  }
])

export default router;