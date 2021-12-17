import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";

const tensorFlowJs = () => {
  try {
    // TODO? linear equation question, How to predict house prices from square footage?
    // y = mx + c ( linear regression )

    // https://en.wikipedia.org/wiki/Feature_scaling
    const normalise = (tensor) => {
      const min = tensor.min();
      const max = tensor.max();
      const normalisedTensor = tensor.sub(min).div(max.sub(min));
      return { tensor: normalisedTensor, min, max };
    };

    // denomalise the data prediction
    const denormalise = (tensor, min, max) => {
      const denormalisedTensor = tensor.mul(max.sub(min)).add(min);
      return denormalisedTensor;
    };

    // models are a high level abstraction of the underlying machine learning model
    function createModel() {
      // sequential model initialization
      // https://js.tensorflow.org/api/latest/#sequential
      const model = tf.sequential();

      model.add(
        // the connection method of the model sequential
        tf.layers.dense({
          units: 1,
          useBias: true,
          activation: "linear",
          inputDim: 1,
        })
      );

      // https://js.tensorflow.org/api/latest/#Training-Optimizers
      // https://en.wikipedia.org/wiki/Stochastic_gradient_descent
      const optimizer = tf.train.sgd(0.1);
      // takes three arguments: the model, the loss function, and the optimizer
      // https://js.tensorflow.org/api/latest/#Training-Losses
      model.compile({
        loss: "meanSquaredError",
        optimizer,
      });

      return model;
    }

    const plot = async (pointsArray, featureName) => {
      // https://js.tensorflow.org/api_vis/latest/#render.scatterplot
      tfvis.render.scatterplot(
        { name: `${featureName} vs House Prices` },
        { values: [pointsArray], series: ["original"] },
        {
          xLabel: featureName,
          yLabel: "Price",
        }
      );
    };

    async function trainModel(
      model,
      trainingFeatureTensor,
      trainingLabelTensor
    ) {
      const { onEpochEnd } = tfvis.show.fitCallbacks(
        { name: "Training Performance" },
        ["loss"]
      );

      return model.fit(trainingFeatureTensor, trainingLabelTensor, {
        batchSize: 32,
        epochs: 20,
        validationSplit: 0.2,
        callbacks: {
          onEpochEnd,
          onEpochBegin: function () {
            tfvis.show.layer({ name: `Layer 1` }, model.getLayer(undefined, 0));
          },
        },
      });
    }

    tf.tidy(() => {
      const getData = async () => {
        // Ensure backend has initialized
        await tf.ready();
        // Imports data set from an CSV file
        const houseSalesDataSet = tf.data.csv(
          "https://raw.githubusercontent.com/Loonz806/dataSets/main/kc_house_data.csv"
        );

        // Extract the x and y value from the data set to plot
        const pointsDataset = houseSalesDataSet.map((record) => ({
          x: record.sqft_living,
          y: record.price,
        }));
        // toArray not recommended for production as this is added to memory
        // TODO: Read up on .batch or .forEachAsync methods to improve performance
        // https://js.tensorflow.org/api/latest/#tf.data.Dataset.batch
        // https://js.tensorflow.org/api/latest/#tf.data.Dataset.forEachAsync
        const points = await pointsDataset.toArray();
        // remove an odd number of points from the array to make it even
        if (points.length % 2 !== 0) {
          // If odd number of elements
          points.pop(); // remove one element
        }
        // Shuffle data, to keep patterns from emerging from the order of the data
        tf.util.shuffle(points);
        // create the visual for the plot
        plot(points, "Square Feet");

        // Extract features (inputs)
        const featureValues = await points.map((p) => p.x);
        const featureTensor = tf.tensor2d(featureValues, [
          featureValues.length,
          1,
        ]);

        // Extract labels (outputs)
        const labelValues = await points.map((p) => p.y);
        const labelTensor = tf.tensor2d(labelValues, [labelValues.length, 1]);

        // Normalise features and labels
        const normalisedFeature = normalise(featureTensor);
        const normalisedLabel = normalise(labelTensor);

        normalisedFeature.tensor.print();

        // Split the data into training and testing sets
        const [trainingFeatureTensor, testingFeatureTensor] = tf.split(
          normalisedFeature.tensor,
          2
        );
        const [trainingLabelTensor, testingLabelTensor] = tf.split(
          normalisedLabel.tensor,
          2
        );

        const model = createModel();

        // Inspecting the model via some showing layers functions
        model.summary();
        tfvis.show.modelSummary({ name: "Model Summary" }, model);
        const layer = model.getLayer(undefined, 0);
        tfvis.show.layer({ name: "Layer 1" }, layer);

        // training the model
        const result = await trainModel(
          model,
          trainingFeatureTensor,
          trainingLabelTensor
        );
        console.log(result);
        const trainingLoss = result.history.loss.pop();
        console.log(`Training set loss: ${trainingLoss}`);
        const validationLoss = result.history.val_loss.pop();
        console.log(`Validation set loss: ${validationLoss}`);

        // https://js.tensorflow.org/api/latest/#tf.LayersModel.evaluate
        const lossTensor = model.evaluate(
          testingFeatureTensor,
          testingLabelTensor
        );
        // https://js.tensorflow.org/api/latest/#tf.Tensor.dataSync
        const loss = await lossTensor.dataSync();
        console.log(`Testing set loss: ${loss}`);
      };
      getData();
    });
  } catch (error) {
    return new Error("Error thrown from fetching data", error);
  }
};

export default tensorFlowJs;
