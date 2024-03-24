import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { toast } from "react-hot-toast";

const NewsItem = ({
  title,
  description,
  imageurl,
  newsUrl,
  author,
  date,
  source,
}) => {
  function formatDate(date) {
    let d = new Date(date);
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let hours = d.getHours();
    let minutes = d.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = hours + ":" + minutes + " " + ampm;

    return `${d.getDate()} ${
      months[d.getMonth()]
    } ${d.getFullYear()} ${strTime}`;
  }

  function handleShare() {
    if (navigator.share) {
      navigator
        .share({
          title: title,
          text: description,
          url: newsUrl,
        })
        .then(() => {
          toast.success("Article shared successfully!");
        })
        .catch((error) => {
          toast.error("Error sharing the article", error);
        });
    } else {
      toast.error("Web Share API not supported in your browser");
    }
  }

  return (
    <>
      <div
        className="card"
        style={{
          height: "100%",
        }}
      >
        <span
          className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
          style={{ left: "85%", zIndex: "1" }}
        >
          {source}
        </span>
        <img
          src={
            imageurl === undefined
              ? "https://www.svgrepo.com/show/340721/no-image.svg"
              : "https://www.nytimes.com/" + imageurl
          }
          className="card-img-top object-fit-fill"
          style={{ height: "300px" }}
          alt=""
          loading="lazy"
        />
        <div className="card-body">
          <h5 className="card-title overflow-hidden" style={{ height: "50px" }}>
            {title}
          </h5>
          <p className="card-text overflow-hidden" style={{ height: "100px" }}>
            {description}
          </p>
          <p className="card-text overflow-hidden" style={{ height: "70px" }}>
            <small className="text-muted">
              By {!author ? "Unknown" : author} on {formatDate(date)}
            </small>
          </p>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
            <div className="d-flex justify-content-between align-items-center gap-2">
              <Button
                variant="outline-primary"
                className="btn-sm"
                onClick={handleShare}
              >
                <i className="bi bi-share"></i>
              </Button>
              <Button variant="outline-primary" className="btn-sm">
                <i className="bi bi-bookmark"></i>
                {/* <i className="bi bi-bookmark-fill"></i> */}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

NewsItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  imageurl: PropTypes.string,
  newsUrl: PropTypes.string,
  author: PropTypes.string,
  date: PropTypes.string,
  source: PropTypes.string,
};

export default NewsItem;
