import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

function AddNewComment({ photoId }) {
  const [newComment, setNewComment] = useState("");

  const submitComment = e => {
    e.preventDefault();
    const requestBody = {
      content: newComment
    };
    axiosWithAuth()
      .post(
        `https://artsy-be.herokuapp.com/api/comments/${photoId}`,
        requestBody
      )
      .then(res => {
        console.log(res);
        setNewComment("");
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <form
      style={{
        width: "100%",
        border: "1px solid silver",
        padding: "5px 15px",
        background: "#fff",
        borderRadius: "20px"
      }}
      onSubmit={submitComment}
    >
      <input
        style={{ width: "89%", border: "none" }}
        name="content"
        value={newComment}
        onChange={e => {
          setNewComment(e.target.value);
        }}
      />
      <button style={{ border: "none", background: "none", color: "#17A2B8" }}>
        Post
      </button>
    </form>
  );
}

export default AddNewComment;
