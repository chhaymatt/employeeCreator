import axios from "axios";
import { describe, it, expect, vi, beforeEach } from "vitest";
import {
    addEmployee,
    deleteEmployee,
    getEmployee,
    getEmployeeList,
    updateEmployee,
} from "./EmployeeAPI";
import { createEmployee, createEmployees } from "./EmployeeFactory";

describe("EmployeeAPI", () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it("Should make a GET request to fetch all employees", async () => {
        // Given
        const employeesMock = createEmployees();
        axios.get = vi.fn().mockResolvedValue({ data: employeesMock });

        // When
        const employees = await getEmployeeList();

        // Then
        expect(axios.get).toHaveBeenCalledWith(
            "/api/employees"
        );
        expect(employees).toEqual(employeesMock);
    });

    it("Should make a GET request to fetch an employee by id", async () => {
        // Given
        const employeesMock = createEmployees(1);
        axios.get = vi.fn().mockResolvedValue({ data: employeesMock });
        const id = 1;

        // When
        const employees = await getEmployee(id);

        // Then
        expect(axios.get).toHaveBeenCalledWith(
            `/api/employees/${id}`
        );
        expect(employees[id - 1]).toEqual(employeesMock[id - 1]);
    });

    it("Should make a DELETE request to delete an employee by id", async () => {
        // Given
        axios.delete = vi.fn().mockResolvedValue({ data: true });
        const id = 1;

        // When
        const response = await deleteEmployee(id);

        // Then
        expect(axios.delete).toHaveBeenCalledWith(
            `/api/employees/${id}`
        );
        expect(response).toBeTruthy();
    });

    it("Should make a POST request to create an employee", async () => {
        // Given
        const employeeMock = createEmployee();
        axios.post = vi.fn().mockResolvedValue({ data: employeeMock });

        // When
        const response = await addEmployee(employeeMock);

        // Then
        expect(axios.post).toHaveBeenCalledWith(
            "/api/employees",
            employeeMock
        );
        expect(response).toEqual(employeeMock);
    });

    it("Should make a PUT request to update an employee", async () => {
        // Given
        const id = 1;
        const employeeMock = createEmployee();
        axios.put = vi.fn().mockResolvedValue({ data: employeeMock });

        // When
        const response = await updateEmployee(id, employeeMock);

        // Then
        expect(axios.put).toHaveBeenCalledWith(
            `/api/employees/${id}`,
            employeeMock
        );
        expect(response).toEqual(employeeMock);
    });
});
