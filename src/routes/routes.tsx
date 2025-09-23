import { createBrowserRouter } from 'react-router';
import App from '../App';
import MyWallet from '../pages/MyWallet/MyWalletPage';
import Overview from '../pages/Overview/OverviewPage';
import StatsPage from '../pages/Stats/StatsPage';
import BudgetingPage from '../pages/Budgeting/BudgetingPage';
// import Budgeting from '../pages/Budgeting/Budgeting';

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children: [
      {index:true, element:<Overview/>},
      {path:'MyWallet',element:<MyWallet/>},
      {path:'Stats', element:<StatsPage/>},
      {path:'Budgeting', element:<BudgetingPage/>}
    ]
  }
])

export default router;