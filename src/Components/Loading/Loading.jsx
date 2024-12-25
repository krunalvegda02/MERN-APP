import React from "react";
import ReactLoading from "react-loading";
import Container from "../Container";

function Loading({ className, h=50, w=100 }) {
  return (
    <div>
      <Container>
      <ReactLoading
        type="bubbles"
        color="gray"
        width={w}
        height={h}
        className={`
           ${className}`}
      />
      </Container>
    
    </div>
  );
}

export default Loading;
