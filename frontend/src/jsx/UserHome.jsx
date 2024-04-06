import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../css/UserHome.css"; // Import CSS file for styling

function UserHome() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(Cookies.get("username"));
  const [user, setUser] = useState({
    bodyFatPct: 0,
    caloriesToday: 0,
    dateOfBirth: "",
    firstname: "",
    height: 0,
    id: 0,
    lastDayCalories: "",
    lastname: "",
    measurementSystem: "",
    password: "",
    pictureLink: "",
    signUpDate: "",
    targetBfp: 0,
    targetCalories: 0,
    targetWeight: 0,
    username: "",
    weight: 0,
  });
  const [editedUser, setEditedUser] = useState({
    bodyFatPct: 0,
    caloriesToday: 0,
    dateOfBirth: "",
    firstname: "",
    height: 0,
    id: 0,
    lastDayCalories: "",
    lastname: "",
    measurementSystem: "",
    password: "",
    pictureLink: "",
    signUpDate: "",
    targetBfp: 0,
    targetCalories: 0,
    targetWeight: 0,
    username: Cookies.get("username"),
    weight: 0,
  });
  const [PRs, setPRs] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.clear();
    fetchUser();
  }, []);

  useEffect(() => {
    if (user.id !== undefined) {
      fetchPR();
    }
  }, [user]);

  const navigateToPrs = () => {
    navigate("/pr");
  };
  const navigateToUserHome = () => {
    navigate("/userhome");
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = (param) => {
    if (param === "edit-user") {
      setIsModalOpen(true);
      setEditedUser(user); // Set edited user state to current user state
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = editedUser;
    setUser(editedUser); // Update user state with edited user data

    // If measurement system is imperial, convert to metric before sending
    if (editedUser.measurementSystem === "imperial") {
      convertToMetric(editedUser);
    }

    const url = `http://localhost:5282/api/User/${editedUser.id}`;
    const options = {
      method: "PUT",
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
      closeModal();
    }
  };

  const fetchUser = async () => {
    try {
      const response = await fetch("http://localhost:5282/api/User");
      const data = await response.json();
      const currentUser = data.find((user) => user.username === username);
      if (currentUser.measurementSystem === "imperial") {
        convertToImperial(currentUser);
      } else {
        setUser(currentUser);
      }
      console.log("User received:", currentUser);

      // Update lastDayCalories and caloriesToday
      const today = new Date().toISOString().split("T")[0];
      if (currentUser.lastDayCalories.split("T")[0] !== today) {
        currentUser.lastDayCalories = today;
        currentUser.caloriesToday = 0;
      }

      setUser(currentUser);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const fetchPR = async () => {
    try {
      const response = await fetch("http://localhost:5282/api/personalrecord");
      const data = await response.json();

      // Convert prDate strings to Date objects and extract only the date part
      const formattedData = data.map((item) => ({
        ...item,
        prDate: new Date(item.prDate).toLocaleDateString(),
      }));

      // Filter the data array to get only the items with matching user ID
      const userPRs = formattedData.filter((pr) => pr.userID === user.id);

      setLoading(false); // Set loading to false after user data is fetched
      setPRs(userPRs);
    } catch (error) {
      console.error("Error fetching PRs:", error);
    }
  };

  const convertToImperial = (currentUser) => {
    currentUser.weight = currentUser.weight = parseFloat(
      (currentUser.weight * 2.20462).toFixed(2)
    );
    currentUser.targetWeight = currentUser.targetWeight = parseFloat(
      (currentUser.targetWeight * 2.20462).toFixed(2)
    );
    currentUser.height = parseFloat((currentUser.height * 0.393701).toFixed(2));
    console.log("converted imperial user: ", currentUser);
    setUser(currentUser);
  };

  const convertToMetric = (editedUser) => {
    editedUser.weight = parseFloat((editedUser.weight / 2.20462).toFixed(2));
    editedUser.targetWeight = parseFloat(
      (editedUser.targetWeight / 2.20462).toFixed(2)
    );
    editedUser.height = parseFloat((editedUser.height / 0.393701).toFixed(2));
    console.log(
      "new weight: ",
      editedUser.weight,
      " / new target: ",
      editedUser.targetWeight
    );
  };

  function getIcon(prType) {
    switch (prType) {
      case "weight":
        return (
          <img
            src="../src/assets/weights.png"
            alt="Weight Icon"
            className="fitness-icon"
          />
        );
      case "run":
        return (
          <img
            src="../src/assets/running.png"
            alt="Run Icon"
            className="fitness-icon"
          />
        );
      case "speed":
        return (
          <img
            src="../src/assets/running.png"
            alt="Speed Icon"
            className="fitness-icon"
          />
        );
      default:
        return (
          <img
            src="../src/assets/misc.png"
            alt="Misc Icon"
            className="fitness-icon"
          />
        );
    }
  }

  // Function to get a random PR for each prType for table
  const getRandomPRs = () => {
    const uniquePrTypes = [...new Set(PRs.map((pr) => pr.prType))]; // Get unique prTypes
    const randomPRs = uniquePrTypes.map((prType) => {
      const prsOfType = PRs.filter((pr) => pr.prType === prType); // Get all PRs of a specific prType
      const randomIndex = Math.floor(Math.random() * prsOfType.length); // Get a random index
      return prsOfType[randomIndex]; // Return a random PR of the prType
    });
    return randomPRs;
  };

  // Display loading indicator if data is still loading
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isModalOpen && (
        <div id="modal">
          <div id="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <form>
              <div className="form-column">
                <div className="form-group">
                  <label htmlFor="firstname">Username:</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={editedUser && editedUser.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="firstname">First Name:</label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    value={editedUser && editedUser.firstname}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastname">Last Name:</label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    value={editedUser && editedUser.lastname}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="targetCalories">Target Calories:</label>
                  <input
                    type="number"
                    id="targetCalories"
                    name="targetCalories"
                    style={{ width: "100%" }}
                    value={editedUser && editedUser.targetCalories}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div
                  className="left-column"
                  style={{ float: "left", width: "45%" }}
                >
                  <div className="form-column">
                    <div className="form-group">
                      <label htmlFor="bodyFatPct">Body Fat %:</label>
                      <input
                        type="number"
                        id="bodyFatPct"
                        name="bodyFatPct"
                        style={{ width: "100%" }}
                        value={editedUser && editedUser.bodyFatPct}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="weight">Weight:</label>
                      <input
                        type="number"
                        id="weight"
                        name="weight"
                        value={editedUser && editedUser.weight}
                        style={{ width: "100%" }}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="right-column"
                  style={{ float: "right", width: "45%" }}
                >
                  <div className="form-column">
                    <div className="form-group">
                      <label htmlFor="targetBfp">Target Body Fat %:</label>
                      <input
                        type="number"
                        id="targetBfp"
                        name="targetBfp"
                        style={{ width: "100%" }}
                        value={editedUser && editedUser.targetBfp}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="targetWeight">Target Weight:</label>
                    <input
                      type="number"
                      id="targetWeight"
                      name="targetWeight"
                      style={{ width: "100%" }}
                      value={editedUser && editedUser.targetWeight}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div style={{ clear: "both", marginTop: "20px" }}></div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
                style={{ width: "100%" }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="main-home-container">
        <div
          className="left-home-container"
          style={{
            backgroundImage: `url(https://i0.wp.com/www.muscleandfitness.com/wp-content/uploads/2016/09/Bodybuilder-Working-Out-His-Upper-Body-With-Cable-Crossover-Exercise.jpg?quality=86&strip=all)`,
          }}
        >
          <h3>Hello, {user.firstname}</h3>
          <div className="daily-content">
            <h4 className="right-heading">Your Daily Content</h4>
            {user.measurementSystem === "imperial" && (
              <>
                <p>
                  Calories today: {user.caloriesToday} / {user.targetCalories}{" "}
                </p>
                <p>
                  Current weight goal: {user.weight}lbs → {user.targetWeight}lbs{" "}
                </p>
                <p>
                  Current body fat % goal: {user.bodyFatPct}% → {user.targetBfp}
                  %
                </p>
                <span
                  className="edit-text"
                  onClick={() => openModal("edit-user")}
                  style={{
                    color: "white",
                    fontStyle: "italic",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  Want to edit your user information?
                </span>
              </>
            )}
            {user.measurementSystem === "metric" && (
              <>
                <p>
                  Calories today: {user.caloriesToday} / {user.targetCalories}{" "}
                </p>
                <p>
                  Current weight goal: {user.weight}kg → {user.targetWeight}kg{" "}
                </p>
                <p>
                  Current body fat % goal: {user.bodyFatPct}% → {user.targetBfp}
                  %
                </p>
                <span
                  className="edit-text"
                  onClick={() => openModal("edit-user")}
                  style={{
                    color: "white",
                    fontStyle: "italic",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  Want to edit your user information?
                </span>
              </>
            )}
          </div>
        </div>

        <div className="right-home-container">
          <div className="top-container">
            <h4 className="right-heading">Your PRs</h4>
            <div className="pr-table-container">
              <table className="pr-table">
                <thead>
                  <tr>
                    <th>Icon</th>
                    <th>Name</th>
                    <th>PR</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(
                    PRs.reduce((randomPRs, pr) => {
                      if (!randomPRs[pr.prType] || Math.random() < 0.5) {
                        randomPRs[pr.prType] = pr;
                      }
                      return randomPRs;
                    }, {})
                  ).map((pr) => (
                    <tr key={pr.id}>
                      <td>{getIcon(pr.prType)}</td>
                      <td>{pr.workoutName}</td>
                      <td>
                        {pr.prType === "weight"
                          ? pr.weight
                          : pr.prType === "run"
                          ? pr.distance
                          : pr.speed}
                      </td>
                      <td>{new Date(pr.prDate).toLocaleDateString("en-US")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <span
              className="more-pr-text"
              onClick={navigateToPrs}
              style={{
                color: "white",
                fontStyle: "italic",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              View more PRs
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserHome;
