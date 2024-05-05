import { useEffect, useState } from "react";
import { NavBar, News, Carousel, Footer } from "../components";
import LoadingBar from "react-top-loading-bar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import LocalForage from "localforage";
import { toast } from "react-hot-toast";

const Home = () => {
  const [progress, setProgress] = useState(10);
  const [page, setPage] = useState(0);
  const { category } = useParams();
  const [query, setQuery] = useState("trending");
  const [search, setSearch] = useState("");

  const fetchNews = async () => {
    try {
      if (navigator.onLine) {
        const data = await axios.get(
          `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=AGjS8Eh5M6UNdryEfKHtY6OxBOHclQLc#`
        );
        await LocalForage.setItem("trending", data.data.results);
        return data.data.results;
      } else {
        const data = await LocalForage.getItem("trending");
        return data;
      }
    } catch (error) {
      toast.error("Failed to fetch news");
      return await LocalForage.getItem("trending");
    }
  };

  const updateNews = async ({ queryKey }) => {
    const [_key, { query, page }] = queryKey || [_key, {}];
    try {
      if (navigator.onLine) {
        const data = await axios.get(
          `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&page=${page}&api-key=AGjS8Eh5M6UNdryEfKHtY6OxBOHclQLc#`
        );
        await LocalForage.setItem("news", data.data.response.docs);
        return data.data.response.docs;
      } else {
        const data = await LocalForage.getItem("news");
        return data;
      }
    } catch (error) {
      toast.error("Failed to fetch news");
      return await LocalForage.getItem("news");
    }
  };

  const {
    data: news,
    error: newserror,
    isLoading: loading,
    refetch: refetchNews,
  } = useQuery({
    queryKey: ["news", { query, page }],
    queryFn: updateNews,
    keepPreviousData: true,
  });

  const { data, error, isLoading } = useQuery({
    queryKey: ["trending"],
    queryFn: fetchNews,
    keepPreviousData: true,
  });

  useEffect(() => {
    setProgress(100);
    if (category) {
      setQuery(category);
    } else {
      setQuery("trending");
    }
    refetchNews();
  }, [query, refetchNews, category]);

  const handleSearch = async () => {
    setProgress(100);
    setQuery(search);
    setPage(0);
    refetchNews();
  };

  return (
    <>
      <NavBar
        setSearch={setSearch}
        search={search}
        handleSearch={handleSearch}
      />
      <LoadingBar
        color="#0d6efd"
        height={3}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Carousel data={data} loading={isLoading} error={error} />
      <News
        setProgress={setProgress}
        news={news}
        loading={loading}
        error={newserror}
        page={page}
        setPage={setPage}
        updateNews={updateNews}
      />
      <Footer />
    </>
  );
};

export default Home;
