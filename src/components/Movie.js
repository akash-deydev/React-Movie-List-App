import React from "react";

const IMG_PATH = "https://image.tmdb.org/t/p/w500";

const Movie = (movie) => {
  const setVoteClass = (vote) => {
    if (vote >= 8) {
      return "green";
    } else if (vote >= 6) {
      return "orange";
    } else {
      return "red";
    }
  };

  return (
    <>
      <div className="movie">
        <img
          src={
            movie.info.poster_path
              ? IMG_PATH + movie.info.poster_path
              : "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bW92aWV8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60"
          }
          alt="poster"
          className="poster"
        />
        <div className="box">
          <h4 className="title">{movie.info.title}</h4>
          <span className={`tag ${setVoteClass(movie.info.vote_average)}`}>
            {movie.info.vote_average}
          </span>
        </div>
        <div className="overview">
          <h3>Overview</h3>
          {movie.info.overview}
        </div>
      </div>
    </>
  );
};

export default Movie;
