import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "../css/PR.css";

function PR() {
  const [username, setUsername] = useState(Cookies.get("username"));
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [PRs, setPRs] = useState([]);
  const [currentPR, setCurrentPR] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    console.clear();
    fetchUser();
  }, []);

  useEffect(() => {
    if (user.id !== undefined) {
      fetchPR();
    }
  }, [user]);

  const fetchUser = async () => {
    try {
      const response = await fetch("http://localhost:5282/api/User");
      const data = await response.json();
      const currentUser = data.find((user) => user.username === username);
      if (user.measurementSystem === "imperial") {
        convertToImperial(currentUser);
      } else {
        convertToImperial(currentUser);
        setUser(currentUser);
      }
      console.log("User received:", currentUser);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const fetchPR = async () => {
    try {
      const response = await fetch("http://localhost:5282/api/personalrecord");
      const data = await response.json();
      console.log("ALL PR", data);

      // Convert prDate strings to Date objects and extract only the date part
      const formattedData = data.map((item) => ({
        ...item,
        prDate: new Date(item.prDate).toLocaleDateString(),
      }));

      // Filter the data array to get only the items with matching user ID
      const userPRs = formattedData.filter((pr) => pr.userID === user.id);

      console.log("User PRs:", userPRs); // Log user PRs for debugging

      setLoading(false); // Set loading to false after user data is fetched
      console.log("PRs received:", userPRs);
      setPRs(userPRs);
    } catch (error) {
      console.error("Error fetching PRs:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentPR({
      ...currentPR,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = currentPR;

    const url = "http://localhost:5282/api/personalrecord";
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
      alert("PR added successfully!");
    }
  };

  const convertToImperial = (currentUser) => {
    currentUser.weight = parseFloat((currentUser.weight * 2.20462).toFixed(2));
    currentUser.targetWeight = parseFloat(
      (currentUser.targetWeight * 2.20462).toFixed(2)
    );
    currentUser.height = parseFloat((currentUser.height * 0.393701).toFixed(2));
    console.log("converted user: ", currentUser);
    setUser(currentUser);
  };

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function getPRValue(pr) {
    switch (pr.prType) {
      case "weight":
        return `${pr.weight} lbs`;
      case "run":
        return `${pr.distance} miles`;
      case "speed":
        return `${pr.speed} mph`;
      default:
        return "";
    }
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModel = (param) => {
    setIsModalOpen(true);
  };

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
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="workoutName">Workout Name:</label>
                <input
                  type="text"
                  id="workoutName"
                  name="workoutName"
                  value={currentPR.workoutName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="prType">PR Type:</label>
                <select
                  id="prType"
                  name="prType"
                  value={currentPR.prType}
                  onChange={handleChange}
                  required
                >
                  <option value="weight">Weight</option>
                  <option value="distance">Distance</option>
                  <option value="speed">Speed</option>
                  <option value="misc">Misc</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="prDate">PR Date:</label>
                <input
                  type="date"
                  id="prDate"
                  name="prDate"
                  value={currentPR.prDate}
                  onChange={handleChange}
                  required
                />
              </div>
              {currentPR.prType === "weight" && (
                <div className="form-group">
                  <label htmlFor="weight">Weight:</label>
                  <input
                    type="number"
                    id="weight"
                    name="weight"
                    value={currentPR.weight}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
              {currentPR.prType === "distance" && (
                <div className="form-group">
                  <label htmlFor="distance">Distance:</label>
                  <input
                    type="number"
                    id="distance"
                    name="distance"
                    value={currentPR.distance}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
              {currentPR.prType === "speed" && (
                <div className="form-group">
                  <label htmlFor="speed">Speed:</label>
                  <input
                    type="number"
                    id="speed"
                    name="speed"
                    value={currentPR.speed}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}

      <div className="container">
        <h1 className="text-center mt-4">Welcome, {user.firstname}!</h1>
        <div className="new-pr-container">
          <button className="btn btn-primary" onClick={openModel}>
            Just hit a new PR?
          </button>
        </div>
        <div className="pr-main-container">
          <div className="pr-table-container">
            <table className="table table-bordered table-striped">
              <thead className="thead-dark">
                <tr>
                  <th>PR Type</th>
                  <th>Workout Name</th>
                  <th>Amount</th>
                  <th>Date Completed</th>
                </tr>
              </thead>
              <tbody>
                {PRs.map((pr) => (
                  <tr key={pr.id}>
                    <td>{capitalizeFirstLetter(pr.prType)}</td>
                    <td>{pr.workoutName}</td>
                    <td>{getPRValue(pr)}</td>
                    <td>{pr.prDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default PR;
