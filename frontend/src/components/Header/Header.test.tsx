import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import Header from "./Header";

describe("Header", () => {
    const title = "I'm a title";
    const backLabel = "Back";

    it("Should load the header with the correct label and without the headerButton", () => {
        render(
            <BrowserRouter>
                <Header title={title} />
            </BrowserRouter>
        );
        const header = screen.getByTitle(title);
        expect(header).toHaveTextContent(title);
        const headerButton = screen.queryByRole("button");
        expect(headerButton).not.toBeInTheDocument();
    });

    it("Should load the header with the correct label and with the headerButton", () => {
        render(
            <BrowserRouter>
                <Header title={title} headerButton={backLabel} />
            </BrowserRouter>
        );
        const header = screen.getByTitle(title);
        expect(header).toHaveTextContent(title);
        const headerButton = screen.queryByRole("button");
        expect(headerButton).toBeInTheDocument();
    });
});

// Why do I need to wrap the Header component in a browser router?
// Header component contains a <Link>, otherwise the test will fail with the error:
// Error: useHref() may be used only in the context of a <Router> component.
