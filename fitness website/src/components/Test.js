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

const Test = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [model, setModel] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      console.log("load model function run");
      const mobilenetModel = await mobilenet.load();
      console.log("model is: ", mobilenetModel);
      setModel(mobilenetModel);
    };
    loadModel();
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    console.log("image laoded!");
    if (file) {
      console.log("file condition");

      const src = URL.createObjectURL(file);
      setImageSrc(src);
      classifyImage(src);
      //   console.log("file condition end");
    }
  };

  var classifyImage = async (src) => {
    console.log("classify image!");
    console.log("model and src", model, src);
    if (model && src) {
      console.log("Inside Condition");

      const image = new Image();
      image.src = src;
      image.onload = async () => {
        const predictions = await model.classify(image);
        console.log(predictions);
        setPredictions(predictions);
      };
    }
  };

  return (
    <div style={{ marginTop: "200px" }}>
      <h1>Image Classifier</h1>
      <input
        type="file"
        id="imageUpload"
        accept="image/*"
        onChange={handleImageUpload}
      />
      {imageSrc && <img src={imageSrc} alt="Uploaded" width="300" />}
      <div id="predictions">
        {predictions &&
          predictions.map((prediction, index) => (
            <p key={index}>
              {validClasses.includes(prediction.className.toLowerCase())
                ? ` The image is valid: ${
                    prediction.className
                  } (${prediction.probability.toFixed(4)})`
                : `Error: The image is of a ${prediction.className}, testing which is not allowed.`}
            </p>
          ))}
      </div>
    </div>
  );
};

export default Test;
