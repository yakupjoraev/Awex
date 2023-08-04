import React from "react";
import { Helmet } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { IndexPage } from "./pages/IndexPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { HomePage } from "./pages/HomePage";
import { SettingsPage } from "./pages/SettingsPage";
import { MyProjectsPage } from "./pages/MyProjectsPage";

export function App() {
  return (
    <BrowserRouter>
      <Helmet titleTemplate="%s - Awex" defaultTitle="Awex"></Helmet>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/projects" element={<MyProjectsPage />} />
        <Route path="/settings/*" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
