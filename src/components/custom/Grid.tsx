import React from "react";
import Card from "./Card";
import type { BlogProps } from "~/types";

const Grid = ({ blogs }: { blogs: BlogProps[] }) => {
  return (
    <div className="grid h-full w-full grid-cols-1 gap-5 p-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {blogs.map((blog, index) => (
        <Card key={index} blog={blog} />
      ))}
    </div>
  );
};

export default Grid;
