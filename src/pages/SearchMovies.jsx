import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import MovieItem from "../components/MovieItem";
import { Container, Row, Col } from "react-bootstrap";

const SearchMovies = () => {
  // Create state for movies that have been searched
  const [searchMovie, setSearchMovie] = useState([]);
  const [searchParams] = useSearchParams();
  console.log(searchMovie);

  const [errors, setErrors] = useState({
    isError: false,
    message: null,
  });

  useEffect(() => {
    const getSearchMovies = async () => {
      try {
        const query = searchParams.get("query");

        // Get the data from API with query and page variable
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/3/search/movie?page=1&query=${query}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_AUTH_TOKEN}`,
            },
          }
        );
        const { data } = response;
        // Set state for the movie that have been searched
        setSearchMovie(data?.results);
        setErrors({ ...errors, isError: false });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setErrors({
            ...errors,
            isError: true,
            message: error?.response?.data?.status_message || error?.message,
          });
          return;
        }

        alert(error?.message);
        setErrors({
          ...errors,
          isError: true,
          message: error?.message,
        });
      }
    };

    getSearchMovies();
  }, []);

  console.log(searchMovie);

  // Foreach or map every object of movies array
  return (
    <Container>
      <Link to={"/"}>Kembali</Link>
      <Row>
        {searchMovie.map((movie) => (
          <Col className="d-flex justify-content-center px-0" key={movie?.id}>
            <MovieItem
              id={movie?.id}
              imageURL={import.meta.env.VITE_API_IMAGE_URL + movie?.poster_path}
              overview={movie?.overview}
              title={movie?.title}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SearchMovies;
