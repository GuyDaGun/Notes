import { useEffect, useState } from 'react';
import LoginModel from './components/LoginModel';
import NavBar from './components/NavBar';
import SignUpModel from './components/SignUpModel';
import { User } from './models/user';
import * as NotesApi from './network/notes_api';
import './styles/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NotesPage from './pages/NotesPage';
import PrivacyPage from './pages/PrivacyPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await NotesApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  }, []);

  return (
    <BrowserRouter>
    <div>
      <NavBar
        loggedInUser={loggedInUser}
        onLoginClicked={() => setShowLoginModal(true)}
        onLogoutSuccessful={() => setLoggedInUser(null)}
        onSignUpClicked={() => setShowSignUpModal(true)}
      />

      <Container className='pageContainer'>
        <Routes>
          <Route 
          path='/'
          element={<NotesPage loggedInUser={loggedInUser}/>}
          />
          <Route path='/privacy' element={<PrivacyPage />} />
          <Route path='/*' element={<NotFoundPage />} />
        </Routes>
      </Container>

      {showSignUpModal && (
        <SignUpModel
          onDismiss={() => setShowSignUpModal(false)}
          onSignUpSuccessful={(user) => {
            setLoggedInUser(user);
            setShowSignUpModal(false);
            setShowLoginModal(false);
          }}
        />
      )}

      {showLoginModal && (
        <LoginModel
          onDismiss={() => setShowLoginModal(false)}
          onLoginSuccessful={(user) => {
            setLoggedInUser(user);
            setShowSignUpModal(false);
            setShowLoginModal(false);
          }}
        />
      )}
    </div>
    </BrowserRouter>
  );
}

export default App;
