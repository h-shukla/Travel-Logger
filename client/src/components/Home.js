import React from "react";
import "../styles/Home.css";
import data from "./sample.json";

// have to make for-each loop to loop through logs
const Home = () => {
  return (
    <div className="home-container">
      <div className="new-log-container">
        <h3>New Log</h3>
        <div className="new-log">
          <div className="m-2">
            <label htmlFor="title">Title :</label>
            <input
              type="text"
              placeholder="Enter title"
              className="form-control-home"
              required
            />
          </div>
          <div className="m-2">
            <label htmlFor="comments">Comments :</label>
            <input
              type="text"
              placeholder="Enter your comments"
              className="form-control-home"
              required
            />
          </div>
          <div className="m-2">
            <label htmlFor="latitude">Latitude :</label>
            <input
              type="number"
              placeholder="Location's latitude"
              className="form-control-home"
              required
            />
          </div>
          <div className="m-2">
            <label htmlFor="longitude">Longitude :</label>
            <input
              type="number"
              placeholder="Location's longitude"
              className="form-control-home"
              required
            />
          </div>
          <div className="m-2">
            <label htmlFor="date">Date :</label>
            <input
              type="date"
              placeholder="Enter visit date"
              className="form-control-home"
            />
          </div>
        </div>
        <div className="btn-div">
          <button type="submit" className="log-btn">
            create
          </button>
        </div>
      </div>
      <div className="previous-logs">
        <div className="logs">
          <p>
            <b>{data.title}</b>
          </p>
          <p>{data.comments}</p>
          <a
            href={data.link}
            className="view-maps"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on google maps
          </a>
        </div>
        <div className="logs">
          <p>
            <b>{data.title}</b>
          </p>
          <p>{data.comments}</p>
          <a
            href={data.link}
            className="view-maps"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on google maps
          </a>
        </div>
        <div className="logs">
          <p>
            <b>{data.title}</b>
          </p>
          <p>{data.comments}</p>
          <a
            href={data.link}
            className="view-maps"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on google maps
          </a>
        </div>
        <div className="logs">
          <p>
            <b>{data.title}</b>
          </p>
          <p>{data.comments}</p>
          <a
            href={data.link}
            className="view-maps"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on google maps
          </a>
        </div>
        <div className="logs">
          <p>
            <b>{data.title}</b>
          </p>
          <p>{data.comments}</p>
          <a
            href={data.link}
            className="view-maps"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on google maps
          </a>
        </div>
        <div className="logs">
          <p>
            <b>{data.title}</b>
          </p>
          <p>{data.comments}</p>
          <a
            href={data.link}
            className="view-maps"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on google maps
          </a>
        </div>
        <div className="logs">
          <p>
            <b>{data.title}</b>
          </p>
          <p>{data.comments}</p>
          <a
            href={data.link}
            className="view-maps"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on google maps
          </a>
        </div>
        <div className="logs">
          <p>
            <b>{data.title}</b>
          </p>
          <p>{data.comments}</p>
          <a
            href={data.link}
            className="view-maps"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on google maps
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
