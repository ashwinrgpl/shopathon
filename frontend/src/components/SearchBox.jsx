import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [searchKeyword, setSearchKeyword] = useState(urlKeyword || "");

  const submitHandler = (e) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      setSearchKeyword("");
      navigate(`/search/${searchKeyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex navbar-search">
      <Form.Control
        type="text"
        name="q"
        placeholder="Search Products..."
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
      <Button type="submit" variant="outline-light">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
