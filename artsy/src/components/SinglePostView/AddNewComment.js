import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getPhotoById } from "../../actions";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { baseURL } from "../utils/config";

function AddNewComment({ photoId }) {
  const dispatch = useDispatch();

  const [newComment, setNewComment] = useState("");

  const submitComment = e => {
    e.preventDefault();
    const requestBody = {
      content: newComment
    };
    axiosWithAuth()
      .post(`${baseURL}/comments/${photoId}`, requestBody)
      .then(res => {
        // console.log(res);
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
        border: "1px solid #e9ecef",
        padding: "10px 0 10px 15px",
        margin: "0",
        background: "#fff",
        display: "flex",
        justifyContent: "space-between"
      }}
      onSubmit={submitComment}
    >
      <input
        style={{ width: "80%", border: "none" }}
        name="content"
        value={newComment}
        placeholder="Add a comment..."
        onChange={e => {
          setNewComment(e.target.value);
        }}
      />
      <button
        disabled={newComment === "" ? true : false}
        className="add-comment"
      >
        Post
      </button>
    </form>
  );
}

export default AddNewComment;
