import styles from './App.module.css'
import Button from './components/Button';
import Sidebar from './components/Sidebar';
import Overview from './components/Overview';
import { useState } from 'react';

function App() {
  const [count, setCount] = useState<number>(0)
  function handleClick() {
    return "hello World"
  }

  function handleDecrease() {
    setCount(prev => {
      return prev - 1;
    })
  }
  return (
    <div className={styles.main}>
      <Sidebar onClick={handleClick}>Finance Tracker</Sidebar>
      <Overview></Overview>
    </div>
  )
}

export default App;
