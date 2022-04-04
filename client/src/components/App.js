import './App.css';
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
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<LandingPage />} />

                <Route exact path="/login" element={<LoginPage />} />

                <Route exact path="/register" element={<RegisterPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;