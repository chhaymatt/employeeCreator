import { MonthsEnum } from "../Enums";

export const formatMonth = (monthName: MonthsEnum): string => {
    const monthIndex = Object.values(MonthsEnum).indexOf(monthName) + 1;
    return monthIndex < 10 ? `0${monthIndex}` : `${monthIndex}`;
};

export const formatDay = (day: string): string => {
    return parseInt(day, 10) < 10
        ? `0${parseInt(day, 10)}`
        : `${parseInt(day, 10)}`;
};

/**
 * Getting the monthEnum from value
 * @param value Month value must be between 1 and 12, 1 = January, 12 = December.
 * @returns MonthEnum e.g. MonthsEnum.JANUARY --> MonthsEnum.DECEMBER
 */
export const getMonthFromValue = (value: number): MonthsEnum => {
    const monthNames = Object.keys(MonthsEnum);
    const index = value - 1;
    // if (index < 0 || index >= monthNames.length) {
    //     return 0;
    // }
    const monthName = monthNames[index];
    return MonthsEnum[monthName as keyof typeof MonthsEnum];
};
