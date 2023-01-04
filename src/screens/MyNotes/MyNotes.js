import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./MyNotes.css";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listUserNotes } from "../../actions/noteActions";

const MyNotes = ({search}) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const noteList = useSelector((state) => state.noteList);
  const { loading, error, notes } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success :successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;
  
  const noteDelete = useSelector((state) => state.noteDelete);
  const { loading: loadingDelete, error: errorDelete, success:successDelete } = noteDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
  };

  console.log(notes);

  useEffect(() => {
    dispatch(listUserNotes());
    if (!userInfo) {
      navigate("/usernotes");
    }
  }, [dispatch, successCreate,navigate,userInfo ,successUpdate,successDelete]);
  //HERE, WHERE IM FILTERING THE NOTES, IF IM GOING TO MAKE REWIERS, THEN I COULD ADD THE CONTENT OF THE REWIEVS OR OTHER SCHEMA ELEMENTS TO MAKE THE SEARCHING MORE ACCESIBLE
  //
  return (
    <div>
      <MainScreen title={`Hello user ${userInfo.name}`}>
        <Link to="/createnote">
          <Button variant="primary" size="xs">
            create note
          </Button>{" "}
        </Link>{" "}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        {notes?.reverse().filter(
          filteredNote=>(
            filteredNote.title.toLowerCase().includes(search.toLowerCase())
          )
        ).map((note) => (
          <Card key={note._id}>
            <Card.Header style={{ display: "flex" }}>
              <span className="reviewtitle">{note.title}</span>
              <div>
                <Button variant="succes" size="xs" className="mx-2">
                  <Link to={`/note/${note._id}`}>edit note</Link>
                </Button>
                <Button
                  variant="danger"
                  size="xs"
                  className="mx-2"
                  onClick={() => deleteHandler(note._id)}
                >
                  delete note
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <h4>
                <bg>Category = {note.category}</bg>
              </h4>

              <blockquote className="blockquote mb-0">
                <p> {note.content}</p>
                <footer className="blockquote-footer">
                  Created on{" "}
                  <cite title="Source Title">
                    {note.createdAt.substring(0, 10)}
                  </cite>
                </footer>
              </blockquote>
            </Card.Body>
          </Card>
        ))}
      </MainScreen>
    </div>
  );
};

export default MyNotes;
