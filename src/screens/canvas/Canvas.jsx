import React, { useEffect, useRef, useState } from "react";
import "./canvas.scss";
// import * as fabric from "fabric";
import { fabric } from 'fabric';
import { Link } from "react-router-dom";

const CanvasComp = ({ imgUrl, setImgUrl }) => {
  const [canvass, setCanvass] = useState();
  //   const [storeImgLink, setCanvass] = useState();
  const [inputText, setInputText] = useState("");
  const canvasRef = useRef(null);
  console.log(imgUrl);

  const renderImage = (link) => {
    let imageElement = document.createElement("img");
    imageElement.src = link;
    imageElement.onload = () => {
      let image = new fabric.Image(imageElement);
      canvass.add(image);
    };
  };

  useEffect(() => {
    const canvasInstance = new fabric.Canvas(canvasRef.current);
    setCanvass(canvasInstance);

    return () => {
      canvasInstance.dispose();
    };
  }, []);

  //   useEffect(() => {
  //     //   const canvas = new fabric.Canvas(canvasRef.current);

  //     let imageElement = document.createElement("img");
  //     imageElement.src = imgUrl;
  //     imageElement.onload = () => {
  //       let image = new fabric.Image(imageElement);
  //       canvass.add(image);
  //       //   canvas.centerObject(image);
  //       //   canvas.setActiveObject(image);
  //     };

  //   }, [imgUrl]);

  // Add text to the canvas

  const downloadImage = () => {
    // const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.href = canvass.toDataURL({ format: "png" });
    link.download = "canvas-image.png";
    link.click();
  };

  const addText = () => {
    const text = new fabric.Textbox(inputText, {
      left: 100,
      top: 100,
      fontSize: 24,
      fill: "black",
    });
    canvass.add(text);
  };

  const addShape = (shape) => {
    let shapeObj;

    if (shape === "rectangle") {
      shapeObj = new fabric.Rect({
        left: 50,
        top: 50,
        fill: "blue",
        width: 100,
        height: 100,
      });
    } else if (shape === "circle") {
      shapeObj = new fabric.Circle({
        left: 100,
        top: 100,
        fill: "green",
        radius: 50,
      });
    }

    canvass.add(shapeObj);
  };

  const handleChange = (e) => {
    setInputText(e.target.value);
  };
  return (
    <div className="canvasWrapper">
      <Link to="/" className="backToHome">
        Back To Home
      </Link>
      <h2 className="h2">Modify Your Image</h2>
      <div className="canvasContainer">
        <div className="canvasLeft">
          <canvas
            ref={canvasRef}
            className="imgCanvasLeft"
            width={480}
            height={450}
          />
        </div>
        <div className="canvasRight">
          <div className="addCircleAndRectangle">
            <div className="addCircle" onClick={() => addShape("circle")}>
              {" "}
              Add Circle
            </div>
            <div className="addRectangle" onClick={() => addShape("rectangle")}>
              {" "}
              Add Reactangle
            </div>
          </div>

          <div className="addTextBtn">
            <input
              type="text"
              placeholder="Enter Text"
              onChange={handleChange}
            />
            <button onClick={addText}>Add Text</button>
          </div>

          <div className="addImage" onClick={()=>renderImage(imgUrl)}>Add Image</div>

          <div className="downloadBtn" onClick={downloadImage}>
            Download the Image{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanvasComp;
