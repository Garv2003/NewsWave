import NavBar from "../components/NavBar";
import { Container, Button, Form, FormControl, Row } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import NewsItem from "../components/NewsItem";
import Loader from "../components/Loader";

const Search = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${search}&page=${page}&api-key=AGjS8Eh5M6UNdryEfKHtY6OxBOHclQLc#`
      );
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  };

  const BtnSearch = () => {
    if (search) {
      refetch();
    } else {
      alert("Please enter a search term");
    }
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["search", search],
    queryFn: handleSearch,
    enabled: false,
  });

  return (
    <>
      <NavBar />
      <Container className="my-5">
        <h1>Search</h1>
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            variant="outline-primary"
            onClick={() => {
              BtnSearch();
            }}
          >
            Search
          </Button>
        </Form>
        {isLoading && (
          <div className="my-5 text-center">
            <Loader />
          </div>
        )}

        {isError && (
          <div className="my-5">
            <h2>Error</h2>
            <p>{error.message}</p>
          </div>
        )}

        {data && (
          <Row className="mt-4">
            {data.response.docs.map((element, i) => {
              return (
                <div className="col-md-4 my-3" key={i}>
                  <NewsItem
                    title={element.headline.main ? element.headline.main : ""}
                    description={element.lead_paragraph}
                    imageurl={element.multimedia?.[0]?.url}
                    newsUrl={element.web_url}
                    author={element.byline.original}
                    date={element.pub_date}
                    source={element.source}
                  />
                </div>
              );
            })}
            <div className="my-5 d-flex justify-content-between">
              <Button
                variant="primary"
                disabled={page === 0}
                onClick={() => {
                  setPage(page - 1);
                  refetch();
                  window.scrollTo(0, 0);
                }}
              >
                Previous
              </Button>
              <Button
                variant="primary"
                className="ms-3"
                disabled={data?.response.docs.length < 10}
                onClick={() => {
                  setPage(page + 1);
                  refetch();
                  window.scrollTo(0, 0);
                }}
              >
                Next
              </Button>
            </div>
          </Row>
        )}

        {!data && !isLoading && !isError && (
          <div className="my-5">
            <h2>No results found</h2>
            <p>Try searching for something else</p>
          </div>
        )}
      </Container>
    </>
  );
};

export default Search;
