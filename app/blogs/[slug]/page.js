import { sanity_client, urlFor } from "@/lib/sanity-client";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";

async function getData(slug) {
  const query = `*[_type == "blog" && slug.current == "${slug}"]`;

  const data = await sanity_client.fetch(query);

  return data;
}

export const revalidate = 30;
const PortableTextComponent = {
  types: {
    image: ({ value }) => {
      return (
        <div className="relative w-full h-96 m-10 mx-auto">
          <Image
            className="object-contain"
            src={urlFor(value).url()}
            alt="blog post image"
            fill
          />
        </div>
      );
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="ml-10 py-5 list-disc space-y-5">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mt-lg list-decimal">{children}</ol>
    ),
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-5xl py-10 font-bold">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-4xl py-10 font-bold">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-3xl py-10 font-bold">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-2xl py-10 font-bold">{children}</h4>
    ),

    blockquote: ({ children }) => (
      <blockquote className="border-l-[#f7ab0a] border-l-4 pl-5 py-5 my-5">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;

      return (
        <Link
          href={value.href}
          rel={rel}
          className="underline decoration-[#f7ab0a] hover:decoration-black"
        >
          {children}
        </Link>
      );
    },
  },
};
const Post = ({ data }) => {
  return (
    <div className="bg-white">
      {data.map((post) => (
        <section className="p-8 sm:p-16 min-h-screen">
          <div className="flex flex-row justify-between items-center mx-4 my-4">
            <p className="font-semibold tracking-tight text-lg">
              Published On:{" "}
              {new Date(post._createdAt).toISOString().split("T")[0]}
            </p>
            <Link
              href="/blog"
              className="hover:scale-105 transition duration-200 ease-in-out text-lg font-semibold bg-black rounded text-white px-4 py-2"
            >
              Go Back
            </Link>
          </div>
          <div className="flex flex-col justify-center items-center p-8 space-y-4">
            <Image
              src={urlFor(post.image.asset._ref).url()}
              alt={post.title}
              height={1000}
              width={1000}
              className="w-auto h-96 rounded-xl object-contain"
            />
            <h1 className="text-4xl text-center tracking-tight font-bold my-12">
              {post.title}
            </h1>
            <div className="p-4">
              <PortableText
                value={post.content}
                components={PortableTextComponent}
              />
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

const page = async ({ params }) => {
  const data = await getData(params.slug);

  return <Post data={data} />;
};

export default page;
