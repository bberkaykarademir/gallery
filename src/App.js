import React, { useEffect, useState } from "react";
import { createClient } from "pexels";
import Photo from "./Photo";

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [input, setInput] = useState("");
  const [page, setPage] = useState(1);
  const client = createClient(
    "563492ad6f917000010000019598181fd4e44acdb8367586ee1d60e3"
  );
  const next = (e) => {
    submitHandlerN(e);
  };
  const prev = (e) => {
    submitHandlerP(e);
  };
  const getPhotos = async () => {
    const res = await client.photos.curated({ per_page: 20, page: page });
    setPhotos(res.photos);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setPage(1);
    const query = input;
    const res = await client.photos.search({ query, per_page: 20, page: page });
    {
      res && setPhotos(res.photos);
    }
  };
  const submitHandlerN = async (e) => {
    e.preventDefault();
    setPage((page) => page + 1);
    const query = input;
    const res = await client.photos.search({ query, per_page: 20, page: page });
    {
      res && setPhotos(res.photos);
    }
  };
  const submitHandlerP = async (e) => {
    e.preventDefault();
    setPage((page) => page - 1);
    const query = input;
    const res = await client.photos.search({ query, per_page: 20, page: page });
    {
      res && setPhotos(res.photos);
    }
  };
  useEffect(() => {
    getPhotos();
  }, []);

  return (
    <div>
      <form onSubmit={(e) => submitHandler(e)}>
        <input
          value={input}
          type="text"
          placeholder="search a photo"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button disabled={input.trim() == "" ? true : false} className="search">
          Search
        </button>
      </form>
      <div className="container">
        <button onClick={next} className="right direction">
          {">"}
        </button>
        <button disabled={page == 1} onClick={prev} className="left direction ">
          {"<"}
        </button>
        {photos.map((photo) => {
          return <Photo key={photo.id} photo={photo} />;
        })}
      </div>
    </div>
  );
};

export default App;
