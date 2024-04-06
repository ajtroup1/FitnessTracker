import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "../css/App.css";
import Home from "./Home.jsx";
import UserLogin from "./UserLogin.jsx";
import AdminLogin from "./AdminLogin.jsx";
import UserHome from "./UserHome.jsx";
import PR from "./PR.jsx";
import Signup from "./Signup.jsx";
import Cookies from "js-cookie";

function App() {
  // Initialize the navigate function
  const navigate = useNavigate();
  const location = useLocation();
  const [navbarType, setNavbarType] = useState("");

  useEffect(() => {
    getNavbarType();
  }, [location]);

  const getNavbarType = () => {
    const currentpagepath = location.pathname;
    if (
      Cookies.get("username") == null ||
      currentpagepath === "/userlogin" ||
      currentpagepath === "/adminlogin" ||
      currentpagepath === "/home" ||
      currentpagepath === "/"
    ) {
      setNavbarType("not-logged-in");
    } else if (currentpagepath === "/adminhome") {
      setNavbarType("admin");
    } else if (
      currentpagepath === "/userhome" ||
      currentpagepath === "/pr" ||
      currentpagepath === "/meals"
    ) {
      setNavbarType("user");
    }
  };

  const goToHome = () => {
    navigate("/");
  };

  // Function to navigate to UserLogin component
  const goToUserLogin = () => {
    navigate("/userlogin");
  };

  // Function to navigate to AdminLogin component
  const goToAdminLogin = () => {
    navigate("/admin");
  };

  //Navigate to user pages
  const goToPr = () => {
    navigate("/pr");
  };
  const goToUserHome = () => {
    navigate("/userhome");
  };

  return (
    <>
      {/* NAVBAR */}
      {navbarType === "not-logged-in" && (
        <nav className="navbar navbar-light bg-light">
          <div className="navbar-brand">
            <img
              src=".\src\assets\fitnessicon.png"
              height="40"
              width="auto"
              className="d-inline-block align-top"
              alt=""
            />
            <button className="btn btn-light" onClick={goToHome}>
              Home
            </button>
            <button className="btn btn-light" onClick={goToAdminLogin}>
              Admin Login
            </button>
            <button className="btn btn-light" onClick={goToUserLogin}>
              User Login
            </button>
          </div>
        </nav>
      )}
      {navbarType === "user" && (
        <nav className="navbar navbar-light bg-light">
          <div className="navbar-brand">
            <img
              src=".\src\assets\fitnessicon.png"
              height="40"
              width="auto"
              className="d-inline-block align-top"
              alt=""
            />
            <button className="btn btn-light" onClick={goToUserHome}>
              Home
            </button>
            <button className="btn btn-light" onClick={goToPr}>
              PRs
            </button>
            <button className="btn btn-light" onClick={goToUserLogin}>
              Logout
            </button>
          </div>
        </nav>
      )}
      {navbarType === "admin" && (
        <nav className="navbar navbar-light bg-light">
          <div className="navbar-brand">
            <img
              src=".\src\assets\fitnessicon.png"
              height="40"
              width="auto"
              className="d-inline-block align-top"
              alt=""
            />
            <button className="btn btn-light" onClick={goToAdminLogin}>
              Lougout
            </button>
          </div>
        </nav>
      )}

      {/* MAIN CONTENT */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/userlogin" element={<UserLogin />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/userhome" element={<UserHome />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pr" element={<PR />} />
        </Routes>
      </div>

      {/* FOOTER */}
      <footer className="footer d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <p className="col-md-4 mb-0 text-body-secondary">
          © 2024 Fitness Tracker, Inc
        </p>

        <a
          href="/"
          className="col-md-2 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
        >
          <svg className="bi me-2" width="200" height="32">
            <use xlinkHref="#bootstrap"></use>
          </svg>
        </a>

        <ul className="nav col-md-6 justify-content-end">
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
    </>
  );
}

export default App;
