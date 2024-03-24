import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../css/UserHome.css"; // Import CSS file for styling

function UserHome() {
  const [username, setUsername] = useState(Cookies.get("username"));
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch("http://localhost:5282/api/User");
      const data = await response.json();
      const currentUser = data.find((user) => user.username === username);
      setUser(currentUser);
      setLoading(false); // Set loading to false after user data is fetched
      console.log("User received:", currentUser);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  // Log the username
  console.log("Username:", username);

  // Display loading indicator if data is still loading
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="background-image">
        <h1 className="greeting">Hello, {user.firstname}!</h1>
        <div className="report">
          <h2 className="report-title">Daily Report</h2>
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
              <strong>Body Fat %:</strong> {user.bodyFatPct}
            </li>
            <li>
              <strong>Target Body Fat %:</strong> {user.targetBfp}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UserHome;
