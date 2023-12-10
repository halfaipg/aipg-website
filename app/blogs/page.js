"use client";

import { sanity_client } from "@/lib/sanity-client";
import React, { useEffect } from "react";
import Link from "next/link";
import BlogsCard from "@/components/BlogsCard";

const getData = async () => {
  const query = `*[_type == "blog"]| order(_createdAt desc)`;

  const data = sanity_client.fetch(query);

  return data;
};

export const revalidate = 30;
const page = async () => {
  const data = await getData();
  return (
    <div className="bg-white">
      <section className="w-full h-96 flex flex-row items-end justify-end sm:justify-start p-4 sm:py-12 sm:px-32 relative">
        <video
          src="/video.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        />
        <div className="bg-white p-6 text-black w-full sm:h-full h-auto sm:w-[30%]">
          <h1 className="text-3xl sm:text-4xl  font-extrabold">About</h1>
          <p className="my-4 text-sm font-medium">
            Our team are best in class and responsible for maximizing account
            goals and efficiently executing vital daily account tasks.
          </p>
          <Link
            href="/faqs"
            className="my-4 px-6 py-2 sm:py-4 font-semibold flex flex-row space-x-2 border-b-2 border-cyan-300 max-w-[80%] hover:scale-90 duration-300 ease-in-out"
          >
            View our FAQs
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 ml-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
            </span>
          </Link>
        </div>
      </section>
      <section className="p-8 sm:p-8 min-h-screen dark:bg-zinc-900">
        <div className="my-8">
          <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            <div className="grid lg:grid-cols-2 lg:gap-y-16 gap-10">
              {data.map((post) => (
                <div key={post._id}>
                  <BlogsCard
                    image={post.image}
                    title={post.title}
                    overview={post.overview}
                    _createdAt={post._createdAt}
                    slug={post.slug}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
