import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Message from "./Message";

describe("Message", () => {
    it("Should load the message with default styling", () => {
        const messageText = "no type";
        render(<Message>{messageText}</Message>);
        const message = screen.getByText(messageText);
        expect(message).toBeInTheDocument();
        expect(message.getAttribute("class")).toMatch(/Message/gi);
    });
    it("Should load the message with loading styling", () => {
        const messageText = "loading";
        render(<Message type={messageText}>{messageText}</Message>);
        const message = screen.getByText(messageText);
        expect(message).toBeInTheDocument();
        expect(message.getAttribute("class")).toMatch(/Loading/gi);
    });
    it("Should load the message with success styling", () => {
        const messageText = "success";
        render(<Message type={messageText}>{messageText}</Message>);
        const message = screen.getByText(messageText);
        expect(message).toBeInTheDocument();
        expect(message.getAttribute("class")).toMatch(/Success/gi);
    });
    it("Should load the message with error styling", () => {
        const messageText = "error";
        render(<Message type={messageText}>{messageText}</Message>);
        const message = screen.getByText(messageText);
        expect(message).toBeInTheDocument();
        expect(message.getAttribute("class")).toMatch(/Error/gi);
    });
    it("Should load the message with warning styling", () => {
        const messageText = "warning";
        render(<Message type={messageText}>{messageText}</Message>);
        const message = screen.getByText(messageText);
        expect(message).toBeInTheDocument();
        expect(message.getAttribute("class")).toMatch(/warning/gi);
    });
});
