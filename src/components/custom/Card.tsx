"use client";

import Image from "next/image";
import Link from "next/link";
import { FollowerPointerCard } from "../ui/following-pointer";
import type { BlogProps } from "~/types";

function ConvertDate(date: string) {
  const d = new Date(date);
  return d.toDateString();
}

export default function Card({ blog }: { blog: BlogProps }) {
  return (
    <div className="mx-auto w-80">
      <FollowerPointerCard
        title={
          <TitleComponent
            title={blog.author}
            // avatar={blogContent.authorAvatar}
          />
        }
      >
        <div className="group relative h-full overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-xl transition duration-200">
          <div className="aspect-w-16 aspect-h-10 xl:aspect-w-16 xl:aspect-h-10 relative w-full overflow-hidden rounded-tl-lg rounded-tr-lg bg-gray-100">
            <Image
              src={blog.urlToImage ?? "/favicon.png"}
              width={500}
              height={200}
              alt="thumbnail"
              className={`h-50 sm:h-50 w-full transform object-cover transition duration-200 group-hover:scale-95 group-hover:rounded-2xl md:h-60 lg:h-80 xl:h-80`}
            />
          </div>
          <div className="p-4">
            <h2 className="my-4 text-lg font-bold text-zinc-700">
              {blog.title}
            </h2>
            <h2 className="my-4 text-sm font-normal text-zinc-500">
              {blog.content}
            </h2>
            <div className="mt-10 flex flex-row items-center justify-between">
              <span className="text-sm text-gray-500">
                {ConvertDate(blog.publishedAt)}
              </span>
              <Link href={blog.url} target="_blank">
                <div className="relative z-10 block rounded-xl bg-black px-6 py-2 text-xs font-bold text-white">
                  Read More
                </div>
              </Link>
            </div>
          </div>
        </div>
      </FollowerPointerCard>
    </div>
  );
}

const TitleComponent = ({
  title,
  // avatar,
}: {
  title: string;
  // avatar: string;
}) => (
  <div className="flex items-center space-x-2 text-lg font-bold text-black dark:text-white">
    {/* <Image
      src={avatar}
      height="20"
      width="20"
      alt="thumbnail"
      className="rounded-full border-2 border-white"
    /> */}
    <p>{title}</p>
  </div>
);
