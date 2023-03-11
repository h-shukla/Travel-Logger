import "../styles/Communities.css";
import { useParams } from "react-router-dom";
import data from "./sample-community.json";

/*
TODO: if a user has joined a particular community,
make the add comment button and unhide it from him
but don't show the button to the user who hasn't joined
the community yet
*/

const Community = () => {
  const params = useParams();
  // bug: 3 equals doesn't return an array or even a single item. gives out undefined
  // eslint-disable-next-line
  const currentCommunity = data.filter((x) => x.id == params.commId);
  return (
    <div className="community-page">
      <img
        className="bg-img"
        src={currentCommunity[0].backgroundImgUrl}
        alt=""
      />
      <div className="content-sec">
        <p>
          <b>Name: </b> {currentCommunity[0].name}
        </p>
        <p>
          <b>Description: </b> {currentCommunity[0].description}
        </p>
        <p>
          <b>Members joined: </b>
          {currentCommunity[0].members}
        </p>
        <p>
          <b>Comments: </b>
          {currentCommunity[0].comments.join(",")}
        </p>
      </div>
    </div>
  );
};

export default Community;
