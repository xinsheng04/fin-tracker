import Button from './components/Button';
import Sidebar from './components/Sidebar';
import {useState} from 'react'; 

function App() {
  const [count, setCount] = useState<number>(0)
  function handleClick (){ 
    return "hello World"
  }

  function handleDecrease(){ 
    setCount(prev=>{
      return prev-1;
    })
  }
  return (
    <>
    <Sidebar onClick={handleClick}>Finance Tracker</Sidebar>
    </>
  )
}

export default App
