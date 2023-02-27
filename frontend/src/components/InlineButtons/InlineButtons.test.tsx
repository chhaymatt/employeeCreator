import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import InlineButtons from "./InlineButtons";

describe("InlineButtons", () => {
    it("Should load the Edit and Remove buttons", () => {
        const queryClient = new QueryClient();
        const id = 1;
        render(
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <InlineButtons id={id} setError={() => {}} />
                </QueryClientProvider>
            </BrowserRouter>
        );
        const editButton = screen.getByText("Edit");
        expect(editButton).toBeInTheDocument();
        expect(editButton).toHaveAttribute("name", "Edit");

        const removeButton = screen.getByText("Remove");
        expect(removeButton).toBeInTheDocument();
        expect(removeButton).toHaveAttribute("name", "Remove");
    });
});
