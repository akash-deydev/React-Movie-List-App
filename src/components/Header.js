import React, { useState, useEffect } from "react";
import Movie from "./Movie";

const API_KEY = "&api_key=20fdea36a17e610bd874ffd1c6978796";
const BASE_URL = "https://api.themoviedb.org/3";
let URL = BASE_URL + "/discover/movie?sort_by=popularity.desc" + API_KEY;
const SEARCH =
  "https://api.themoviedb.org/3/search/movie?api_key=20fdea36a17e610bd874ffd1c6978796&query=";

const category = ["Popular", "Theatre", "Drama", "Kids", "Comedy"];

const Header = () => {
  const [movies, setMoviesData] = useState([]);
  const [url, setUrl] = useState(URL);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => setMoviesData(data.results));
  }, [url]);

  const getCategory = (movieCategory) => {
    if (movieCategory == "Popular") {
      URL = BASE_URL + "/discover/movie?sort_by=popularity.desc" + API_KEY;
    }
    if (movieCategory == "Theatre") {
      URL =
        BASE_URL +
        "/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22" +
        API_KEY;
    }
    if (movieCategory == "Drama") {
      URL =
        BASE_URL +
        "/discover/movie?with_genres=18&primary_release_year=2014" +
        API_KEY;
    }
    if (movieCategory == "Kids") {
      URL =
        BASE_URL +
        "/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc" +
        API_KEY;
    }
    if (movieCategory == "Comedy") {
      URL =
        BASE_URL +
        "/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc" +
        API_KEY;
    }
    setUrl(URL);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      fetch(SEARCH + searchTerm)
        .then((response) => response.json())
        .then((data) => {
          setMoviesData(data.results);
        });
      setSearchTerm("");
    }
  };

  return (
    <>
      <header>
        <nav>
          <ul>
            {category.map((value, index) => {
              return (
                <li key={index}>
                  <a
                    href="#"
                    name={value}
                    onClick={(e) => {
                      getCategory(e.target.name);
                    }}
                  >
                    {value}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="search-btn">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search..."
              className="inputText"
              value={searchTerm}
              onChange={handleChange}
            />
          </form>
        </div>
      </header>
      <div className="container">
        {movies.length == 0 ? (
          <p className="not-found">Not Found</p>
        ) : (
          movies.map((movie) => {
            return <Movie key={movie.id} info={movie} />;
          })
        )}
      </div>
    </>
  );
};

export default Header;
