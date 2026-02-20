import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";

const queryClient = new QueryClient();

function wrapper({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
}

describe("App", () => {
  it("renders home page after lazy load", async () => {
    render(<App />, { wrapper });
    await waitFor(() => {
      expect(screen.getByText(/Cloud-Native MERN Stack/i)).toBeInTheDocument();
    });
  });
});
