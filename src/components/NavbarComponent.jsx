import { useState } from "react";
import {
  Container,
  Col,
  Navbar,
  InputGroup,
  Form,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";

function NavbarComponent() {
  const [searchValue, setSearchValue] = useState("");
  const [updated, setUpdated] = useState(searchValue);

  const searchSubmit = (e) => {
    setSearchValue(e.target.value);
  };

  const handleClick = () => {
    setUpdated(searchValue);
  };
  return (
    <Navbar className="navbar" expand="lg">
      <Container className="d-flex justify-content-between" fluid>
        <Col className="mx-3">
          <Navbar.Brand className="brand" href="#">
            Movielist
          </Navbar.Brand>
        </Col>
        <Col className="mx-3">
          <form action="" method="post" onSubmit={searchSubmit}>
            <InputGroup>
              <Form.Control
                className="search"
                placeholder="What do you want to watch?"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onChange={searchSubmit}
                value={searchValue}
              />
              <Button
                as={Link}
                to={`/search?query=${searchValue}`}
                variant="primary"
                id="button-addon2"
                onClick={handleClick}
              >
                Search
              </Button>
            </InputGroup>
          </form>
        </Col>
        <Col className="mx-3 d-flex justify-content-end">
          <Button variant="outline-danger" className="button-navbar mx-1">
            Login
          </Button>
          <Button variant="danger" className="button-navbar mx-1">
            Register
          </Button>
        </Col>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
