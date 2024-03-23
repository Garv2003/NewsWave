import { useEffect, useState } from "react";
import NewsItem from "../NewsItem/NewsItem";
// import axios from "axios";
import Carousels from "../Carousels";
import data from "../../assets/data";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState("");
  const [Size, setSize] = useState(10);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // const updateNews = async (pagecurr) => {
  const updateNews = async () => {
    setLoading(true);
    // axios
    //   .get(
    //     // `https://newsapi.org/v2/top-headlines?country=in&apiKey=037b3cfbc8564da49d82315682e5cdb1&page=${pagecurr}&pageSize=12`
    //     `https://newsdata.io/api/1/news?apikey=pub_39752dc3efe61ac650bd34bcac3643ba5df30&language=en&size=${Size}`
    //   )
    //   .then((response) => {
    //     // setNews(response.data.articles);
    //     setNews((news) => [...news, ...response.data.results]);
    //     setTotalResults(response.data.totalResults);
    //     setSize(10);
    //     setPage(response.data.nextPage);
    //     setLoading(false);
    //   });
    setNews(data.results);
    setTotalResults(data.totalResults);
    setSize(10);
    setPage(data.nextPage);
    setLoading(false);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(
      "NewsWave"
    )} - ${capitalizeFirstLetter("Home")}`;
    updateNews();
  }, []);

  const handlePrevClick = async () => {
    setPage((page) => page - 1);
    updateNews(page - 1);
  };

  const handleNextClick = async () => {
    setPage((page) => page + 1);
    updateNews(page + 1);
  };

  return (
    <div className="container my-3">
      <h1 className="text-center">NewsWave - Top Headlines</h1>
      {loading && <h2 className="text-center">Loading...</h2>}
      <Carousels />
      <div className="row mt-4">
        {news.map((element, i) => {
          return (
            <div className="col-md-4" key={i}>
              <NewsItem
                title={element.title ? element.title : ""}
                description={element.description ? element.description : ""}
                imageurl={element.image_url}
                newsUrl={element.link}
                author={element?.creator}
                date={element.pubDate}
                source={element.source_id}
              />
            </div>
          );
        })}
      </div>
      <div className="container d-flex justify-content-between">
        <button
          disabled={page <= 1}
          type="button"
          className="btn btn-dark"
          onClick={() => handlePrevClick()}
        >
          &larr; Previous
        </button>
        <button
          disabled={page + 1 > Math.ceil(totalResults / 12)}
          type="button"
          className="btn btn-dark"
          onClick={() => handleNextClick()}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
};

export default News;
