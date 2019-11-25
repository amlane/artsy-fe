import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";

function Search(props) {
  const [searchResults, setSearchResults] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const handleChange = e => {
    setInputValue(e.target.value);
  };

  const searchRoute = () => {
    if (inputValue !== "") {
      props.history.push(`/search/${inputValue}`);
    } else {
      props.history.push(`/search/""`);
    }
  };

  useEffect(() => {
    axiosWithAuth()
      .get(
        `https://artsy-be.herokuapp.com/api/photos/search/${props.match.params.title}`
      )
      .then(res => {
        setSearchResults(res.data);
        setInputValue("");
      })
      .catch(err => {
        console.log(err);
      });
  }, [props.match.params.title]);
  if (!searchResults)
    return (
      <Loader
        type="ThreeDots"
        color="#1C93B9"
        height={150}
        width={150}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "15vh"
        }}
      />
    );
  return (
    <>
      <form onSubmit={searchRoute} className="mobile-search">
        <input
          type="text"
          placeholder="Search"
          className="search-input"
          value={inputValue}
          onChange={handleChange}
        />
        <button type="search" style={{ padding: "5px" }}>
          <i className="fas fa-search"></i>
        </button>
      </form>
      <h3 style={{ textAlign: "center", padding: "15px" }}>
        <span style={{ color: "silver" }}>Search results for</span>{" "}
        {props.match.params.title}
      </h3>
      <div className="my-photos">
        {searchResults.length > 0 ? (
          searchResults
            .map(photo => {
              return (
                <Link
                  to={`/photo/${photo.id}`}
                  className="photo-card"
                  key={photo.id}
                >
                  <img variant="top" src={photo.photo_url} alt={photo.title} />
                </Link>
              );
            })
            .reverse()
        ) : (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%"
              }}
            >
              No results found.
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%"
              }}
            >
              Please try a new search.
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Search;