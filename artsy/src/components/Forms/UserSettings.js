import React from "react";

function UserSettings() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%"
      }}
    >
      <h1>User Settings</h1>
      <p>
        <span role="img" aria-label="construction signs">
          🚧🚧🚧
        </span>{" "}
        Coming soon
        <span role="img" aria-label="construction signs">
          🚧🚧🚧
        </span>
      </p>
      <p>Dark Mode Toggle </p>
      <p>Delete Account</p>
    </div>
  );
}

export default UserSettings;
