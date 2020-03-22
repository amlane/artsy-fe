import React from "react";
import Loader from "react-loader-spinner";

function ThreeDotLoader() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "15vh"
      }}
    >
      <Loader type="ThreeDots" color="#17a2b8" height={50} width={50} />
      <p>Loading...</p>
    </div>
  );
}

export default ThreeDotLoader;
