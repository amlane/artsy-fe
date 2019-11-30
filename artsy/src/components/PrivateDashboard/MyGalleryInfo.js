import React from "react";

function MyGalleryInfo() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "25px auto",
        width: "100%"
      }}
    >
      <p>
        <span role="img" aria-label="construction signs">
          🚧🚧🚧
        </span>{" "}
        Coming soon
        <span role="img" aria-label="construction signs">
          🚧🚧🚧
        </span>
      </p>
      <p>Shipping Details</p>
      <p>Contact Info</p>
      <p>Refund Policy</p>
    </div>
  );
}

export default MyGalleryInfo;
