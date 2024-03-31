import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../css/UserHome.css"; // Import CSS file for styling

function UserHome() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(Cookies.get("username"));
  const [user, setUser] = useState({});
  const [PRs, setPRs] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status
  const [backgroundIMGs, setBackGroundIMGs] = useState([
    "https://img.freepik.com/free-photo/young-happy-sportswoman-getting-ready-workout-tying-shoelace-fitness-center_637285-470.jpg?size=626&ext=jpg&ga=GA1.1.2082370165.1711238400&semt=sph",
    "https://i0.wp.com/www.muscleandfitness.com/wp-content/uploads/2019/07/Hands-Clapping-Chaulk-Kettlebell.jpg?quality=86&strip=all",
    "https://thumbs.dreamstime.com/b/closeup-portrait-muscular-man-workout-barbell-gym-brutal-bodybuilder-athletic-six-pack-perfect-abs-shoulders-55122231.jpg",
    "https://i0.wp.com/www.muscleandfitness.com/wp-content/uploads/2016/09/Bodybuilder-Working-Out-His-Upper-Body-With-Cable-Crossover-Exercise.jpg?quality=86&strip=all",
  ]);

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

  const getRandomBackgroundImg = () => {
    const randomIndex = Math.floor(Math.random() * backgroundIMGs.length);
    return backgroundIMGs[randomIndex];
  };

  const fetchUser = async () => {
    try {
      const response = await fetch("http://localhost:5282/api/User");
      const data = await response.json();
      const currentUser = data.find((user) => user.username === username);
      if (user.measurementSystem == "imperial") {
        convertToImperial(currentUser);
      } else {
        convertToImperial(currentUser);
        setUser(currentUser);
      }
      console.log("User received:", currentUser);
      updateLastDayCalories()
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

  const convertToImperial = (currentUser) => {
    currentUser.weight = currentUser.weight = parseFloat(
      (currentUser.weight * 2.20462).toFixed(2)
    );
    currentUser.targetWeight = currentUser.targetWeight = parseFloat(
      (currentUser.targetWeight * 2.20462).toFixed(2)
    );
    currentUser.height = parseFloat((currentUser.height * 0.393701).toFixed(2));
    console.log("converted user: ", currentUser);
    setUser(currentUser);
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

  const updateLastDayCalories = async () => {
    const lastDayCaloriesDate = new Date(user.lastDayCalories);
    const today = new Date();

    if (lastDayCaloriesDate.toDateString() === today.toDateString()) {
      // The lastDayCalories date is equal to today's date
      user.lastDayCalories = new Date().toISOString(); // Update lastDayCalories to current datetime

      try {
        const response = await fetch(
          `http://localhost:5282/api/user/${user.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user), // Send updated user object as the request body
          }
        );

        if (response.ok) {
          // User data updated successfully
          const data = await response.json();
          console.log("User data updated:", data);
        } else {
          console.error("Failed to update user data:", response.statusText);
        }
      } catch (error) {
        console.error("Error updating user data:", error);
      }
    }
  };



  // Display loading indicator if data is still loading
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="main-home-container">
        <div className="left-home-container">
          <div className="left-background-image">
            <h1 className="greeting">Hello, {user.firstname}!</h1>
            <div className="report">
              <h2 className="report-title">Daily Report</h2>
              {user.measurementSystem === "imperial" ? (
                <ul>
                  <li>
                    <strong>Calorie Target:</strong> {user.targetCalories}
                  </li>
                  <li>
                    <strong>Current Weight:</strong> {user.weight}lbs
                  </li>
                  <li>
                    <strong>Body Fat Percentage:</strong> {user.bodyFatPct}%
                  </li>
                </ul>
              ) : (
                <ul>
                  <li>
                    <strong>Calorie Target:</strong> {user.targetCalories}
                  </li>
                  <li>
                    <strong>Current Weight:</strong> {user.weight}kg
                  </li>
                  <li>
                    <strong>Body Fat Percentage:</strong> {user.bodyFatPct}%
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>

        <div
          className="right-home-container"
          style={{ backgroundImage: `url(${getRandomBackgroundImg()})` }}
        >
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
            <button
              className="btn btn-primary"
              id="more-pr-btn"
              onClick={navigateToPrs}
            >
              See more about PRs
            </button>
          </div>
          <div className="bottom-container">
            <h4 className="right-heading">Your Daily Content</h4>
            <p>
              Calories today: {user.caloriesToday} / {user.targetCalories}
            </p>
            <p>
              Current weight goal: {user.weight} → {user.targetWeight}
            </p>
            <p>
              Current body fat % goal: {user.bodyFatPct}% → {user.targetBfp}%
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserHome;
