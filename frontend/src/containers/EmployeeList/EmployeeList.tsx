import Button from "../../components/Button/Button";
import EmployeeCard from "../../components/EmployeeCard/EmployeeCard";
import Header from "../../components/Header/Header";
import styles from "./EmployeeList.module.scss";
import { Link } from "react-router-dom";
import { getEmployeeList } from "../../services/EmployeeAPI";
import { useQuery } from "react-query";
import { AxiosError } from "axios";
import Message from "../../components/Message/Message";

export type EmployeeType = {
    id?: number;
    firstName: string;
    middleName: string | null;
    lastName: string;
    email: string;
    mobile: string;
    address: string;
    contractType: string;
    startDate: string;
    finishDate: string;
    isOngoing: boolean;
    workType: string;
    hoursPerWeek: number;
};

const EmployeeList = () => {
    const query = useQuery("employees", getEmployeeList);
    const employees: EmployeeType[] = query.data;
    const error = query.error as AxiosError;

    return (
        <div className={styles.EmployeeList}>
            <Header title={`Employees' list`} />
            <section className={styles.Section}>
                <p className={styles.Section__Text}>
                    Please click on 'Edit' to find more details of each
                    employee.
                </p>
                <Link
                    className={styles.Section__Link}
                    to={`/employeeCreator/employees/add-employee`}
                >
                    <Button label={`Add employee`} />
                </Link>
            </section>
            {query.isLoading && (
                <Message type="loading">Loading employees...</Message>
            )}
            {query.isError && (
                <Message type="error">{`${error.message}. Please try again later.`}</Message>
            )}
            {employees && employees.length === 0 && (
                <Message type="warning">
                    There are no employees. Get started by clicking on 'Add
                    employee' above.
                </Message>
            )}
            {employees &&
                employees.map((employee, index) => (
                    <EmployeeCard key={index} employee={employee} />
                ))}
        </div>
    );
};

export default EmployeeList;
