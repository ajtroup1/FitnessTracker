import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import "../css/Signup.css";

function Signup() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <>
      <h1>Create an Account!</h1>
      <div className="content-container">
        <div className="img-container">
          <img
            src="https://dm0qx8t0i9gc9.cloudfront.net/watermarks/image/rDtN98Qoishumwih/graphicstock-back-view-of-happy-excited-young-people-holding-hands-and-jumping-in-the-air-outdoors_BOZeZcrnx_SB_PM.jpg"
            className="signup-img"
          />
        </div>
        <div className="right-container">
          <div className="login-link">
            <Link to="/userlogin"> Back to login </Link>
          </div>
          <div className="form-container">
            <form>
              <div className="form-group">
                <div className="names-container">
                  <div className="form-group">
                    <label htmlFor="firstname">First Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstname"
                      aria-describedby="First Name"
                      placeholder="Enter First Name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastname">Last Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastname"
                      aria-describedby="Last Name"
                      placeholder="Enter Last Name"
                    />
                  </div>
                </div>
              </div>
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
              <div className="form-group">
                <label htmlFor="conf-password">Confirm Password:</label>
                <input
                  type="password"
                  className="form-control"
                  id="conf-password"
                  placeholder="Confirm Password"
                />
              </div>
              <button
                type="button"
                className="btn btn-primary"
                // onClick={() => checkCredentials()}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="clearfix"></div>
      </div>
    </>
  );
}

export default Signup;
