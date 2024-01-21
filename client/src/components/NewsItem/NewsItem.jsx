import image from '../../assets/favicon.ico'
const NewsItem = ({
  title,
  description,
  imageurl,
  newsUrl,
  author,
  date,
  source,
}) => {
  return (
    <div className="card">
      <span
        className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
        style={{ left: "90%", zIndex: "1" }}
      >
        {source}
      </span>
      <img src={imageurl===null?image:imageurl} className="card-img-top" alt="" loading="lazy" />
      <div className="card-body">
        <h5 className="card-title">{title}...</h5>
        <p className="card-text">{description}...</p>
        <p className="card-text">
          <small className="text-muted">
            By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}
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

export default NewsItem;
