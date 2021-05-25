import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <ul>
      <li className="nav-link">
        <Link to="/">Home</Link>
      </li>
      <li className="nav-link">
        <Link to="/projects">Projects</Link>
      </li>
    </ul>
  );
}
