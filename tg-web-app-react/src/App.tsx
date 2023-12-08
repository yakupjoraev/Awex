import React from "react";
import RoutesWrapper from "./routes/RoutesWrapper";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./constants/query-client";

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RoutesWrapper />
    </QueryClientProvider>
  );
};

export default App;
