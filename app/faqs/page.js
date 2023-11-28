"use client";

import Link from "next/link";
import React, { useEffect } from "react";

const page = () => {
  const FAQ_Questions = [
    {
      id: 1,
      question: "Q. What is your pricing structure?",
      answer:
        "A. Our pricing structure is based on a flat rate minimum + a % of revenue, whichever is higher. The rates depend on the size of your account. Please contact us for a proposal for your account.",
    },
    {
      id: 2,
      question: "Q. What should I expect from the proposal process?",
      answer:
        "A. After sending us your information, please give our team a day or two to get back to you. We'll ask a few follow-up questions and schedule a discovery call to make sure you can ask all the questions you want from our team. Following that call, we'll package a proposal for your review and approval.",
    },
    {
      id: 3,
      question:
        "Q. How long does it take to see results from your marketing campaigns?",
      answer:
        "A. The timeframe for seeing results can vary depending on several factors, such as the type of campaign, your target audience, and the industry you're in. Some campaigns may yield noticeable results within a few weeks, while others might take a few months. We work closely with our clients to set realistic expectations and provide regular updates on the progress of the campaigns.",
    },
    {
      id: 4,
      question:
        "Q. Can you explain more about your network of Onlyfans creators?",
      answer:
        "A. Our network consists of a diverse group of Onlyfans creators who have built a substantial following and are actively seeking opportunities to collaborate with other creators. If you're interested in leveraging this network for paid shoutouts, we can connect you with relevant creators based on your target audience and niche.",
    },
    {
      id: 5,
      question:
        "Q. What marketing platforms do you work with for paid campaigns?",
      answer:
        "A. We are uniquely partnered with various marketing firms and platforms to enhance the visibility of your brand or content. Our partnerships allow us to leverage different advertising channels, including social media platforms, search engines, and other digital advertising avenues.",
    },
    {
      id: 6,
      question: "Q. How can I track the performance of my marketing campaigns?",
      answer:
        "A. We provide detailed analytics and reporting for all our marketing campaigns. Our team will set up tracking mechanisms to monitor key performance indicators (KPIs) and provide you with regular reports. You'll have access to data on impressions, clicks, conversions, and other relevant metrics to gauge the effectiveness of the campaigns.",
    },
    {
      id: 7,
      question:
        "Q. Do you offer custom marketing solutions for specific industries?",
      answer:
        "A. Yes, we understand that different industries have unique marketing requirements. We tailor our marketing strategies to align with the specific needs and characteristics of your industry. Our team will work closely with you to develop a customized marketing plan that resonates with your target audience and achieves your business objectives.",
    },
    {
      id: 8,
      question: "Q. What sets your marketing services apart from others?",
      answer:
        "A. Our marketing services stand out due to our deep expertise, strategic approach, and strong partnerships with industry-leading platforms. We focus on data-driven strategies, continuously optimize campaigns, and provide transparent reporting. Additionally, our network of Onlyfans creators allows us to tap into a highly engaged audience for paid shoutouts, giving your brand greater exposure.",
    },
    {
      id: 9,
      question: "Q. Can you handle marketing campaigns of all sizes?",
      answer:
        "A. Yes, we have experience managing marketing campaigns of various sizes, from small businesses to large enterprises. Our team is equipped to handle the complexity and scale of campaigns, ensuring that each client receives the attention and dedication required to achieve their marketing goals.",
    },
    {
      id: 10,
      question: "Q. How do I get started with your marketing services?",
      answer:
        "A. Getting started is easy! Simply reach out to us through our contact form or give us a call. We'll discuss your marketing objectives and requirements in detail and provide you with a tailored proposal. Once you approve the proposal, we'll begin crafting and executing the marketing strategies to help your business grow.",
    },
  ];
  useEffect(() => {
    import("preline");
  }, []);

  return (
    <div>
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
          <h1 className="text-3xl sm:text-4xl  font-extrabold">FAQs</h1>
          <p className="my-4 text-sm font-medium">
            Our team are best in class and responsible for maximizing account
            goals and efficiently executing vital daily account tasks.
          </p>
          <Link
            href="/services"
            className="my-4 px-6 py-2 sm:py-4 font-semibold flex flex-row space-x-2 border-b-2 border-cyan-300 max-w-[80%] hover:scale-90 duration-300 ease-in-out"
          >
            View our Services
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
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto bg-white dark:bg-transparent">
        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
            Your questions, answered
          </h2>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Have a question not answered? Please{" "}
            <span>
              <Link
                href="/contact"
                className="py-2 transition duration-150 ease-in-out px-auto hover:underline text-blue-600 hover:text-black"
              >
                {" "}
                contact us
              </Link>{" "}
            </span>
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="hs-accordion-group">
            {FAQ_Questions.map((items) => (
              <div
                className="hs-accordion hs-accordion-active:bg-gray-100 rounded-xl p-6 dark:hs-accordion-active:bg-white/[.05] active"
                id="hs-basic-with-title-and-arrow-stretched-heading-one"
                key={items.id}
              >
                <button
                  className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400"
                  aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one"
                >
                  {items.question}
                  <svg
                    className="hs-accordion-active:hidden block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                  <svg
                    className="hs-accordion-active:block hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                </button>
                <div
                  id="hs-basic-with-title-and-arrow-stretched-collapse-one"
                  className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                  aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one"
                >
                  <p className="text-gray-800 dark:text-gray-200">
                    {items.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
