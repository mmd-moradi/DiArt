"use client";
import { useEffect, useState } from "react";

export enum MediaType {
  xs = 350,
  sm = 576,
  md = 768,
  lg = 992,
  xl = 1136,
  xxl = 1800,
}

export const useWindowWidth = (size: number) => {
  const [width, setWidth] = useState<number>(0);
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [setWidth]);

  return width <= size;
};

export const MediaQuery = (media: MediaType) => {
  return useWindowWidth(media);
};
