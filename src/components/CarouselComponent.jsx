import { useState, useEffect } from "react";
import { Carousel, Image, Row, Col, Container, Button } from "react-bootstrap";
import axios from "axios";
import movieTrailer from "movie-trailer";
import ReactPlayer from "react-player";

function CarouselComponent() {
  const [index, setIndex] = useState(0);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [errors, setErrors] = useState({
    isError: false,
    message: null,
  });
  const [video] = useState("");
  const [videoURL, setVideoURL] = useState("");

  // Carousel
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
    console.log(selectedIndex);
  };

  useEffect(() => {
    const getNowPlayingMovies = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/3/movie/now_playing?language=en-US&page=1`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_AUTH_TOKEN}`,
            },
          }
        );
        const { data } = response;

        setNowPlayingMovies(data?.results);
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

    getNowPlayingMovies();
  }, []);

  if (errors.isError) {
    return <h1>{errors.message}</h1>;
  }

  if (nowPlayingMovies.length === 0) {
    return <h1>Loading....</h1>;
  }

  // Button Trailer
  const buttonTrailer = (id) => {
    const trailer = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/3/movie/${id}/videos`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_AUTH_TOKEN}`,
            },
          }
        );
        const { data } = response;

        console.log(data);
        setVideoURL(`https://youtu.be/${data?.results[0].key}`);
        setErrors({ ...errors, isError: false });
      } catch (error) {
        console.log(error);
      }
    };

    trailer();

    movieTrailer(video).then(() => {
      setVideoURL(videoURL);
    });
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <Image
          xs={6}
          md={4}
          className="gambar"
          src={
            import.meta.env.VITE_API_IMAGE_URL +
            nowPlayingMovies[0]?.backdrop_path
          }
        />
        <Container className="caption-carousel d-flex align-items-center" fluid>
          <Row className="m-2 p-4">
            <Col md={8} lg={6}>
              <h1 className="title-carousel mb-4">
                {nowPlayingMovies[0].title}
              </h1>
              <p className="desc-carousel mb-4">
                {nowPlayingMovies[0].overview}
              </p>
              <Button
                variant="danger"
                onClick={() => buttonTrailer(nowPlayingMovies[0]?.id)}
              >
                Watch Trailer
              </Button>
            </Col>
            <Col md={4}>
              <ReactPlayer url={videoURL} controls={true} />
            </Col>
          </Row>
        </Container>
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image
          xs={6}
          md={4}
          className="gambar"
          src={
            import.meta.env.VITE_API_IMAGE_URL +
            nowPlayingMovies[1]?.backdrop_path
          }
        />
        <Container className="caption-carousel d-flex align-items-center" fluid>
          <Row className="m-2 p-4">
            <Col md={8} lg={6}>
              <h1 className="title-carousel mb-4">
                {nowPlayingMovies[1].title}
              </h1>
              <p className="desc-carousel mb-4">
                {nowPlayingMovies[1].overview}
              </p>
              <Button
                variant="danger"
                onClick={() => buttonTrailer(nowPlayingMovies[1]?.id)}
              >
                Watch Trailer
              </Button>
            </Col>
            <Col md={4}>
              <ReactPlayer url={videoURL} controls={true} />
            </Col>
          </Row>
        </Container>
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image
          xs={6}
          md={4}
          className="gambar"
          src={
            import.meta.env.VITE_API_IMAGE_URL +
            nowPlayingMovies[2]?.backdrop_path
          }
        />
        <Container className="caption-carousel d-flex align-items-center" fluid>
          <Row className="m-2 p-4">
            <Col md={8} lg={6}>
              <h1 className="title-carousel mb-4">
                {nowPlayingMovies[2].title}
              </h1>
              <p className="desc-carousel mb-4">
                {nowPlayingMovies[2].overview}
              </p>
              <Button
                variant="danger"
                onClick={() => buttonTrailer(nowPlayingMovies[2]?.id)}
              >
                Watch Trailer
              </Button>
            </Col>
            <Col md={4}>
              <ReactPlayer url={videoURL} controls={true} />
            </Col>
          </Row>
        </Container>
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselComponent;
