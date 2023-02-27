import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HeaderButton from "./HeaderButton";

describe("HeaderButton", () => {
    const label = "Back";

    it("Should load the button with the correct label", () => {
        render(<HeaderButton label={label} />);
        const button = screen.getByRole("button");
        expect(button).toHaveTextContent(label);
    });
});
