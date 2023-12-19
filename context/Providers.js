"use client";
import { ThemeProvider } from "next-themes";
import React from "react";

const Providers = ({ children, ...props }) => {
  return <ThemeProvider attribute="class" defaultTheme='dark'>{children}</ThemeProvider>;
};

export default Providers;
