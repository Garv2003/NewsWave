import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import News from "../../components/News/News";
import LoadingBar from "react-top-loading-bar";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  const [progress, setProgress] = React.useState(10);
  return (
    <>
      <NavBar />
      <LoadingBar
        color="#0d6efd"
        height={3}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <News setProgress={setProgress} />
      <Footer />
    </>
  );
};

export default Home;
