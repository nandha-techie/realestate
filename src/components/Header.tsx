import React, { useEffect, useState, useRef } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { getLocalStorageUser } from "./utility/Helper";

const Header = () => {
  const { user, setUser, logoutUser } = useAppContext();
  const [active, setActive] = useState("home");
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();
  const inputRef: any = useRef(null);
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (inputRef.current) {
      inputRef.current.reset();
    }
    navigate("/search", { state: { search: search } });
  };

  function logout() {
    logoutUser();
  }
  useEffect(() => {
    return () => {
      setSearch("");
    };
  }, []);

  let link;
  if (user) {
    link = (
      <>
        <Link
          to="/listing"
          className={`nav-link ${active == "listing" ? "text-primary" : ""}`}
          onClick={() => setActive("listing")}
        >
          Listings
        </Link>
        <Link
          to="/new-listing"
          className={`nav-link ${
            active == "new-listing" ? "text-primary" : ""
          }`}
          onClick={() => setActive("new-listing")}
        >
          Create Listing
        </Link>
        <Button className="custom-btn" onClick={logout}>
          Logout
        </Button>
      </>
    );
  } else {
    link = (
      <Link to="/login" className="nav-link">
        login
      </Link>
    );
  }

  useEffect(() => {
    const userdata = getLocalStorageUser();
    if (userdata) {
      setUser(userdata);
    }
    return () => {};
  }, []);

  return (
    <Navbar expand="md" className="bg-body-tertiary shadow-sm">
      <Container className="">
        <Navbar.Brand as={Link} to="/" onClick={() => setActive("home")}>
          <span className="text-custom-color">Real</span>
          <span>Estate</span>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbarScroll"
          className="border-0 bg-transparent"
        ></Navbar.Toggle>
        <Navbar.Collapse id="navbarScroll" className="me-auto mt-3">
          <div className="w-100 d-flex flex-column flex-md-row justify-content-end">
            <Form
              className="d-flex search-form"
              ref={inputRef}
              onSubmit={handleSubmit}
            >
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                bsPrefix="form-control search-form"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </Form>
            <Nav className="my-2 my-lg-0">
              <Link
                to="/"
                className={`nav-link ${active == "home" ? "text-primary" : ""}`}
                onClick={() => setActive("home")}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`nav-link ${
                  active == "about" ? "text-primary" : ""
                }`}
                onClick={() => setActive("about")}
              >
                About
              </Link>
              {link}
            </Nav>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
