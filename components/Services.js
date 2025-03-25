"use client";
import { useEffect } from "react";

const Services = () => {
  useEffect(() => {
    import("preline");
  }, []);
  return (
    <div className="bg-white dark:bg-transparent">
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 items-center gap-6 md:gap-10">
          <div className="w-full h-full bg-white shadow-lg rounded-lg p-5 dark:bg-slate-900">
            <div className="flex items-center gap-x-4 mb-3">
              <div className="inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-4 border-blue-50 bg-blue-100 dark:border-blue-900 dark:bg-blue-800">
                <svg
                  className="flex-shrink-0 w-6 h-6 text-blue-600 dark:text-blue-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="13.5" cy="6.5" r=".5" />
                  <circle cx="17.5" cy="10.5" r=".5" />
                  <circle cx="8.5" cy="7.5" r=".5" />
                  <circle cx="6.5" cy="12.5" r=".5" />
                  <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                </svg>
              </div>
              <div className="flex-shrink-0">
                <h3 className="block text-lg font-semibold text-gray-800 dark:text-white">
                Community-Driven Development
                </h3>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
            Our development process is transparent and collaborative, with all major decisions guided by community input. We're building a global network of developers who contribute code, identify issues, suggest improvements, and shape the future direction of our technologies. This distributed approach ensures our platform truly serves the needs of the developer community.
            </p>
          </div>

          <div className="w-full h-full bg-white shadow-lg rounded-lg p-5 dark:bg-slate-900">
            <div className="flex items-center gap-x-4 mb-3">
              <div className="inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-4 border-blue-50 bg-blue-100 dark:border-blue-900 dark:bg-blue-800">
                <svg
                  className="flex-shrink-0 w-6 h-6 text-blue-600 dark:text-blue-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 3h20" />
                  <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
                  <path d="m7 21 5-5 5 5" />
                </svg>
              </div>
              <div className="flex-shrink-0">
                <h3 className="block text-lg font-semibold text-gray-800 dark:text-white">
                Knowledge Sharing & Education
                </h3>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
            We're committed to making AI knowledge accessible through comprehensive documentation, tutorials, workshops, and open research. By demystifying AI technologies and promoting learning, we're empowering developers to build their expertise and contribute meaningfully to the field. Our educational resources range from beginner-friendly guides to advanced technical discussions.
            </p>
          </div>

          <div className="w-full h-full bg-white shadow-lg rounded-lg p-5 dark:bg-slate-900">
            <div className="flex items-center gap-x-4 mb-3">
              <div className="inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-4 border-blue-50 bg-blue-100 dark:border-blue-900 dark:bg-blue-800">
                <svg
                  className="flex-shrink-0 w-6 h-6 text-blue-600 dark:text-blue-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                  <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
                  <path d="M2 7h20" />
                  <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
                </svg>
              </div>
              <div className="flex-shrink-0">
                <h3 className="block text-lg font-semibold text-gray-800 dark:text-white">
                Transparent AI Architecture
                </h3>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
            Unlike proprietary AI systems that operate as black boxes, our models and systems are fully transparent and auditable. This approach allows developers to understand how our AI makes decisions, identify potential biases, and build trust in the technology. We believe that transparency is essential for responsible AI development and adoption.
            </p>
          </div>

          <div className="w-full h-full bg-white shadow-lg rounded-lg p-5 dark:bg-slate-900">
            <div className="flex items-center gap-x-4 mb-3">
              <div className="inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-4 border-blue-50 bg-blue-100 dark:border-blue-900 dark:bg-blue-800">
                <svg
                  className="flex-shrink-0 w-6 h-6 text-blue-600 dark:text-blue-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5.5 8.5 9 12l-3.5 3.5L2 12l3.5-3.5Z" />
                  <path d="m12 2 3.5 3.5L12 9 8.5 5.5 12 2Z" />
                  <path d="M18.5 8.5 22 12l-3.5 3.5L15 12l3.5-3.5Z" />
                  <path d="m12 15 3.5 3.5L12 22l-3.5-3.5L12 15Z" />
                </svg>
              </div>
              <div className="flex-shrink-0">
                <h3 className="block text-lg font-semibold text-gray-800 dark:text-white overflow-auto">
                 Developer-Friendly Tools
                </h3>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
            We're building a comprehensive ecosystem of developer tools, APIs, and SDKs that make it easy to integrate powerful generative AI into applications. Our tools are designed with developers in mind, emphasizing clean interfaces, extensive documentation, and practical examples to accelerate development and innovation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
