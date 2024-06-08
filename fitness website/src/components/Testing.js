import React, { useState, useEffect } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";
import "@tensorflow/tfjs";
const validClasses = [
  "studio couch, day bed",
  "house",
  "building",
  "room",
  "bed",
  "dormitory",
  "apartment",
  "residence",
  "patio, terrace",
  // Add more relevant classes as needed
];

const App = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [model, setModel] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      const mobilenetModel = await mobilenet.load();
      setModel(mobilenetModel);
      console.log("model load");
    };
    loadModel();
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const src = URL.createObjectURL(file);
      setImageSrc(src);
      classifyImage(src);
    }
  };

  const classifyImage = async (src) => {
    if (model && src) {
      const image = new Image();
      image.src = src;
      image.onload = async () => {
        const predictions = await model.classify(image);
        setPredictions(predictions);
      };
    }
  };

  return (
    <div>
      <h1 className="mt-5">Image Classifier</h1>
      {model != null ? (
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          onChange={handleImageUpload}
        />
      ) : (
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      )}
      {imageSrc && (
        <img
          src={imageSrc}
          alt="Uploaded"
          width="30px"
          style={{ height: "auto" }}
        />
      )}
      <div id="predictions">
        {predictions &&
          predictions.map((prediction, index) => (
            <p key={index}>
              {validClasses.includes(prediction.className.toLowerCase())
                ? `The image is valid: ${
                    prediction.className
                  } (${prediction.probability.toFixed(4)})`
                : `Error: The image is of a ${prediction.className}, testing which is not allowed.`}
            </p>
          ))}
      </div>
    </div>
  );
};

export default App;
