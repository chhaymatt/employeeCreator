import Button from "../../components/Button/Button";
import EmployeeCard from "../../components/EmployeeCard/EmployeeCard";
import Header from "../../components/Header/Header";
import styles from "./EmployeeList.module.scss";
import { Link } from "react-router-dom";
import { getEmployeeList } from "../../services/EmployeeAPI";
import { useQuery } from "react-query";
import { AxiosError } from "axios";
import Message from "../../components/Message/Message";
import { Search } from "../../components/Search/Search";
import { useState } from "react";
import { Filter } from "../../components/Filter/Filter";

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
    finishDate: string | null;
    isOngoing: boolean;
    workType: string;
    hoursPerWeek: number;
};

const EmployeeList = () => {
    const query = useQuery("employees", getEmployeeList);
    const [inputValue, setInputValue] = useState("");
    const [contractFilter, setContractFilter] = useState("");
    const [workFilter, setWorkFilter] = useState("");
    const contractFilters: string[] = ["PERMANENT", "CONTRACT"];
    const workFilters: string[] = ["FULL_TIME", "PART_TIME"];

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
                    to={`/employees/add-employee`}
                >
                    <Button label={`Add employee`} />
                </Link>
            </section>
            <Search
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setInputValue(e.target.value);
                }}
            />
            <section className={styles.Filters}>
                <div className={styles.Filters__Group}>
                    {contractFilters.map((filter, index) => {
                        return (
                            <Filter
                                key={index}
                                title={filter}
                                isActive={filter === contractFilter}
                                onClick={(e: React.MouseEvent) => {
                                    const el = e.target as HTMLElement;
                                    el.textContent?.toUpperCase() !==
                                    contractFilter
                                        ? setContractFilter(filter)
                                        : setContractFilter("");
                                }}
                            />
                        );
                    })}
                </div>
                <div className={styles.Filters__Group}>
                    {workFilters.map((filter, index) => {
                        return (
                            <Filter
                                key={index}
                                title={filter}
                                isActive={filter === workFilter}
                                onClick={(e: React.MouseEvent) => {
                                    const el = e.target as HTMLElement;
                                    el.textContent
                                        ?.toUpperCase()
                                        .replace("-", "_") !== workFilter
                                        ? setWorkFilter(filter)
                                        : setWorkFilter("");
                                }}
                            />
                        );
                    })}
                </div>
            </section>
            {query.isLoading && (
                <Message type="loading">Loading employees...</Message>
            )}
            {query.isError && (
                <Message type="error">{`${
                    (query?.error as AxiosError).message
                }. Please try again later.`}</Message>
            )}
            {query?.data && query.data.length === 0 && (
                <Message type="warning">
                    There are no employees. Get started by clicking on 'Add
                    employee' above.
                </Message>
            )}
            {query?.data &&
                query.data
                    .filter(
                        (employee: EmployeeType) =>
                            employee.firstName
                                .toLowerCase()
                                .includes(inputValue.toLowerCase()) ||
                            employee.lastName
                                .toLowerCase()
                                .includes(inputValue.toLowerCase()) ||
                            employee.email
                                .toLowerCase()
                                .includes(inputValue.toLowerCase()) ||
                            employee.mobile
                                .toLowerCase()
                                .includes(inputValue.toLowerCase())
                    )
                    .filter((employee: EmployeeType) =>
                        employee.contractType.includes(
                            contractFilter.toUpperCase()
                        )
                    )
                    .filter((employee: EmployeeType) =>
                        employee.workType.includes(workFilter.toUpperCase())
                    )
                    .map((employee: EmployeeType) => (
                        <EmployeeCard key={employee.id} employee={employee} />
                    ))}
        </div>
    );
};

export default EmployeeList;
