import React from "react";

const Photo = ({ photo }) => {
  return (
    <div className="pic">
      <a href={photo.src.landscape}>
        <img src={photo.src.landscape} />
      </a>
      <h1>
        Photo by {photo.photographer}
      </h1>
    </div>
  );
};

export default Photo;
