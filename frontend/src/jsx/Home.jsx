import { useState, useEffect } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import "../css/Home.css";

function Home() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="background-container">
      <div className="background-img-container">
        <div className="gradient-overlay"></div>
      </div>
      <div className="content">
        <h1>This is the Home Page</h1>
        {/* Add more content here */}
      </div>
    </div>
  );
}

export default Home;
