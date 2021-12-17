import React from "react";

const Header = () => {
  const descriptionh5 = `Linear regression with TensorFlow.js`;
  const descriptionh6 = `Train a model to predict house price from living space.`;
  return (
    <div className="section no-pad-bot" id="index-banner">
      <div className="container">
        <h5 className="header center blue-text small">{descriptionh5}</h5>
        <div className="row center">
          <h6 className="header col s12 light">{descriptionh6}</h6>
        </div>
      </div>
    </div>
  );
};

export default Header;
