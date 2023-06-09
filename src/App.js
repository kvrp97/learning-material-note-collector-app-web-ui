import './App.css';
import LogIn from './pages/login/LogIn';
import { Navigate, Route, Routes } from 'react-router-dom';
import NoteApp from './pages/noteApp/NoteApp';
import SignUp from './pages/signUp/SignUp';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';

function App() {

  const loggedWithRemember = JSON.parse(localStorage.getItem('loggedWithRemember'));

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={loggedWithRemember ? <Navigate to="/note" /> : <Navigate to="/login" />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/note' element={
          <ProtectedRoute>
            <NoteApp />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;