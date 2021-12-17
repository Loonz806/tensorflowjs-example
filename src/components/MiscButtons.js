import React from "react";
import * as tfvis from "@tensorflow/tfjs-vis";

const MiscButtons = () => {
  const toggleVisorText = `Toggle Visor`;
  // toggle the tfvis visor
  const toggleVisor = () => {
    tfvis.visor().toggle();
  };

  return (
    <div className="section no-pad-bot light-blue lighten-4">
      <div className="container">
        <div className="row center">
          <button
            id="toggle-button"
            className="waves-effect waves-light light-blue btn-small"
            onClick={toggleVisor}
          >
            {toggleVisorText}
          </button>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
};

export default MiscButtons;
