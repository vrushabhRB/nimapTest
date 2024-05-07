import React, { useEffect, useState } from "react";
import "./MovieCast.css";
import { useParams } from "react-router-dom";

const MovieCast = () => {
  const [movieCast, setMovieCast] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchCast();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchCast = () => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to fetch movie cast");
        }
        return res.json();
      })
      .then(data => setMovieCast(data.cast))
      .catch(error => console.error("Error fetching movie cast:", error));
  };

  return (
    <div className="movie__cast"> 
      <div className="movie__castList">
        {movieCast.map((castMember, index) => (
          <div key={index} className="movie__castMember">
            <img
              className="movie__castMemberImage"
              src={`https://image.tmdb.org/t/p/original${castMember.profile_path}`}
              alt={castMember.name}
            />
            <p>{castMember.name} as {castMember.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCast;