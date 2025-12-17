import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SearchScreen from "./screens/SearchScreen.jsx";
import ResultsScreen from "./screens/ResultsScreen.jsx";

/**
 * Two-screen app:
 *  - /search  -> user inputs email
 *  - /results -> shows customer details
 */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/search" replace />} />
      <Route path="/search" element={<SearchScreen />} />
      <Route path="/results" element={<ResultsScreen />} />
    </Routes>
  );
}
