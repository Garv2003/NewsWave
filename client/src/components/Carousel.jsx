import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Protypes from "prop-types";

function CarouselBox({ data, loading, error }) {
  function getimage(item) {
    if (item?.media[0]?.type === "image") {
      return item?.media[0]?.["media-metadata"][2]?.url;
    }
    return "https://www.nytimes.com/vi-assets/static-assets/nyt5/images/foundation/logos/nyt-logo-1200x1200.png";
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

  return (
    <Carousel className="container my-3 cursor-pointer">
      {data.map((item, i) => (
        <Carousel.Item interval={i * 1000} key={i}>
          <Image
            style={{ height: "400px", width: "100%" }}
            src={getimage(item)}
            alt={item?.title}
            thumbnail
            rounded
          />
          <Carousel.Caption
            className="text-dark bg-light p-1 mb-4"
            style={{ borderRadius: "10px", cursor: "pointer" }}
            onClick={() => window.open(data[0]?.url, "_blank")}
          >
            <h3>{item?.title}</h3>
            <p>{item?.abstract}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

CarouselBox.propTypes = {
  data: Protypes.array,
  loading: Protypes.bool,
  error: Protypes.object,
};

export default CarouselBox;
