import { faker } from "@faker-js/faker";

export const createEmployee = (id?: number) => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const startDateRaw = faker.date.between(
        "2020-01-01T00:00:00.000Z",
        "2023-02-20T00:00:00.000Z"
    );
    const finishDateRaw = faker.date.future(10, startDateRaw);
    return {
        id: id,
        firstName: firstName,
        middleName: faker.name.middleName(),
        lastName: lastName,
        email: faker.internet.email(firstName, lastName),
        mobile: faker.phone.number("04########"),
        address: `${faker.address.streetAddress()}, ${
            faker.address.cityName
        } ${faker.address.zipCode("####")}`,
        contractType: faker.helpers.arrayElement(["PERMANENT", "CONTRACT"]),
        startDate: startDateRaw.toISOString(),
        finishDate: finishDateRaw.toISOString(),
        isOngoing: faker.datatype.boolean(),
        workType: faker.helpers.arrayElement(["FULL_TIME", "PART_TIME"]),
        hoursPerWeek: faker.datatype.number({
            min: 0,
            max: 40,
        }),
    };
};

export const createEmployees = (numEmployees = 5) => {
    const employees = [];
    for (let i = 1; i <= numEmployees; i++) {
        employees.push(createEmployee(i));
    }
    return employees;
};
