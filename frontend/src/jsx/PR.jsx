import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "../css/PR.css";

function PR() {
  const [username, setUsername] = useState(Cookies.get("username"));
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [PRs, setPRs] = useState([]);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container">
        <h1 className="text-center mt-4">Welcome, {user.firstname}!</h1>
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
