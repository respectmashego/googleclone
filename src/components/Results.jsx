import React, { useEffect } from "react";
import { useResultContext } from "../contexts/ResultContextProvider";
import { useLocation } from "react-router-dom";
import { Loading } from "./Loading";

export const Results = () => {
  const { results, isLoading, getResults, searchTerm } = useResultContext();
  const location = useLocation();

  useEffect(() => {
    if (searchTerm) {
      if (location.pathname === "/images") {
        getResults("/imagesearch", {
          text: searchTerm,
          safesearch: "off",
          region: "wt-wt",
          color: "",
          size: "small",
          type_image: "",
          layout: "",
          max_results: 100,
        });
      } else if (location.pathname === "/news") {
        getResults("/", {
          text: searchTerm,
          region: "wt-wt",
          max_results: 25,
        });
      } else if (location.pathname === "/videos") {
        getResults("/videosearch", {
          text: searchTerm,
          safesearch: "off",
          timelimit: "",
          duration: "",
          resolution: "",
          region: "wt-wt",
          max_results: 50,
        });
      } else {
        getResults("/websearch", {
          text: searchTerm,
          safesearch: "off",
          timelimit: "",
          region: "wt-wt",
          max_results: 20,
        });
      }
    }
  }, [searchTerm, location.pathname]);

  if (isLoading) return <Loading />;

  console.log(location.pathname);
  switch (location.pathname) {
    case "/search":
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56">
          {results?.result?.map(({ href, title }, index) => {
            return (
              <div key={index} className="md:w-2/5 w-full">
                <a href={href} target="_blank" rel="noreferrer">
                  <p className="text-sm">
                    {href.length > 30 ? href.substring(0, 30) : href}
                  </p>
                  <p className="text-xl  hover:underline  dark:text-blue-300 text-blue-700">
                    {title}
                  </p>
                </a>
              </div>
            );
          })}
        </div>
      );
    case "/images":
      return (
        <div className="flex flex-wrap justify-center items-center">
          {results?.result?.map(({ image, url, title }, index) => (
            <a
              href={url}
              target="_blank"
              key={index}
              rel="noreferrer"
              className="sm:p-3 p-5"
            >
              <img src={image} alt={title} loading="lazy" />
              <p className="sm:w-36 w-36 break-words text-sm mt-2">{title}</p>
            </a>
          ))}
        </div>
      );
  
    case "/news":
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56 items-center">
          {results?.news?.map(({ url, title }, index) => {
            return (
              <div key={index} className="md:w-2/5 w-full">
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
             
                  <p className="text-xl   dark:text-blue-300 text-blue-700">
                    {title}
                  </p>
                  <div className="flex gap-4">
                    <a href="" target="_blank" rel="noreferrer">{url}</a>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      );
    case "/videos":
      return "SEARCH";

    default:
      return "ERROR";
  }
};
