"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const [isManagementOpen, setManagementOpen] = useState(false);

  const [isOverlayOpen, setOverlayOpen] = useState(false);

  useEffect(() => {
    if (isOverlayOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOverlayOpen]);

  useEffect(() => {
    setOverlayOpen(false);
  }, [pathname]);

  const handleOverlayToggle = () => {
    setOverlayOpen(!isOverlayOpen);
  };

  return (
    <nav className={` w-full top-0 p-4 bg-transparent z-50`}>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row justify-center items-center space-x-2 ml-4 z-50">
          <motion.div
            className="rounded-full p-4 bg-gray-100 cursor-pointer relative hover:scale-105 hover:bg-gray-200 z-50"
            onClick={handleOverlayToggle}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 dark:text-black"
            >
              {isOverlayOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
                />
              )}
            </svg>
          </motion.div>
          {isOverlayOpen ? (
            ""
          ) : (
            <Link href="/">
              {/* <img
                src={"/logo-black.png"}
                className="md:w-full md:h-[50px] w-auto h-auto object-cover"
                alt="logo"
              /> */}
              <h1 className="text-xl sm:text-3xl font-semibold tracking-wide">
                AIPOWERGRID
              </h1>
            </Link>
          )}
        </div>
        <div className="w-[50%] justify-center items-center mx-auto">
          <ul className="hidden md:flex flex-row justify-evenly items-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem className="hover:bg-gray-600 rounded-[10px] hover:bg-opacity-20 text-black dark:text-white">
                  <Link href="/">
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem className="hover:bg-gray-600 rounded-[10px] hover:bg-opacity-20 text-black dark:text-white">
                  <Link href="/about">
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      About
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem className="hover:bg-gray-600 rounded-[10px] hover:bg-opacity-20 text-black dark:text-white">
                  <Link href="https://pool1.aipowergrid.io" target="_blank">
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Mining Pool
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem className="hover:bg-gray-600 rounded-[10px] hover:bg-opacity-20 text-black dark:text-white">
                  <Link href="/wallet">
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Wallets
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem className="hover:bg-gray-600 rounded-[10px] hover:bg-opacity-20 text-black dark:text-white">
                  <Link href="/blogs">
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Blogs
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem className="hover:bg-gray-600 rounded-[10px] hover:bg-opacity-20 text-black dark:text-white">
                  <Link href="/faqs">
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      FAQs
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </ul>
        </div>

        <Link
          href="/wallet"
          className="px-8 w-[70%] sm:w-auto py-4 bg-black rounded-lg text-white font-semibold hover:bg-blue-600  text-sm transition duration-200 ease-in-out hover:scale-105 flex flex-row items-center justify-center dark:bg-blue-600"
        >
          Wallets
        </Link>
      </div>

      {/* Black Screen Overlay */}
      <AnimatePresence>
        {isOverlayOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-100 flex items-center justify-center z-40"
            style={{ maxHeight: "100vh" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col w-full p-16 items-start justify-start h-full text-white">
              <div className="h-[10%] sm:h-[20%] bg-transparent" />
              <div className="flex flex-col sm:mt-4 justify-start items-start p-4 w-full sm:w-[40%]">
                <ul className="text-xl font-semibold w-full">
                  <Link href="/">
                    <li className="p-4 hover:bg-gray-500 hover:bg-opacity-25 rounded-xl w-full flex flex-row items-baseline space-x-3">
                      <span className="text-sm font-semibold ">01. </span>{" "}
                      <span className="font-bold tracking-wide">Home</span>
                    </li>
                  </Link>
                  <li
                    className="p-4 hover:bg-gray-500 hover:bg-opacity-25 rounded-xl w-full flex flex-col items-baseline space-y-3 cursor-pointer"
                    onClick={() => setManagementOpen(!isManagementOpen)}
                  >
                    <div className="flex flex-row items-baseline space-x-3">
                      <span className="text-sm font-semibold ">02. </span>{" "}
                      <span className="font-bold tracking-wide">About</span>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`${
                        isManagementOpen ? "flex" : "hidden"
                      } flex-col`}
                    >
                      <ul className="flex flex-col space-y-2">
                        <Link href="/about">
                          <li className="p-2 hover:bg-gray-500 hover:bg-opacity-25 rounded-xl text-sm w-full">
                            About Us
                          </li>
                        </Link>
                        <Link href="/whitepaper">
                          <li className="p-2 hover:bg-gray-500 hover:bg-opacity-25 rounded-xl text-sm w-full">
                            Whitepaper
                          </li>
                        </Link>
                        <Link href="/faqs">
                          <li className="p-2 hover:bg-gray-500 hover:bg-opacity-25 rounded-xl text-sm w-full">
                            FAQs
                          </li>
                        </Link>
                      </ul>
                    </motion.div>
                  </li>
                  <Link href="/wallet">
                    <li className="p-4 hover:bg-gray-500 hover:bg-opacity-25 rounded-xl w-full flex flex-row items-baseline space-x-3">
                      <span className="text-sm font-semibold ">03. </span>{" "}
                      <span className="font-bold tracking-wide">Wallets</span>
                    </li>
                  </Link>
                  <Link href="/blogs">
                    <li className="p-4 hover:bg-gray-500 hover:bg-opacity-25 rounded-xl w-full flex flex-row items-baseline space-x-3">
                      <span className="text-sm font-semibold ">04. </span>{" "}
                      <span className="font-bold tracking-wide">Blogs</span>
                    </li>
                  </Link>
                  <Link href="pool1.aipowergrid.io" target="_blank">
                    <li className="p-4 hover:bg-gray-500 hover:bg-opacity-25 rounded-xl w-full flex flex-row items-baseline space-x-3">
                      <span className="text-sm font-semibold ">05. </span>{" "}
                      <span className="font-bold tracking-wide">
                        Mining Pools
                      </span>
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ListItem = ({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-xl p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground hover:bg-gray-600 hover:bg-opacity-25",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
};
ListItem.displayName = "ListItem";

// const Navbar = () => {
//   useEffect(() => {
//     import("preline");
//   }, []);
//   return (
//     <header class="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full text-sm">
//       <nav
//         class="mt-6 relative max-w-[85rem] w-full bg-white border border-gray-200 rounded-[36px] mx-2 py-3 px-4 md:flex md:items-center md:justify-between md:py-0 md:px-6 lg:px-8 xl:mx-auto dark:bg-gray-800 dark:border-gray-700"
//         aria-label="Global"
//       >
//         <div class="flex items-center justify-between">
//           <a
//             class="flex-none text-xl font-semibold dark:text-white"
//             href="#"
//             aria-label="Brand"
//           >
//             AIPOWERGRID
//           </a>
//           <div class="md:hidden">
//             <button
//               type="button"
//               class="hs-collapse-toggle w-8 h-8 flex justify-center items-center text-sm font-semibold rounded-full border border-gray-200 text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
//               data-hs-collapse="#navbar-collapse-with-animation"
//               aria-controls="navbar-collapse-with-animation"
//               aria-label="Toggle navigation"
//             >
//               <svg
//                 class="hs-collapse-open:hidden flex-shrink-0 w-4 h-4"
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 stroke-width="2"
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//               >
//                 <line x1="3" x2="21" y1="6" y2="6" />
//                 <line x1="3" x2="21" y1="12" y2="12" />
//                 <line x1="3" x2="21" y1="18" y2="18" />
//               </svg>
//               <svg
//                 class="hs-collapse-open:block hidden flex-shrink-0 w-4 h-4"
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 stroke-width="2"
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//               >
//                 <path d="M18 6 6 18" />
//                 <path d="m6 6 12 12" />
//               </svg>
//             </button>
//           </div>
//         </div>
//         <div
//           id="navbar-collapse-with-animation"
//           class="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block"
//         >
//           <div class="flex flex-col gap-y-4 gap-x-0 mt-5 md:flex-row md:items-center md:justify-end md:gap-y-0 md:gap-x-7 md:mt-0 md:ps-7">
//             <a
//               class="font-medium text-blue-600 md:py-6 dark:text-blue-500"
//               href="#"
//               aria-current="page"
//             >
//               Landing
//             </a>
//             <a
//               class="font-medium text-gray-500 hover:text-gray-400 md:py-6 dark:text-gray-400 dark:hover:text-gray-500"
//               href="#"
//             >
//               Account
//             </a>
//             <a
//               class="font-medium text-gray-500 hover:text-gray-400 md:py-6 dark:text-gray-400 dark:hover:text-gray-500"
//               href="#"
//             >
//               Work
//             </a>
//             <a
//               class="font-medium text-gray-500 hover:text-gray-400 md:py-6 dark:text-gray-400 dark:hover:text-gray-500"
//               href="#"
//             >
//               Blog
//             </a>

//             <div class="hs-dropdown [--strategy:static] md:[--strategy:fixed] [--adaptive:none] md:[--trigger:hover] md:py-4">
//               <button
//                 type="button"
//                 class="flex items-center w-full text-gray-500 hover:text-gray-400 font-medium dark:text-gray-400 dark:hover:text-gray-500 "
//               >
//                 Dropdown
//                 <svg
//                   class="ms-2 w-4 h-4"
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   stroke-width="2"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                 >
//                   <path d="m6 9 6 6 6-6" />
//                 </svg>
//               </button>

//               <div class="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] md:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 md:w-48 hidden z-10 bg-white md:shadow-md rounded-lg p-2 dark:bg-gray-800 md:dark:border dark:border-gray-700 dark:divide-gray-700 before:absolute top-full md:border before:-top-5 before:start-0 before:w-full before:h-5">
//                 <a
//                   class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
//                   href="#"
//                 >
//                   About
//                 </a>
//                 <div class="hs-dropdown relative [--strategy:static] md:[--strategy:absolute] [--adaptive:none] md:[--trigger:hover]">
//                   <button
//                     type="button"
//                     class="w-full flex justify-between items-center text-sm text-gray-800 rounded-lg py-2 px-3 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
//                   >
//                     Sub Menu
//                     <svg
//                       class="md:-rotate-90 ms-2 w-4 h-4"
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="24"
//                       height="24"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       stroke-width="2"
//                       stroke-linecap="round"
//                       stroke-linejoin="round"
//                     >
//                       <path d="m6 9 6 6 6-6" />
//                     </svg>
//                   </button>

//                   <div class="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] md:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 md:w-48 hidden z-10 md:mt-2 bg-white md:shadow-md rounded-lg p-2 dark:bg-gray-800 md:dark:border dark:border-gray-700 dark:divide-gray-700 before:absolute md:border before:-end-5 before:top-0 before:h-full before:w-5 top-0 end-full !mx-[10px]">
//                     <a
//                       class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
//                       href="#"
//                     >
//                       About
//                     </a>
//                     <a
//                       class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
//                       href="#"
//                     >
//                       Downloads
//                     </a>
//                     <a
//                       class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
//                       href="#"
//                     >
//                       Team Account
//                     </a>
//                   </div>
//                 </div>

//                 <a
//                   class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
//                   href="#"
//                 >
//                   Downloads
//                 </a>
//                 <a
//                   class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
//                   href="#"
//                 >
//                   Team Account
//                 </a>
//               </div>
//             </div>

//             <a
//               class="flex items-center gap-x-2 font-medium text-gray-500 hover:text-blue-600 md:border-s md:border-gray-300 md:my-6 md:ps-6 dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500"
//               href="#"
//             >
//               <svg
//                 class="flex-shrink-0 w-4 h-4"
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 stroke-width="2"
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//               >
//                 <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
//                 <circle cx="12" cy="7" r="4" />
//               </svg>
//               Log in
//             </a>
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// };
export default Navbar;
