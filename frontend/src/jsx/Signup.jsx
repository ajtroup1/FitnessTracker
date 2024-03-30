import { useState, useEffect } from "react";
import { useNavigate, Link, useActionData } from "react-router-dom";
import Cookies from "js-cookie";
import bcrypt from "bcryptjs";
import "../css/Signup.css";

function Signup() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postUser, setPostUser] = useState({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    dateOfBirth: "",
    height: 0,
    weight: 0,
    bodyFatPct: 0,
    measurementSystem: "metric",
    pictureLink: "",
    caloriesToday: 0,
    targetWeight: "",
    targetCalories: "",
    targetBfp: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (isModalOpen) {
      console.log("Modal opened", isModalOpen);
    }
  }, [isModalOpen]);

  //   useEffect(() => {
  //     fetchUsers();
  //   }, []);

  //   const fetchUsers = async () => {
  //     const url = "http://localhost:5282/api/User";
  //     const options = {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     };
  //     const response = await fetch(url, options);

  //     if (!response.ok) {
  //       const data = await response.json();
  //       alert(data.message);
  //     } else {
  //       console.log(response.json());
  //       alert("User retreived successfully!");
  //     }
  //   };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostUser({ ...postUser, [name]: value });
  };
  const handleConfPassChange = (e) => {
    setConfirmPassword(e.target);
  };

  const onSubmitMoreSignup = (e) => {
    e.preventDefault();
    if (checkFirstEmpty() == false) {
      alert("All fields must be filled to continue");
      document.getElementById("password").value = null;
      document.getElementById("conf-password").value = null;
      return 0;
    } else if (checkPassword() == false) {
      document.getElementById("password").value = null;
      document.getElementById("conf-password").value = null;
      return 0;
    }
    if (checkPassword() == true) {
      setIsModalOpen(true);
    }
  };

  const checkFirstEmpty = () => {
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("conf-password").value;
    if (!firstname || !lastname || !username || !password || !confirmPassword) {
      return false;
    } else {
      return true;
    }
  };

  const checkPassword = () => {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("conf-password").value;
    if (password != confirmPassword) {
      alert("Passwords must match");
      return false;
    } else if (password.length < 8) {
      alert("Password must be at least 8 characters");
      return false;
    }

    return true;
  };

  const onSubmitPostUser = async (e) => {
    e.preventDefault();
    hashPassword();
    formatName();
    if (checkSecondEmpty() == false) {
      alert("Please fill all required fields");
      return 0;
    }
    if (postUser.measurementSystem == "imperial") {
      convertToMetric();
    } else if (postUser.measurementSystem == "metric") {
      console.log("posting user: ", postUser);
    }

    const data = postUser;

    const url = "http://localhost:5282/api/User";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      const data = await response.json();
      alert(data.message);
    } else {
      Cookies.set("username", postUser.username);
      navigate("/userhome");
      alert("User created successfully!");
    }
  };

  const checkSecondEmpty = () => {
    const measurementSystem =
      document.getElementById("measurementSystem").value;
    const weight = document.getElementById("weight").value;
    const dateOfBirth = document.getElementById("dob").value;
    const height = document.getElementById("height").value;
    if (!weight || !dateOfBirth || !height || !confirmPassword) {
      return false;
    } else {
      return true;
    }
  };

  const hashPassword = async () => {
    const saltRounds = 10; // Number of salt rounds for hashing

    try {
      const hashedPassword = await bcrypt.hash(postUser.password, saltRounds); // Hashing the password
      let currentUser = postUser; // Updating the postUser with the hashed password
      currentUser.password = hashedPassword;
      setPostUser(currentUser);
    } catch (error) {
      console.error("Error hashing password:", error);
    }
  };

  const formatName = () => {
    let currentUser = postUser;
    currentUser.firstname =
      currentUser.firstname.charAt(0).toUpperCase() +
      currentUser.firstname.slice(1);
    currentUser.lastname =
      currentUser.lastname.charAt(0).toUpperCase() +
      currentUser.lastname.slice(1);
    setPostUser(currentUser);
  };

  const convertToMetric = () => {
    const heightInInches = parseInt(postUser.height);
    const weightInPounds = parseInt(postUser.weight);

    // Convert height to centimeters
    const heightInCentimeters = heightInInches * 2.54;

    // Convert weight to kilograms
    const weightInKilograms = weightInPounds * 0.453592;
    console.log("converted: ", heightInCentimeters, weightInKilograms);
    // Update the postUser object with metric values
    let currentUser = postUser;
    currentUser.height = heightInCentimeters;
    currentUser.weight = weightInKilograms;
    setPostUser(currentUser);
    console.log("posting user after conversion: ", currentUser);
  };

  return (
    <>
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
            <h1>Create an Account!</h1>
            <form onSubmit={onSubmitMoreSignup}>
              <div className="form-group">
                <div className="names-container">
                  <div className="form-group">
                    <label htmlFor="firstname">First Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstname"
                      name="firstname"
                      autoComplete="off"
                      aria-describedby="First Name"
                      placeholder="Enter First Name"
                      value={postUser.firstname}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastname">Last Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastname"
                      name="lastname"
                      autoComplete="off"
                      aria-describedby="Last Name"
                      placeholder="Enter Last Name"
                      value={postUser.lastname}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  autoComplete="off"
                  aria-describedby="Username"
                  placeholder="Enter username"
                  value={postUser.username}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Password"
                  autoComplete="off"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="conf-password">Confirm Password:</label>
                <input
                  type="password"
                  className="form-control"
                  id="conf-password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  autoComplete="off"
                  onChange={handleConfPassChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="clearfix"></div>
      </div>

      {/* MORE SIGNUP MODAL */}
      {isModalOpen && (
        <>
          <div className="modal">
            <div className="modal-content">
              <div className="form-container">
                <form onSubmit={onSubmitPostUser}>
                  <div className="names-container">
                    <div className="form-group">
                      <div className="profile-img-container">
                        {postUser.pictureLink != "" && (
                          <img
                            src={postUser.pictureLink}
                            className="profile-img"
                            alt="Profile Picture"
                          />
                        )}
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="profilePicture">Profile Picture:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="profilePicture"
                        name="pictureLink"
                        aria-describedby="Profile Picture"
                        placeholder="Enter Profile Picture IMG URL"
                        value={postUser.pictureLink}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="measurementSystem">
                      Measurement System:
                    </label>
                    <select
                      id="measurementSystem"
                      name="measurementSystem"
                      className="form-control"
                      onChange={handleChange}
                    >
                      <option value="metric">Metric</option>
                      <option value="imperial">Imperial</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <div className="names-container">
                      <div className="form-group">
                        <label htmlFor="weight">
                          Weight:{" "}
                          {postUser.measurementSystem === "imperial"
                            ? "(lbs)"
                            : "(kg)"}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="weight"
                          name="weight"
                          aria-describedby="Weight"
                          placeholder="Weight"
                          value={postUser.weight}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="targetweight">Target:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="targetweight"
                          name="targetWeight"
                          aria-describedby="Target Weight"
                          placeholder="Enter Target Weight"
                          value={postUser.targetWeight}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="names-container">
                      <div className="form-group">
                        <label htmlFor="bfp">Body Fat %:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="bfp"
                          name="bodyFatPct"
                          aria-describedby="bfp"
                          placeholder="Body Fat %"
                          value={postUser.bodyFatPct}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="targetbfp">Target:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="targetbfp"
                          name="targetBfp"
                          aria-describedby="Target BFP"
                          placeholder="Target Body Fat %"
                          value={postUser.targetBfp}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="dob">Date of Birth:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="dob"
                      name="dateOfBirth"
                      aria-describedby="Date of Birth"
                      placeholder="Enter Date of Birth"
                      value={postUser.dateOfBirth}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="height">
                      Height:{" "}
                      {postUser.measurementSystem === "imperial"
                        ? "(in)"
                        : "(cm)"}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="height"
                      name="height"
                      aria-describedby="Height"
                      placeholder="Enter Height"
                      value={postUser.height}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="targetcals">Target Calories:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="targetcals"
                      name="targetCalories"
                      aria-describedby="Target Calories"
                      placeholder="Enter Target Calories"
                      value={postUser.targetCalories}
                      onChange={handleChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Signup;
