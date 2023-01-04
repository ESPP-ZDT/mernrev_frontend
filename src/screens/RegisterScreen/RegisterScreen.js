import React, { useState,useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";
import {useNavigate } from "react-router-dom";

function RegistrationScreen() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [picMessage, setPicMessage] = useState("");
  
  const dispatch = useDispatch();

  const userRegister = useSelector(state => state.userRegister)
  const {loading,error, userInfo} = userRegister;

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword){
      setMessage('Passwords do not match')
    }
    else{
      dispatch(register(name,email,password,pic))
    }
    
  };

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      navigate("/mynotes");
    }
  });

  const postDetails = (pics) => {
    if(!pics){
      return setPicMessage("please select an image")
    }
    setPicMessage(null)

    if (pics.type === 'image/jpeg' || pics.type === 'image/png'){
      const data = new FormData()
      data.append('file', pics)
      data.append('upload_preset','noteapp')
      data.append('cloud_name','dimxtmjra')
      fetch("https://api.cloudinary.com/v1_1/dimxtmjra/image/upload", {
        method: "post",
        body: data,
      })
      .then((res) => res.json())
      .then((data) => {
        setPic(data.url.toString());
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    return setPicMessage("Please Select an Image");
  }
};

  return (
    <div>
      {message && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
      {loading && <Loading />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            value={confirmpassword}
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />
        </Form.Group>
        {picMessage && (
          <ErrorMessage variant="danger" >{picMessage}</ErrorMessage>
        )

        }

        <Form.Group controlId="formBasicProfilePicture">
          <Form.Label>Profile Picture</Form.Label>
          <Form.Control 
          type="file" 
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
}

export default RegistrationScreen;
