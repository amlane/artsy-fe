import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { baseURL } from "../utils/config";
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import ThreeDotLoader from "../utils/ThreeDotLoader";

function Search(props) {
  const [searchResults, setSearchResults] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const handleChange = e => {
    setInputValue(e.target.value);
  };

  const submitSearch = () => {
    if (inputValue !== "") {
      props.history.push(`/search/${inputValue}`);
    } else {
      props.history.push(`/search/""`);
    }
  };

  useEffect(() => {
    axiosWithAuth()
      .get(`${baseURL}/photos/search/${props.match.params.title}`)
      .then(res => {
        setSearchResults(res.data);
        setInputValue("");
      })
      .catch(err => {
        console.log(err);
      });
  }, [props.match.params.title]);
  if (!searchResults) return <ThreeDotLoader />;
  return (
    <div className="search-page">
      <form onSubmit={submitSearch} className="mobile-search">
        <input
          type="text"
          placeholder="Search for titles"
          className="search-input"
          value={inputValue}
          onChange={handleChange}
        />
        <button type="search" style={{ padding: "5px", color: "gray" }}>
          <IoIosSearch size="1.5em" />
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
    </div>
  );
}

export default Search;
