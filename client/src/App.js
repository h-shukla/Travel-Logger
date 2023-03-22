import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Communities from "./components/Communities";
import About from "./components/About";
import Contact from "./components/Contact";
import Profile from "./components/Profile";
import Community from "./components/Community";
import Admin from "./components/Admin";

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <div className="content-section">
                    <Routes>
                        <Route index element={<Landing />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/communities" element={<Communities />} />
                        <Route
                            path="/communities/:commId"
                            element={<Community />}
                        />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/admin" element={<Admin />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
