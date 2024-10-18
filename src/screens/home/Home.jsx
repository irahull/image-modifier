import React, { useEffect, useState } from "react";
import "./home.scss";
import { getDataFromApi } from "../../helper/getDataFromApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import CanvasComp from "../canvas/Canvas";

const HomeScreen = ({ imgUrl, setImgUrl }) => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);

  const navigate = useNavigate();

  const getImagesFromServer = async () => {
    try {
      if (query.length > 0) {
        const data = await getDataFromApi(query);
        console.log(data);
        setImages(data);
      } else {
        toast.error("Enter something for search");
      }
    } catch (error) {
      console.error("Error fetching the images", error);
    }
  };


  return (
    <div className="homeScreen">
      <div className="upperText">
        <p>Name : John</p>
        <p>Email: john@gmail.com</p>
      </div>
      <div className="searchBar">
        <h2>Search Image & Modify</h2>
        <input
          type="text"
          placeholder="Search for images"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={getImagesFromServer}>Search</button>
      </div>
      <div className="imageWrapper">
        {images.map((image) => (
          <div key={image.id} className="imageItem">
            <div className="imageItem">
              <img src={image.urls.small} alt="" />
            </div>
            <button
              onClick={() => {
                setImgUrl(image.urls.small);
                navigate("/edit");
              }}
            >
              Add Captions
            </button>
          </div>
        ))}
      </div>
      {/* <div
        className="editCanvas"
        style={{
          display: imgUrl ? "block" : "none",
          position: "fixed",
          top: "0",
          zIndex: "5",
          width: "100%",
          height: "100%",
          backgroundColor: "white",
          color: "white",
        }}
      >
        {imgUrl && <CanvasComp imgUrl={imgUrl} setImgUrl={setImgUrl} />}
      </div> */}
    </div>
  );
};

export default HomeScreen;
