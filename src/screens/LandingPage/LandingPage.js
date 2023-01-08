import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listAllNotes, likeNote } from "../../actions/noteActions";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentList from "./CommentsList";
import RatingForm from "../../components/RatingForm";
import { rateNote } from "../../actions/ratingActions";

const LandingPage = ({search}) => {
  const[isLike,setIsLike] = useState(false)
  const[loadLike,setLoadLike] = useState(false)
  
  let navigate = useNavigate();
  const dispatch = useDispatch();
  // const {auth} = useSelector(state => state)

  const noteList = useSelector((state) => state.noteList);
  const { loading, error, notes } = noteList;


  useEffect(() => {
    dispatch(listAllNotes());

    navigate("/");
  }, [dispatch, navigate]);
  //HERE, WHERE IM FILTERING THE NOTES, IF IM GOING TO MAKE REWIERS, THEN I COULD ADD THE CONTENT OF THE REWIEVS OR OTHER SCHEMA ELEMENTS TO MAKE THE SEARCHING MORE ACCESIBLE
  //
const handleLike = async() =>{
  if(loadLike) return;
  setIsLike(true)
  setLoadLike(true)
  await dispatch(likeNote(notes._id))
  setLoadLike(false)

}
const handleUnlike = () =>{
  setIsLike(false)
}

const ratingSubmit = async (noteId, rating) => {
  dispatch(rateNote(noteId, rating));
};


  return (
    <div>
      <MainScreen title={`Welcome`}>
        {notes?.filter(
          filteredNote=>(
            filteredNote.title.toLowerCase().includes(search.toLowerCase()),
            filteredNote.content.toLowerCase().includes(search.toLowerCase())
          
            
          )
        ).map((note) => (
          <Card key={note._id}>
            <Card.Header style={{ display: "flex" }}>
              <span className="reviewtitle">{note.title}</span>
              <RatingForm noteId={note._id} onSubmit={ratingSubmit} />

              <h4>Mean Rating: {note.meanRating}</h4>

              <div>{note.likes.length} likes</div>
              <div><LikeButton
              isLike={isLike}
              handleLike={handleLike}
              handleUnlike={handleUnlike}
              note={note}/> </div>
            </Card.Header>
            <Card.Body>
              <h4>
                Category = {note.category}
              </h4>

              <blockquote className="blockquote mb-0">
                <p> {note.content}</p>
                <footer className="blockquote-footer">
                  Created on{" "}
                  <cite title="Source Title">
                    {note.createdAt.substring(0, 10)}
                    <img src={note.pic}  className="profilePic" />
                  </cite>
                </footer>
              </blockquote>
            </Card.Body>
            <div>
            <CommentList noteId={note._id}  search={search} />
            </div>
            <div>
            <Comments noteId={note._id} />
            </div>
            
            
          </Card>
        ))}
      </MainScreen>
    </div>
  );
};

export default LandingPage;
