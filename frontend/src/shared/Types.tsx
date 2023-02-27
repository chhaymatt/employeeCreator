import { ContractTypesEnum, MonthsEnum, WorkTypesEnum } from "./Enums";

export type Inputs = {
    firstName: string;
    middleName: string | null;
    lastName: string;
    email: string;
    mobile: string;
    address: string;
    contractType: ContractTypesEnum;
    startDateDay: number;
    startDateMonth: MonthsEnum;
    startDateYear: number;
    finishDateDay: number;
    finishDateMonth: MonthsEnum;
    finishDateYear: number;
    isOngoing: boolean;
    workType: WorkTypesEnum;
    hoursPerWeek: number;
};
