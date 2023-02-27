import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Button from "./Button";

describe("Button", () => {
    const label = "I'm a label";

    it("Should load the button with the correct label and default styling", () => {
        render(<Button label={label} />);
        const button = screen.getByRole("button");
        expect(button).toHaveTextContent(label);
        expect(button.getAttribute("class")).toMatch(/Button/gi);
    });

    it("Should load the button with the correct label and secondary styling", () => {
        render(<Button label={label} secondary />);
        const button = screen.getByRole("button");
        expect(button).toHaveTextContent(label);
        expect(button.getAttribute("class")).toMatch(/Secondary/gi);
    });
});
