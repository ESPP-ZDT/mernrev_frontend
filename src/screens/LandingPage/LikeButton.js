import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeNote } from "../../actions/noteActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

const LikeButton = ({ isLike, handleLike, handleUnlike, noteId }) => {
  // Use useSelector to get the likes for the given note from the state
  const likes = useSelector((state) => state.noteLike.likes[noteId]); // Access likes for specific note using the noteId
  const dispatch = useDispatch();

  const handleClick = () => {
    const {data} = localStorage.getItem("userInfo");
    const userId = data._id;
    console.log("Data: " , data);
    console.log("UserId: " , userId);
    dispatch(likeNote(noteId, data._id));
  };

  return (
    <button onClick={handleClick}>
      {isLike ? (
        <FontAwesomeIcon icon={faThumbsUp} onClick={handleUnlike}/>
      ) : (
        <FontAwesomeIcon icon={faThumbsDown} onClick={handleLike}/>
      )}
    </button>
  );
};

export default LikeButton;
