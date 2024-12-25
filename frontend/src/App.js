import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LandingPage from './pages/landing';
import Authentication from './pages/authentication';
import { AuthProvider } from './contexts/AuthContext';
import VideoMeetComponent from './pages/videoMeet';
import Home from './pages/home';
import History from './pages/history';

function App() {
  return (
 <>
      <Router>
      <AuthProvider>
            <Routes>
                  <Route path='/' element={<LandingPage />} />
                  <Route path='/auth' element={<Authentication/>} />
                  <Route path='/:url' element={<VideoMeetComponent/>}/>
                  <Route path='/home' element={<Home/>}/>
                  <Route path='/history' element={<History/>}/>
            </Routes>
      </AuthProvider>
      </Router>
 </>
  );
}

export default App;
