import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/login/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='login' element={<Login />}></Route>
      </Routes>
    </Router>
    );
}

export default App;
