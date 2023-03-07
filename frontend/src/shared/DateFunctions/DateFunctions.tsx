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
 * Get the monthEnum from the month value
 * @param   {number}        m The month (valid: 1-12)
 * @returns {MonthsEnum}      The MonthEnum (MonthsEnum.JANUARY-MonthsEnum.DECEMBER)
 */
export const getMonthFromValue = (value: number): MonthsEnum => {
    const monthNames = Object.keys(MonthsEnum);
    const index = value - 1;
    const monthName = monthNames[index];
    return MonthsEnum[monthName as keyof typeof MonthsEnum];
};

/**
 * Get the number of days in any particular month
 * @link https://stackoverflow.com/a/1433119/1293256
 * @param  {number} m The month (valid: 0-11)
 * @param  {number} y The year
 * @return {number}   The number of days in the month
 */
const daysInMonth = (m: number, y: number): number => {
    switch (m) {
        case 1:
            return (y % 4 == 0 && y % 100) || y % 400 == 0 ? 29 : 28;
        case 8:
        case 3:
        case 5:
        case 10:
            return 30;
        default:
            return 31;
    }
};

/**
 * Check if a date is valid
 * @link https://stackoverflow.com/a/1433119/1293256
 * @param  {string}  d The day
 * @param  {string}  m The month (valid: 1-12)
 * @param  {string}  y The year
 * @return {boolean}   Returns true if valid
 */
export const isValidDate = (d: string, m: string, y: string): boolean => {
    const month = parseInt(m, 10) - 1;
    const day = parseInt(d, 10);
    const year = parseInt(y, 10);
    return (
        month >= 0 && month < 12 && day > 0 && day <= daysInMonth(month, year)
    );
};
