import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "../../actions/commentsActions";
import { Card, ListGroup } from "react-bootstrap";
import "./CommentsList.css"; // Add this line to import the CSS file

const CommentList = ({ noteId, search }) => {
  
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.commentsList.comments);

  useEffect(() => {
    dispatch(fetchComments(noteId));
  }, [dispatch]);

  // Add this block of code to re-fetch the comments after a new one is added
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchComments(noteId));
    }, 5000); // 15000 milliseconds = 15 seconds
    return () => clearInterval(interval);
  }, [dispatch, noteId]);

  return (
    <Card className="comment-list-card"> {/* Add a class to the Card element */}
      <Card.Header className="comment-list-header"> {/* Add a class to the Card.Header element */}
        Comments
      </Card.Header>
      {comments && comments.length > 0 ? (
        <ListGroup variant="flush">
          {comments
            .filter((comment) => (
              comment.note.toString() === noteId.toString() &&
              (comment.content.toLowerCase().includes(search.toLowerCase()) || comment.name.toLowerCase().includes(search.toLowerCase()))
            ))
            

            .map((comment) => (
              <ListGroup.Item key={comment._id} className="comment-item"> {/* Add a class to the ListGroup.Item element */}
                <p className="comment-content">{comment.content}</p> {/* Add a class to the content paragraph */}
                <p className="comment-author">By {comment.name}</p> {/* Add a class to the author paragraph */}
              </ListGroup.Item>
            ))}
        </ListGroup>
      ) : (
        <Card.Body className="no-comments-found"> {/* Add a class to the Card.Body element */}
          No comments found
        </Card.Body>
      )}
    </Card>
  );
};

export default CommentList;
