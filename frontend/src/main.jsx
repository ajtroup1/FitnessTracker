import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter

import App from "./jsx/App.jsx";
import "./css/index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      {" "}
      {/* Wrap your App component with Router */}
      <App />
    </Router>
  </React.StrictMode>
);
