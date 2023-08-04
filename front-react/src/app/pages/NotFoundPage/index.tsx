import React from "react";
import { Helmet } from "react-helmet-async";

export function NotFoundPage() {
  return (
    <>
      <Helmet title="Страница не найдена" />
      <h1>Page Not Found</h1>
    </>
  );
}
