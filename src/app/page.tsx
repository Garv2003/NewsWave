import {
  Grid,
  PaginationBar,
  Footer,
  NavBar,
  Slider,
} from "~/components/custom";
import { api } from "~/trpc/server";

export default async function Home() {
  const blogs = await api.news.news();

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center">
      <NavBar isProfile={false} />
      <Slider />
      <Grid blogs={blogs.articles} />
      <PaginationBar />
      <Footer />
    </main>
  );
}
