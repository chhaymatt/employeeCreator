import { ContractTypesEnum, MonthsEnum, WorkTypesEnum } from "./Enums";

export type Inputs = {
    firstName: string;
    middleName: string | null;
    lastName: string;
    email: string;
    mobile: string;
    address: string;
    contractType: ContractTypesEnum;
    startDateDay: string;
    startDateMonth: MonthsEnum;
    startDateYear: string;
    finishDateDay: string;
    finishDateMonth: MonthsEnum;
    finishDateYear: string;
    isOngoing: boolean;
    workType: WorkTypesEnum;
    hoursPerWeek: number;
};
