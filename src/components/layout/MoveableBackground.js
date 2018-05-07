// Node Modules

import React, { Component } from "react";

// Enviroment Settings

import bgImage from "../../assets/Home/background.jpg";
import "../../styles/MoveableBackground.css";

// Component Code

const CLASS = "top-MoveableBackground";

class MoveableBackground extends Component {
  render() {
    return (
      <div className={CLASS}>
        <div className="floating">
          <div className="tossing">
            <img
              className="backgroundImageMoveable"
              src={bgImage}
              alt="Background"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MoveableBackground;
