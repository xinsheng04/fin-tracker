import styles from './App.module.css'
import Sidebar from './components/Sidebar'
import { Outlet } from 'react-router'

function App() {
  return (
    <div className={styles.main}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
    </div>
  )
}

export default App
