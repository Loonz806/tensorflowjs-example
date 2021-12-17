import React from "react";
import * as tf from "@tensorflow/tfjs";
import tensorFlowJs from "../utils/exampleExercise";
import Header from "./Header";
import MiscButtons from "./MiscButtons";
import Main from "./Main";

const App = () => {
  // TODO: Exercise 1 Basic maths
  // const xs = tf.tensor1d([1, 2, 3]);
  // // const xs = tf.tensor([1, 2, 3], [3, 1]);
  // // const xs = tf.tensor2d([1, 2, 3, 4], [2, 2]);
  // const ys = xs.mul(tf.scalar(5));
  // ys.print();

  // TODO: Exercise 2 Math in high school
  // function getYs(xs, m, c) {
  //   // Throw back to school here, m multiplier, c constant, and xs is the input
  //   return xs.mul(tf.scalar(m)).add(tf.scalar(c));
  // }

  // const t1 = tf.tensor1d([1, 5, 10]);
  // const t2 = getYs(t1, 2, 1);
  // t2.print();

  // TODO: Exercise 3 Normalizing data

  // const t3 = tf.tensor1d([25, 76, 4, 23, -5, 22]);
  // const max = t3.max(); // 76
  // const min = t3.min(); // -5
  // const original = 23;
  // const minAsNumber = min.dataSync()[0];
  // const maxAsNumber = max.dataSync()[0];
  // const normalized = (original - minAsNumber) / (maxAsNumber - minAsNumber);
  // console.log(normalized);

  // TODO: Exercise 4 Memory Cleanup

  // const firstLoop = () => {
  //   for (let i = 0; i < 100; i++) {
  //     tf.tensor1d([1, 2, 3]);
  //   }
  // };

  // tf.dispose(firstLoop);

  // const secondLoop = () => {
  //   for (let i = 0; i < 100; i++) {
  //     tf.tensor1d([4, 5, 6]);
  //   }
  // };

  // tf.tidy(secondLoop);

  // console.log(tf.memory());

  // TODO: Exercise From TensorFlow JS
  // Define a model for linear regression.
  // const model = tf.sequential();
  // model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

  // model.compile({ loss: "meanSquaredError", optimizer: "sgd" });

  // // Generate some synthetic data for training.
  // const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
  // const ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);

  // // Train the model using the data.
  // model.fit(xs, ys, { epochs: 10 }).then(() => {
  //   // Use the model to do inference on a data point the model hasn't seen before:
  //   model.predict(tf.tensor2d([5], [1, 1])).print();
  //   // Open the browser devtools to see the output
  // });

  // TODO: Show the example bits
  tensorFlowJs();
  // Tell the Dom how many tensors are here, reminder to clean up
  const numOfTensors = tf.memory().numTensors;

  return (
    <div>
      <p>Number of Tensors: {numOfTensors}</p>
      <Header />
      <MiscButtons />
      <Main />
    </div>
  );
};

export default App;
