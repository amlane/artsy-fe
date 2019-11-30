import React from "react";
import moment from "moment";

function Comment({ comment }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <p style={{ padding: "0", margin: "0" }}> {comment.username}</p>
        <p style={{ fontSize: "12px", color: "gray" }}>
          {moment(comment.created_at).fromNow()}
        </p>
      </div>
      <p style={{ padding: "0", margin: "0" }}>{comment.content}</p>
    </div>
  );
}

export default Comment;
