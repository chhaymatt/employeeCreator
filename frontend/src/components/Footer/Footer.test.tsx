import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Footer from "./Footer";

describe("Footer", () => {
    const year = new Date().getFullYear();

    it("Should load the current year and display name", () => {
        render(<Footer />);
        const footer = screen.getByText(`${year} | Made by Matthew Chhay`);
        expect(footer).toBeInTheDocument;
        expect(footer).toHaveAttribute("href", "https://matthewchhay.com");
    });
});
