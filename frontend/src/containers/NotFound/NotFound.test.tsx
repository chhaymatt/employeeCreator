import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import NotFound from "./NotFound";

describe("NotFound", () => {
    it("Should display the 404 page", () => {
        render(
            <BrowserRouter>
                <NotFound />
            </BrowserRouter>
        );

        expect(screen.getByRole("heading")).toHaveTextContent(
            "404 page not found"
        );
        expect(
            screen.getByText(
                "The page you're looking for could not be found. It may have been moved or archived, or you may have followed a broken link from another site."
            )
        ).toBeInTheDocument();
        expect(screen.getByText("View list of employees")).toBeInTheDocument();
        expect(screen.getByText("Add a new employee")).toBeInTheDocument();
    });
});
