import NavbarComponent from "../components/NavbarComponent";
import CarouselComponent from "../components/CarouselComponent";
import { Container, Row, Col } from "react-bootstrap";
import PropType from "prop-types";
import MovieItem from "../components/MovieItem";

const Home = ({ popularMovies }) => {
  return (
    <Container className="px-0" fluid>
      <NavbarComponent />
      <CarouselComponent />
      <Row className="mx-1 my-4 xd-flex justify-content-between">
        <Col
          lg={3}
          className="d-flex align-items-center justify-content-center"
        >
          <h1 className="m-0">Popular Movie</h1>
        </Col>
        <Col
          lg={2}
          className="d-flex align-items-center justify-content-center"
        >
          <p className="m-0 text-danger">See All Movie</p>
        </Col>
      </Row>
      <Row className="d-flex justify-content-between gx-1 gy-4">
        {popularMovies.map((movie) => (
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

Home.propTypes = {
  popularMovies: PropType.array.isRequired,
};

export default Home;
