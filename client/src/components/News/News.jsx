import { useEffect, useState } from "react";
import NewsItem from "../NewsItem/NewsItem";
import axios from "axios";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    try {
      setLoading(true);
      const data = await axios.get(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=general&page=${page}&api-key=AGjS8Eh5M6UNdryEfKHtY6OxBOHclQLc#`
      );
      console.log(data);
      setNews(data.data.response.docs);
      setLoading(false);
    } catch (error) {
      setNews([]);
      setLoading(false);
      setError("Something went wrong! Please try again later.");
    }
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(
      "NewsWave"
    )} - ${capitalizeFirstLetter("Home")}`;
    updateNews();
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
      <div className="container my-3">
        <h1 className="text-center">{error}</h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container my-3">
        <h1 className="text-center">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="container my-3">
      {" "}
      <h1 className="text-center">NewsWave - Top Headlines</h1>
      <div className="row mt-4">
        {news.map((element, i) => {
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
      {news.length ? (
        <div className="d-flex justify-content-between">
          <button
            disabled={page <= 1}
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
          >
            Next &rarr;
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default News;
