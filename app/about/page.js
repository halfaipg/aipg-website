"use client";

import Link from "next/link";
import React, { useEffect } from "react";

const About = () => {
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
      <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* <div class="aspect-w-16 aspect-h-7">
    <img class="w-full object-cover rounded-xl" src="https://images.unsplash.com/photo-1624571409412-1f253e1ecc89?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80" alt="Image Description" />
  </div> */}

        <div class="mt-5 lg:mt-16 grid lg:grid-cols-3 gap-8 lg:gap-12">
          <div class="lg:col-span-1">
            <h2 class="font-bold text-2xl md:text-3xl text-gray-800 dark:text-gray-200">
              What is Hivecoin ?
            </h2>
            <p class="mt-2 md:mt-4 text-gray-500">
              Hivecoin is a blockchain platform that integrates simplified smart
              contracts. According to the Bitcoin protocol’s UTXO model to
              develop and test, and based on Ravencoin and the Bitcoin code
              branch to create. Hivecoin creates a simplified version of the
              smart contract module and uses it to implement asset issue, asset
              transaction, asset mortgage, community autonomy, master node
              network, budget review, and DEFI
            </p>
          </div>

          <div class="lg:col-span-2">
            <div class="grid sm:grid-cols-2 gap-8 md:gap-12">
              <div class="flex gap-x-5">
                <svg
                  class="flex-shrink-0 mt-1 w-6 h-6 text-blue-600 dark:text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect width="18" height="10" x="3" y="11" rx="2" />
                  <circle cx="12" cy="5" r="2" />
                  <path d="M12 7v4" />
                  <line x1="8" x2="8" y1="16" y2="16" />
                  <line x1="16" x2="16" y1="16" y2="16" />
                </svg>
                <div class="grow">
                  <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
                    ASIC resistant
                  </h3>
                  <p class="mt-1 text-gray-600 dark:text-gray-400">
                    Uses the KAWPOW hashing algorithm to discourage the
                    development of ASIC hardware.
                  </p>
                </div>
              </div>
              <div class="flex gap-x-5">
                <svg
                  class="flex-shrink-0 mt-1 w-6 h-6 text-blue-600 dark:text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M7 10v12" />
                  <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                </svg>
                <div class="grow">
                  <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
                    Simple and affordable
                  </h3>
                  <p class="mt-1 text-gray-600 dark:text-gray-400">
                    From boarding passes to movie tickets, there's pretty much
                    nothing you can't store with Preline.
                  </p>
                </div>
              </div>
              <div class="flex gap-x-5">
                <svg
                  class="flex-shrink-0 mt-1 w-6 h-6 text-blue-600 dark:text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
                <div class="grow">
                  <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
                    Fair launch
                  </h3>
                  <p class="mt-1 text-gray-600 dark:text-gray-400">
                    Everyone has equal opportunity to mine or purchase HVQ since
                    day one.
                  </p>
                </div>
              </div>
              <div class="flex gap-x-5">
                <svg
                  class="flex-shrink-0 mt-1 w-6 h-6 text-blue-600 dark:text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <div class="grow">
                  <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
                    No ICO
                  </h3>
                  <p class="mt-1 text-gray-600 dark:text-gray-400">
                    No pre-mine
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div class="md:grid md:grid-cols-2 md:items-center md:gap-12 xl:gap-32">
          <div class="mt-5 sm:mt-10 lg:mt-0">
            <div class="space-y-6 sm:space-y-8">
              <div class="space-y-2 md:space-y-4">
                <h2 class="font-bold text-3xl lg:text-4xl text-gray-800 dark:text-gray-200">
                  A fork of the Ravencoin code, Hivecoin features four key
                  changes:
                </h2>
                <p class="text-gray-500">
                  The current KAWPOW algorithm aims to overcome the problem of
                  centralisation of mining by utilising over the counter graphic
                  processing unit (GPU) memory and compute capabilities. This is
                  intended to allow most consumer grade GPU hardware to mine
                  Hivecoin. The KAWPOW algorithm was derived from ProgPOW and
                  ethhash, with modifications, to improve the distribution of
                  Hivecoin to everyone.
                </p>
              </div>
              <ul role="list" class="space-y-2 sm:space-y-4">
                <li class="flex space-x-3">
                  <span class="mt-0.5 h-5 w-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                    <svg
                      class="flex-shrink-0 h-3.5 w-3.5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>

                  <span class="text-sm sm:text-base text-gray-500">
                    <span class="font-bold">21 billion</span> coin supply
                  </span>
                </li>

                <li class="flex space-x-3">
                  <span class="mt-0.5 h-5 w-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                    <svg
                      class="flex-shrink-0 h-3.5 w-3.5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>

                  <span class="text-sm sm:text-base text-gray-500">
                    1 minute <span class="font-bold">block time</span>
                  </span>
                </li>

                <li class="flex space-x-3">
                  <span class="mt-0.5 h-5 w-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                    <svg
                      class="flex-shrink-0 h-3.5 w-3.5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>

                  <span class="text-sm sm:text-base text-gray-500">
                    The issuance schedule (block reward of 5,000 HVQ)
                  </span>
                </li>
                <li class="flex space-x-3">
                  <span class="mt-0.5 h-5 w-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                    <svg
                      class="flex-shrink-0 h-3.5 w-3.5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>

                  <span class="text-sm sm:text-base text-gray-500">
                    KAWPOW Mining algorithm
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <img
              class="rounded-xl"
              src="https://images.unsplash.com/photo-1648737963503-1a26da876aca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&h=900&q=80"
              alt="Image Description"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
