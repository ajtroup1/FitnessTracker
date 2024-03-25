import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../css/UserHome.css"; // Import CSS file for styling

function UserHome() {
  const [username, setUsername] = useState(Cookies.get("username"));
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true); // State to track loading status
  const [backgroundIMGs, setBackGroundIMGs] = useState([
    "https://static.vecteezy.com/system/resources/thumbnails/000/680/562/small/black-and-red-abstract-cut-paper-background.jpg",
    "https://img.freepik.com/free-photo/young-happy-sportswoman-getting-ready-workout-tying-shoelace-fitness-center_637285-470.jpg?size=626&ext=jpg&ga=GA1.1.2082370165.1711238400&semt=sph",
    "https://i0.wp.com/www.muscleandfitness.com/wp-content/uploads/2019/07/Hands-Clapping-Chaulk-Kettlebell.jpg?quality=86&strip=all",
    "https://thumbs.dreamstime.com/b/closeup-portrait-muscular-man-workout-barbell-gym-brutal-bodybuilder-athletic-six-pack-perfect-abs-shoulders-55122231.jpg",
    "https://i0.wp.com/www.muscleandfitness.com/wp-content/uploads/2016/09/Bodybuilder-Working-Out-His-Upper-Body-With-Cable-Crossover-Exercise.jpg?quality=86&strip=all",
  ]);

  useEffect(() => {
    fetchUser();
  }, []);

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
      setLoading(false); // Set loading to false after user data is fetched
      console.log("User received:", currentUser);
    } catch (error) {
      console.error("Error fetching user:", error);
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

  // Log the username
  console.log("Username:", username);

  // Display loading indicator if data is still loading
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="main-home-container">
        <div className="left-home-container">
          <div className="background-image">
            <h1 className="greeting">Hello, {user.firstname}!</h1>
            <div className="report">
              <h2 className="report-title">Daily Report</h2>
              {user.measurementSystem === "imperial" ? (
                <ul>
                  <li>
                    <strong>Calorie Target:</strong> {user.targetCalories}
                  </li>
                  <li>
                    <strong>Current Weight:</strong> {user.weight}
                  </li>
                  <li>
                    <strong>Target Weight (lbs):</strong> {user.targetWeight}
                  </li>
                  <li>
                    <strong>Body Fat Percentage:</strong> {user.bodyFatPct}%
                  </li>
                  <li>
                    <strong>Target BFP:</strong> {user.targetBfp}%
                  </li>
                </ul>
              ) : (
                <ul>
                  <li>
                    <strong>Calorie Target:</strong> {user.targetCalories}
                  </li>
                  <li>
                    <strong>Target Weight (kilos):</strong> {user.targetWeight}
                  </li>
                  <li>
                    <strong>Current Weight:</strong> {user.weight}
                  </li>
                  <li>
                    <strong>Body Fat Percentage:</strong> {user.bodyFatPct}%
                  </li>
                  <li>
                    <strong>Target BFP:</strong> {user.targetBfp}%
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>

        <div
          className="right-home-container"
          style={{
            backgroundImage: `url(${getRandomBackgroundImg()})`,
            backgroundSize: "cover",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div className="right-img-div">
            <div className="pr-container">
              <h4>Display PR's here</h4>
            </div>
            <div className="daily-container">
              <h4>Display daily content here</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserHome;
