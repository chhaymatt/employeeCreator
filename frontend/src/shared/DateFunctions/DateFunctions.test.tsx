import { describe, it, expect } from "vitest";
import { MonthsEnum } from "../Enums";
import { formatDay, formatMonth, getMonthFromValue } from "./DateFunctions";

describe("formatMonth", () => {
    it("Should return the correct value", () => {
        expect(formatMonth(MonthsEnum.JANUARY)).toStrictEqual("01");
        expect(formatMonth(MonthsEnum.FEBRUARY)).toStrictEqual("02");
        expect(formatMonth(MonthsEnum.MARCH)).toStrictEqual("03");
        expect(formatMonth(MonthsEnum.APRIL)).toStrictEqual("04");
        expect(formatMonth(MonthsEnum.MAY)).toStrictEqual("05");
        expect(formatMonth(MonthsEnum.JUNE)).toStrictEqual("06");
        expect(formatMonth(MonthsEnum.JULY)).toStrictEqual("07");
        expect(formatMonth(MonthsEnum.AUGUST)).toStrictEqual("08");
        expect(formatMonth(MonthsEnum.SEPTEMBER)).toStrictEqual("09");
        expect(formatMonth(MonthsEnum.OCTOBER)).toStrictEqual("10");
        expect(formatMonth(MonthsEnum.NOVEMBER)).toStrictEqual("11");
        expect(formatMonth(MonthsEnum.DECEMBER)).toStrictEqual("12");
    });
});

describe("formatDay", () => {
    it("Should return the correct value", () => {
        expect(formatDay("1")).toStrictEqual("01");
        expect(formatDay("01")).toStrictEqual("01");
        expect(formatDay("09")).toStrictEqual("09");
        expect(formatDay("9")).toStrictEqual("09");
        expect(formatDay("10")).toStrictEqual("10");
        expect(formatDay("31")).toStrictEqual("31");
    });
});

describe("getMonthFromValue", () => {
    it("Should return the correct value", () => {
        expect(getMonthFromValue(1)).toStrictEqual(MonthsEnum.JANUARY);
        expect(getMonthFromValue(2)).toStrictEqual(MonthsEnum.FEBRUARY);
        expect(getMonthFromValue(3)).toStrictEqual(MonthsEnum.MARCH);
        expect(getMonthFromValue(4)).toStrictEqual(MonthsEnum.APRIL);
        expect(getMonthFromValue(5)).toStrictEqual(MonthsEnum.MAY);
        expect(getMonthFromValue(6)).toStrictEqual(MonthsEnum.JUNE);
        expect(getMonthFromValue(7)).toStrictEqual(MonthsEnum.JULY);
        expect(getMonthFromValue(8)).toStrictEqual(MonthsEnum.AUGUST);
        expect(getMonthFromValue(9)).toStrictEqual(MonthsEnum.SEPTEMBER);
        expect(getMonthFromValue(10)).toStrictEqual(MonthsEnum.OCTOBER);
        expect(getMonthFromValue(11)).toStrictEqual(MonthsEnum.NOVEMBER);
        expect(getMonthFromValue(12)).toStrictEqual(MonthsEnum.DECEMBER);
    });
});
