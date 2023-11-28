import Link from "next/link";
import Image from "next/image";
import React from "react";
import { urlFor } from "@/lib/sanity-client";

const BlogsCard = ({ image, title, _createdAt, overview, slug }) => {
  return (
    <Link
      className="group rounded-xl overflow-hidden"
      href={`/blog/${slug.current}`}
    >
      <div className="sm:flex bg-gray-100 rounded p-4">
        <div className="flex-shrink-0 relative rounded-xl overflow-hidden w-full sm:w-56 h-44">
          <Image
            src={urlFor(image.asset._ref).url()}
            alt={"Image"}
            className="group-hover:scale-105 transition-transform duration-500 ease-in-out w-full h-full absolute top-0 left-0 object-cover rounded-xl"
            fill
          />
        </div>

        <div className="grow mt-4 sm:mt-0 sm:ml-6 px-4 sm:px-0">
          <h3 className="text-xl font-semibold text-gray-800 group-hover:text-gray-600 dark:text-gray-800 dark:group-hover:text-white">
            {title}
          </h3>
          <p className="mt-3 text-gray-600 dark:text-gray-800 max-h-36 overflow-hidden">
            {overview}
          </p>
          <p className="mt-4 inline-flex items-center gap-x-1.5 text-blue-600 decoration-2 hover:underline font-medium">
            Read more
            <svg
              className="w-2.5 h-2.5"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BlogsCard;
