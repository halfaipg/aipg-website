import React from "react";
import Image from "next/image";
import Link from "next/link";
import { sanity_client, urlFor } from "@/lib/sanity-client";

const getData = async () => {
  const query = `*[_type == "blog"][0...3]| order(_createdAt desc)`;

  const data = sanity_client.fetch(query);

  return data;
};

export const revalidate = 30;
const BlogsSection = async () => {
  const data = await getData();
  return (
    <section className="p-4 sm:p-16 flex flex-col justify-center items-center">
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
            The Blog
          </h2>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Our Latest Blog Posts
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((post) => (
            <Link
              className="group flex flex-col h-full border border-gray-200 hover:border-transparent hover:shadow-lg transition-all duration-300 rounded-xl p-5 dark:border-gray-700 dark:hover:border-transparent dark:hover:shadow-black/[.4]"
              href={`/blogs/${post.slug.current}`}
            >
              <div className="aspect-w-16 aspect-h-11">
                <Image
                  className="w-full object-cover rounded-xl"
                  src={urlFor(post.image.asset._ref).url()}
                  alt={post.title}
                  height={200}
                  width={200}
                />
              </div>
              <div className="my-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300 dark:group-hover:text-white">
                  {post.title}
                </h3>
                <p className="mt-5 text-gray-600 dark:text-gray-400 overflow-hidden">
                  {post.overview}
                </p>
              </div>
              <div className="mt-auto flex items-center gap-x-3">
                <div>
                  <h5 className="text-sm text-gray-800 dark:text-gray-200 font-semibold">
                    {new Date(post._createdAt).toISOString().split("T")[0]}
                  </h5>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-12 text-center">
          <a
            className="inline-flex justify-center items-center gap-x-2 text-center bg-white border hover:border-gray-300 text-sm text-blue-600 hover:text-blue-700 font-medium hover:shadow-sm rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:bg-slate-900 dark:border-gray-700 dark:hover:border-gray-600 dark:text-blue-500 dark:hover:text-blue-400 dark:hover:shadow-slate-700/[.7] dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
            href="/blogs"
          >
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
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;
