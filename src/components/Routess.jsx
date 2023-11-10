import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Results } from "./Results";

export const Routess = () => {
  return (
    <div className="p-4">
      <Routes>
        <Route  index element={<Navigate from="/" to="/search" />} />
        <Route path="/search" element={<Results />} />
        <Route path="/images" element={<Results />} />
        <Route path="/news" element={<Results />} />
        <Route path="/videos" element={<Results />} />
      </Routes>
    </div>
  );
};
