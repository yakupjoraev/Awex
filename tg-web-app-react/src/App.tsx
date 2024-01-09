import React from "react";
import RoutesWrapper from "./routes/RoutesWrapper";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./constants/query-client";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RoutesWrapper />
      <Toaster />
    </QueryClientProvider>
  );
};

export default App;
