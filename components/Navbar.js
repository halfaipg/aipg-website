"use client";

import Image from "next/image";
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

  const components = [
    {
      title: "Account Management",
      href: "/account-management",
      description: "Lorem ipsum something something",
    },
    {
      title: "Growth Management",
      href: "/growth-management",
      description: "Lorem Ipsum something something",
    },
    {
      title: "FAQs",
      href: "/faqs",
      description: "Frequently Asked Questions",
    },
  ];
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
              className="w-6 h-6"
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
              <h1 className="text-3xl font-semibold tracking-wide">
                AIPOWERGRID
              </h1>
            </Link>
          )}
        </div>
        <div className="w-[50%] justify-center items-center mx-auto">
          <ul className="hidden md:flex flex-row justify-evenly items-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem className="hover:bg-gray-600 rounded-[10px] hover:bg-opacity-20 text-black">
                  <Link href="/">
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem className="hover:bg-gray-600 rounded-[10px] hover:bg-opacity-20 text-black">
                  <Link href="/#slide-2">
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Services
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem className="hover:bg-gray-600 rounded-[10px] hover:bg-opacity-20 text-black">
                  <Link href="/#slide-3">
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Features
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem className="hover:bg-gray-600 rounded-[10px] hover:bg-opacity-20 text-black">
                  <Link href="/about">
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      About
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem className="hover:bg-gray-600 rounded-[10px] hover:bg-opacity-20 text-black">
                  <Link href="/blog">
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Roadmap
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem className="hover:bg-gray-600 rounded-[10px] hover:bg-opacity-20 text-black">
                  <Link href="/contact">
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Contact
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </ul>
        </div>
        <Link
          href="/contact"
          className="px-8 w-[70%] sm:w-auto py-4 bg-black rounded-lg text-white font-semibold hover:bg-blue-600  text-sm transition duration-200 ease-in-out hover:scale-105 flex flex-row items-center justify-center"
        >
          CTA!
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
                        <Link href="/account-management">
                          <li className="p-2 hover:bg-gray-500 hover:bg-opacity-25 rounded-xl text-sm w-full">
                            Services
                          </li>
                        </Link>
                        <Link href="/growth-management">
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
                  <Link href="/about">
                    <li className="p-4 hover:bg-gray-500 hover:bg-opacity-25 rounded-xl w-full flex flex-row items-baseline space-x-3">
                      <span className="text-sm font-semibold ">03. </span>{" "}
                      <span className="font-bold tracking-wide">Team</span>
                    </li>
                  </Link>
                  {/* <Link href="/blog">
                    <li className="p-4 hover:bg-gray-500 hover:bg-opacity-25 rounded-xl w-full flex flex-row items-baseline space-x-3">
                      <span className="text-sm font-semibold ">04. </span>{" "}
                      <span className="font-bold tracking-wide">Blogs</span>
                    </li>
                  </Link> */}
                  <Link href="/contact">
                    <li className="p-4 hover:bg-gray-500 hover:bg-opacity-25 rounded-xl w-full flex flex-row items-baseline space-x-3">
                      <span className="text-sm font-semibold ">04. </span>{" "}
                      <span className="font-bold tracking-wide">Contact</span>
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

export default Navbar;
