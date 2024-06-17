import './App.css'
import Routes from './components/Routes'
import axios from 'axios'
import { UserContextProvider } from './context/UserContext';

function App() {
  axios.defaults.baseURL = 'http://localhost:4000';
  axios.defaults.withCredentials = true;
  return (
    <UserContextProvider>
    <Routes/>
    </UserContextProvider>
  )
}

export default App