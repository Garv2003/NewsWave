import { useEffect } from "react";
import NewsItem from "./NewsItem";
import Loader from "./Loader";
import PropTypes from "prop-types";

const News = ({ news, loading, error, page, setPage, updateNews }) => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(
      "NewsWave"
    )} - ${capitalizeFirstLetter("Home")}`;
  }, []);

  const handlePrevClick = async () => {
    setPage((page) => page - 1);
    updateNews();
    window.scrollTo(0, 0);
  };

  const handleNextClick = async () => {
    setPage((page) => page + 1);
    updateNews();
    window.scrollTo(0, 0);
  };

  if (error) {
    return (
      <div
        className="container my-3"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 150px)",
        }}
      >
        <h1 className="text-center">{error.message}</h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div
        className="container my-3"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 150px)",
        }}
      >
        <h3 className="text-center">Fetching News... Please Wait!</h3>
        <Loader />
      </div>
    );
  }

  return (
    <div className="container my-3">
      {" "}
      <h1 className="text-center">NewsWave - Top Headlines</h1>
      <div className="row mt-4">
        {news?.map((element, i) => {
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
      </div>
      {news?.length ? (
        <div className="d-flex justify-content-between">
          <button
            disabled={page === 0}
            type="button"
            className="btn btn-dark"
            onClick={handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={handleNextClick}
            disabled={page === 100}
          >
            Next &rarr;
          </button>
        </div>
      ) : null}
    </div>
  );
};

News.propTypes = {
  news: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.object,
  page: PropTypes.number,
  setPage: PropTypes.func,
  updateNews: PropTypes.func,
};

export default News;
