import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './rootLayout';
import './App.css'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <div>Home Page</div>
        },
        {
          path: "mywallet",
          element: <div>My Wallet Page</div>
        },
        {
          path: "statistics",
          element: <div>Statistics</div>
        },
        {
          path: "budgeting",
          element: <div>Budgeting Page</div>
        }
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;
