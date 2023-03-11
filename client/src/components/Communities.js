import React from "react";
import "../styles/Communities.css";
import { Link } from "react-router-dom";
import communities from "./sample-community.json";

const Communities = () => {
  return (
    <div className="community-container">
      <div className="search">
        <input
          type="text"
          className="search-bar"
          placeholder="Search for communities"
        />
        <button className="btn">Search</button>
      </div>
      <div className="community-list">
        {communities.map((x) => (
          <Link className="link-item" key={x.name} to={`/communities/${x.id}`}>
            <p>
              <b>{x.name}</b>
            </p>
            <p>{x.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Communities;
