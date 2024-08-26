"use client";
import {
  Grid,
  PaginationBar,
  Footer,
  NavBar,
  Slider,
} from "~/components/custom";
import { api } from "~/trpc/react";

export default function Home() {
  const blogs = api.news.news.useQuery();

  if (blogs.isLoading) {
    return <div>Loading...</div>;
  }

  if (blogs.error) {
    return (
      <div>
        Error: {blogs.error ? blogs.error.message : "An error occurred"}
      </div>
    );
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center">
      <NavBar isProfile={false} />
      <Slider />
      <Grid blogs={blogs.data.articles} />
      <PaginationBar />
      <Footer />
    </main>
  );
}
