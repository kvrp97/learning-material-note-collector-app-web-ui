import './App.css';
import LogIn from './pages/login/LogIn';
import { Route, Routes } from 'react-router-dom';
import NoteApp from './pages/noteApp/NoteApp';
import SignUp from './pages/signUp/SignUp';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LogIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/note' element={<NoteApp />} />
      </Routes>
    </div>
  );
}

export default App;