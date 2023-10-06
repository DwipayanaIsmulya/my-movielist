import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PropType from "prop-types";
import DetailMovieComponent from "../components/DetailMovieComponent";

function DetailMovies({ popularMovies }) {
  const [detailMovie, setDetailMovie] = useState([]);
  const { movieId } = useParams();
  // TODO: Hit the movie details api and rendering
  useEffect(() => {
    popularMovies
      .filter((p) => p.id == movieId)
      .map((filteredMovie) => setDetailMovie(filteredMovie));
  }, []);
  return <DetailMovieComponent filteredMovie={detailMovie} />;
}

DetailMovies.propTypes = {
  popularMovies: PropType.array.isRequired,
};

export default DetailMovies;
