import { Container, Row, Col, Image, Navbar } from "react-bootstrap";
import PropType from "prop-types";
import { Link } from "react-router-dom";

const DetailMovieComponent = ({ filteredMovie }) => {
  console.log(filteredMovie);
  return (
    <Container className="px-0" fluid>
      <Row className="py-1 mx-5 bg-light">
        <Col className="d-flex align-items-center">
          <Link to={"/"}>
            <h4 className="kembali">Kembali</h4>
          </Link>
        </Col>
        <Col className="d-flex justify-content-center">
          <Navbar.Brand className="brand" href="#">
            Movielist
          </Navbar.Brand>
        </Col>
        <Col></Col>
      </Row>
      <Row className="content-detail p-5 d-flex align-items-center">
        <Col lg={3} className=" d-flex justify-content-center">
          <Image
            className="image-detail"
            src={
              import.meta.env.VITE_API_IMAGE_URL + filteredMovie?.poster_path
            }
            rounded
          />
        </Col>
        <Col lg={9} className="p-4">
          <h1 className="mb-4">{filteredMovie?.title}</h1>
          <Row>
            <h5>Description</h5>
            <p>{filteredMovie?.overview}</p>
          </Row>
          <Row>
            <h5>Release Date</h5>
            <p>{filteredMovie?.release_date}</p>
          </Row>
          <Row>
            <h5>Popularity</h5>
            <p>{filteredMovie?.popularity}</p>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

DetailMovieComponent.propTypes = {
  filteredMovie: PropType.array.isRequired,
};

export default DetailMovieComponent;
