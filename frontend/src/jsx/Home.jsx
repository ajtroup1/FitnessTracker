import { useState, useEffect } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import "../css/Home.css";

function Home() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <>
      <div className="home">
        <div className="background-container">
          <div className="left-container">
            <div className="content">
              <h1>Start Your Fitness Journey With Us!</h1>
              <p className="description">
                Start your fitness journey today with our comprehensive fitness
                app. Whether you're a beginner or an experienced athlete, we
                have everything you need to achieve your fitness goals.
              </p>
            </div>
          </div>
          <div className="right-container">Something here</div>
        </div>

        {/* SATISFIED CUSTOMERS */}
        <div className="customer-imgs">
          <img src="../src/assets/satisfiedcustomer1.jpg"></img>
          <img src="../src/assets/satisfiedcustomer2.png"></img>
          <img src="../src/assets/satisfiedcustomer3.png"></img>
        </div>
      </div>
    </>
  );
}

export default Home;
