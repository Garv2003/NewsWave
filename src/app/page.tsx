import { getServerAuthSession } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { signOut } from "next-auth/react";
import Card from "~/components/custom/Card";
import Search from "~/components/custom/Search";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });
  // const session = await getServerAuthSession();

  const blogContent = {
    slug: "amazing-tailwindcss-grid-layouts",
    author: "Manu Arora",
    date: "28th March, 2023",
    title: "Amazing Tailwindcss Grid Layout Examples",
    description:
      "Grids are cool, but Tailwindcss grids are cooler. In this article, we will learn how to create amazing Grid layouts with Tailwindcs grid and React.",
    image: "/demo/thumbnail.png",
    authorAvatar: "/manu.png",
  };

  return (
    <HydrateClient>
      <main className="flex min-h-screen w-full flex-col items-center justify-center">
        <nav className="flex w-full flex-col items-center justify-between border-b border-gray-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex w-full items-center justify-between">
            <h1 className="text-2xl font-bold text-black dark:text-white">
              NewsWave
            </h1>
            <Search />
            <button className="rounded-md bg-black p-2 font-bold text-white dark:bg-white dark:text-black">
              Sign Out
            </button>
          </div>

          <div className="mt-4 flex w-full max-w-4xl items-center justify-between">
            <button className="font-bold text-black dark:text-white">
              General
            </button>
            <button className="font-bold text-black dark:text-white">
              Technology
            </button>
            <button className="font-bold text-black dark:text-white">
              Business
            </button>
            <button className="font-bold text-black dark:text-white">
              Politics
            </button>
            <button className="font-bold text-black dark:text-white">
              Sports
            </button>
            <button className="font-bold text-black dark:text-white">
              Entertainment
            </button>
            <button className="font-bold text-black dark:text-white">
              Science
            </button>
            <button className="font-bold text-black dark:text-white">
              Health
            </button>
          </div>
        </nav>

        <div className="grid h-full w-full grid-cols-1 gap-5 p-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Card blogContent={blogContent} />
          <Card blogContent={blogContent} />
          <Card blogContent={blogContent} />
          <Card blogContent={blogContent} />
          <Card blogContent={blogContent} />
          <Card blogContent={blogContent} />
          <Card blogContent={blogContent} />
          <Card blogContent={blogContent} />
          <Card blogContent={blogContent} />
          <Card blogContent={blogContent} />
          <Card blogContent={blogContent} />
        </div>

        <footer className="w-full border-t border-gray-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Made by Garv Aggarwal with ❤️
          </p>
        </footer>
      </main>
    </HydrateClient>
  );
}
