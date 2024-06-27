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
        <Link to="/listing" className=" nav-link">
          Listings
        </Link>
        <Link to="/new-listing" className="btn btn-link text-decoration-none">
          Create Listing
        </Link>
        <Button onClick={logout}>Logout</Button>
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
    <Navbar expand="lg" className="bg-body-tertiary shadow-sm">
      <Container className="">
        <Link to="/" className="navbar-brand">
          <span className="text-custom-color">Real</span>
          <span>Estate</span>
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse
          id="navbarScroll "
          className="d-flex justify-content-end"
        >
          <Form className="d-flex" ref={inputRef} onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 header_search"
              aria-label="Search"
              // value={search}

              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </Form>
          <Nav
            className=" my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/about" className="nav-link">
              About
            </Link>
            {link}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
