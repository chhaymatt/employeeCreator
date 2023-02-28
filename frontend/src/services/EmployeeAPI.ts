import axios from "axios";
import { EmployeeType } from "../containers/EmployeeList/EmployeeList";

const BASE_URL = "/api";

export const addEmployee = async (body: EmployeeType) => {
    const response = await axios.post(`${BASE_URL}/employees`, body);
    return response.data;
};

export const getEmployeeList = async () => {
    const response = await axios.get(`${BASE_URL}/employees`);
    return response.data;
};

export const getEmployee = async (id: number) => {
    const response = await axios.get(`${BASE_URL}/employees/${id}`);
    return response.data;
};

export const updateEmployee = async (id: number, body: EmployeeType) => {
    const response = await axios.put(`${BASE_URL}/employees/${id}`, body);
    return response.data;
};

export const deleteEmployee = async (id: number) => {
    const response = await axios.delete(`${BASE_URL}/employees/${id}`);
    return response.data;
};
