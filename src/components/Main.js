import React from "react";

const Main = () => {
  const train = () => {
    console.log("train");
  };

  const test = () => {
    console.log("test");
  };

  const load = () => {
    console.log("load");
  };

  const save = () => {
    console.log("save");
  };

  const predict = () => {
    console.log("predict");
  };

  return (
    <div className="container">
      <div className="section">
        <div className="row">
          <div className="col s12 m6">
            <div className="icon-block">
              <h3 className="center light-blue-text">
                <i className="material-icons">build</i>
              </h3>
              <h5 className="center">Train & Test</h5>

              <p className="light"></p>

              <div>
                <p>
                  <p>Training status:</p>
                </p>
                <pre className="grey lighten-4">
                  <em id="model-status">Loading data...</em>
                </pre>

                <p>
                  <p>Testing status:</p>
                </p>
                <pre className="grey lighten-4">
                  <em id="testing-status">Not yet tested</em>
                </pre>

                <button
                  autoComplete="off"
                  id="train-button"
                  className="waves-effect light-blue waves-light btn"
                  disabled
                  onClick={train}
                >
                  Train New Model
                </button>
                <button
                  autoComplete="off"
                  id="test-button"
                  className="waves-effect light-blue waves-light btn"
                  disabled
                  onClick={test}
                >
                  Test Model
                </button>
              </div>
              <br />

              <div>
                <button
                  autoComplete="off"
                  id="load-button"
                  className="waves-effect light-blue waves-light btn-small"
                  disabled
                  onClick={load}
                >
                  Load Model
                </button>
                <button
                  autoComplete="off"
                  id="save-button"
                  className="waves-effect light-blue waves-light btn-small"
                  disabled
                  onClick={save}
                >
                  Save Model
                </button>
              </div>
            </div>
          </div>

          <div className="col s12 m6">
            <div className="icon-block">
              <h3 className="center light-blue-text">
                <i className="material-icons">timeline</i>
              </h3>
              <h5 className="center">Predict</h5>

              <label>
                Square feet of living space:{" "}
                <input type="number" id="prediction-input" placeholder="2000" />
              </label>
              <button
                autoComplete="off"
                id="predict-button"
                className="waves-effect light-blue waves-light btn"
                disabled
                onClick={predict}
              >
                Predict house price
              </button>
              <p>
                <strong id="prediction-output"></strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
