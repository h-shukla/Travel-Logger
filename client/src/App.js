import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Communities from './components/Communities';
import About from './components/About';
import Contact from './components/Contact';
import Profile from './components/Profile';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <div className="content-section">
                    <Routes >
                        <Route index element={<Landing />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/communities" element={<Communities />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
