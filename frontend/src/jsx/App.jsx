import { useState } from "react";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  useNavigate,
} from "react-router-dom";
import Home from "./Home.jsx";
import UserLogin from "./UserLogin.jsx";
import AdminLogin from "./AdminLogin.jsx";
import UserHome from "./UserHome.jsx";

function App() {
  // Initialize the navigate function
  const navigate = useNavigate();

  // Function to navigate to UserLogin component
  const goToUserLogin = () => {
    navigate("/userlogin");
  };

  // Function to navigate to AdminLogin component
  const goToAdminLogin = () => {
    navigate("/admin");
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar navbar-light bg-light">
        <div className="navbar-brand">
          <img
            src=".\src\assets\fitnessicon.png"
            height="40"
            width="auto"
            className="d-inline-block align-top"
            alt=""
          />
        </div>
        <div className="navbar-brand">
          <button className="btn btn-light" onClick={goToUserLogin}>
            User Login
          </button>
        </div>
        <div className="navbar-brand">
          <button className="btn btn-light" onClick={goToAdminLogin}>
            Admin Login
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/userlogin" element={<UserLogin />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/userhome" element={<UserHome />} />
        </Routes>
      </div>

      {/* FOOTER */}
      <div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <p className="col-md-4 mb-0 text-body-secondary">
            © 2024 Fitness Tracker, Inc
          </p>

          <a
            href="/"
            className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
          >
            <svg className="bi me-2" width="40" height="32">
              <use xlinkHref="#bootstrap"></use>
            </svg>
          </a>

          <ul className="nav col-md-4 justify-content-end">
            <li className="nav-item">
              <a href="#" className="nav-link px-2 text-body-secondary">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-2 text-body-secondary">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-2 text-body-secondary">
                Pricing
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-2 text-body-secondary">
                FAQs
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-2 text-body-secondary">
                About
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </>
  );
}

export default App;
