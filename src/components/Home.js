import React from "react";
import Background from "./Background";
import "../App.css";

export default function Home() {
  return (
    <>
      <Background />

      <p className="prompt">
        -- Use orbital controls to explore the animated model.
      </p>
      <p className="prompt">
        -- This animation was made with THREE.js and Blender.
      </p>
    </>
  );
}
