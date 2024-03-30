import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import "../css/UserLogin.css";

function UserLogin() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5282/api/User");
      const data = await response.json();
      setUsers(data);
      console.log("Users received:", data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const checkCredentials = () => {
    const enteredUsername = document.getElementById("email").value;
    const enteredPassword = document.getElementById("password").value;

    let userFound = false;
    users.forEach((user) => {
      if (user.username === enteredUsername) {
        userFound = true;
        if (user.password === enteredPassword) {
          // Set cookie with username
          Cookies.set("username", enteredUsername);
          navigate("/userhome");
        } else {
          alert("Incorrect Password");
          document.getElementById("password").value = "";
        }
      }
    });

    if (!userFound) {
      alert("No account found with that username");
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
    }
  };

  return (
    <>
      <div className="content-container">
        <div className="img-container">
          <h4 className="header">User Login</h4>
          {/* Switched positions (floats) from signup page */}
          <div className="form-container">
            <form>
              <div className="form-group">
                <label htmlFor="email">Email address:</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="email"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                />
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => checkCredentials()}
              >
                Submit
              </button>
              <div className="signup-link">
                <Link to="/signup" style={{ fontStyle: "italic" }}>
                  {" "}
                  Don't have an account?{" "}
                </Link>
              </div>
            </form>
          </div>
        </div>
        <div className="right-container">
          <img
            src="https://media.istockphoto.com/id/1325578537/photo/happy-indian-mother-having-fun-with-her-daughter-outdoor-family-and-love-concept-focus-on-mum.jpg?s=612x612&w=0&k=20&c=oSkEIgp2zOGO-ILqE4-MbsIUKZUhKNPNSzrFpSRAUxM="
            className="userlogin-img"
          />
        </div>
        <div className="clearfix"></div>
      </div>
    </>
  );
}

export default UserLogin;
