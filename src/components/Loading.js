import React from "react";
import Spinner from "react-bootstrap/Spinner";

const Loading = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Spinner style={{ width: "5rem", height: "5rem" }} animation="grow" />
    </div>
  );
};

export default Loading;
