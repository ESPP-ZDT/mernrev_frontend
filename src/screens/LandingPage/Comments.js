import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../actions/commentsActions";
import './Comments.css'

function Comments({ noteId }) {
  //console.log(noteId)
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.commentsList.comments);
  const [content, setContent] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (!content || !noteId) {
      // Return if either content or noteId is not present
      return;
    }
    dispatch(createComment(content, noteId));
  };
  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Comments;
