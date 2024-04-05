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
              <img
                src="../src/assets/fitnessicon.png"
                alt="Fitness Incorporated"
              />
              <h2>
                Fitness Incorporated
                <span className="registered-trademark">&#174;</span>
              </h2>
            </div>
          </div>
          <div className="right-container">
            <div className="image-grid">
              <div className="grid-item">
                <img src="../src/assets/running.png" alt="Image 1" />
              </div>
              <div className="grid-item">
                <img src="../src/assets/weights.png" alt="Image 2" />
              </div>
              <div className="grid-item">
                <img src="../src/assets/misc.png" alt="Image 3" />
              </div>
              <div className="grid-item">
                <img src="../src/assets/fitnessicon.png" alt="Image 4" />
              </div>
            </div>
          </div>
        </div>

        {/* SATISFIED CUSTOMERS */}
        <div className="satisfaction">
          <h3>Wow! Just look at these satisfied customers.</h3>
          <div className="customer-imgs">
            <div class="customer">
              <img
                src="../src/assets/satisfiedcustomer2.png"
                alt="Customer 2"
              />
              <p>
                Dave is now in shape thanks to the Fitness Tracker. His wife
                will never leave him again!
              </p>
            </div>
            <div class="customer">
              <img
                src="../src/assets/satisfiedcustomer1.png"
                alt="Customer 1"
              />
              <p>
                Shannon enjoys tracking her workouts. She also loves the meal
                tracker helping her keep up with her nutrition
              </p>
            </div>
            <div class="customer">
              <img
                src="../src/assets/satisfiedcustomer3.png"
                alt="Customer 3"
              />
              <p>Wow, Jared is so excited he just lost 200 and 50 pounds. </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
