import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getPhotoById } from "../../actions";
import { axiosWithAuth } from "../utils/axiosWithAuth";

function AddNewComment({ photoId }) {
  const dispatch = useDispatch();

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
        dispatch(getPhotoById(photoId));
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
        padding: "10px 15px",
        margin: "5px 0",
        background: "#fff",
        borderRadius: "5px"
      }}
      onSubmit={submitComment}
    >
      <input
        style={{ width: "86%", border: "none" }}
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