import './App.css';
import Auth from '../hoc/auth'
import {
    BrowserRouter,
    Route,
    Routes,

    //Link
} from 'react-router-dom';

import LandingPage from './views/LandingPage/LandingPage';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';

function App() {
    
    const NewLandingPage = Auth(LandingPage, null)
    const NewLoginPage = Auth(LoginPage, false)
    const NewRegisterPage = Auth(RegisterPage, false)
    
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<NewLandingPage />} />

                <Route exact path="/login" element={<NewLoginPage />} />

                <Route exact path="/register" element={<NewRegisterPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;