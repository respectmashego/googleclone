import React, { createContext, useContext, useState } from "react";

const ResultContext = createContext();
const baseUrl = "https://google-api31.p.rapidapi.com";

export const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("Elon musk");

  const getResults = async (type, requestBody) => {
    setIsLoading(true);
    console.log("API KEY", import.meta.env);
    const response = await fetch(`${baseUrl}${type}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": "c58592a125msh701333371cea928p16b95cjsnefe778fc7e5f",
        "X-RapidAPI-Host": "google-api31.p.rapidapi.com",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    console.log(data);
    setResults(data);
    setIsLoading(false);
  };

  return (
    <ResultContext.Provider
      value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}
    >
      {children}
    </ResultContext.Provider>
  );
};

export const useResultContext = () => useContext(ResultContext);
