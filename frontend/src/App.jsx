import './App.css'
import Register from './components/Register'
import axios from 'axios'

function App() {
  axios.defaults.baseURL = 'http://localhost:4000';
  axios.defaults.withCredentials = true;
  return (
    <>
    <Register/>
    </>
  )
}

export default App
// J2BlMrR44l5L3wtZ