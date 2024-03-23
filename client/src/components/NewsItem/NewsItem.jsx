import PropTypes from "prop-types";

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

  return (
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
        <h5 className="card-title">{title}...</h5>
        <p className="card-text">{description}...</p>
        <p className="card-text">
          <small className="text-muted">
            By {!author ? "Unknown" : author} on {formatDate(date)}
          </small>
        </p>
        <a
          href={newsUrl}
          target="_blank"
          rel="noreferrer"
          className="btn btn-sm btn-dark"
        >
          Read More
        </a>
      </div>
    </div>
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
