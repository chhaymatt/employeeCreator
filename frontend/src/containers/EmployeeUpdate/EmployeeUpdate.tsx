import { AxiosError } from "axios";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Message from "../../components/Message/Message";
import { getEmployee, updateEmployee } from "../../services/EmployeeAPI";
import { getMonthFromValue } from "../../shared/DateFunctions";
import { ContractTypesEnum, WorkTypesEnum } from "../../shared/Enums";
import { ErrorData } from "../../shared/ErrorData";
import { Inputs } from "../../shared/Types";
import EmployeeDetails from "../EmployeeDetails/EmployeeDetails";
import { EmployeeType } from "../EmployeeList/EmployeeList";

const EmployeeUpdate = () => {
    const [formObject, setFormObject] = useState<Inputs>();
    const { id } = useParams();
    const employeeId = parseInt(id ?? "0", 10) ? parseInt(id ?? "0", 10) : 0;
    const queryClient = useQueryClient();
    const query = useQuery(
        ["employee", employeeId],
        () => getEmployee(employeeId),
        {
            onSuccess: (employee: EmployeeType) => {
                const [startYear, startMonth, startDay] =
                    employee.startDate.split("-");
                const [finishYear, finishMonth, finishDay] =
                    employee.finishDate.split("-");
                const object = {
                    firstName: employee.firstName,
                    middleName: employee.middleName,
                    lastName: employee.lastName,
                    email: employee.email,
                    mobile: employee.mobile,
                    address: employee.address,
                    contractType:
                        ContractTypesEnum[
                            employee.contractType as keyof typeof ContractTypesEnum
                        ],
                    startDateDay: +startDay,
                    startDateMonth: getMonthFromValue(+startMonth),
                    startDateYear: +startYear,
                    finishDateDay: +finishDay,
                    finishDateMonth: getMonthFromValue(+finishMonth),
                    finishDateYear: +finishYear,
                    isOngoing: employee.isOngoing,
                    workType:
                        WorkTypesEnum[
                            employee.workType as keyof typeof WorkTypesEnum
                        ],
                    hoursPerWeek: employee.hoursPerWeek,
                };
                setFormObject(object);
            },
            onError: (error: AxiosError) => {},
        }
    );

    const updateMutation = useMutation(
        (payload: EmployeeType) => updateEmployee(employeeId, payload),
        {
            onSuccess: (response: EmployeeType) => {
                window.scrollTo(0, document.body.scrollHeight);
                queryClient.invalidateQueries("employee");
            },
            onError: (error: AxiosError) => {
                window.scrollTo(0, document.body.scrollHeight);
            },
        }
    );

    return (
        <>
            <Header title={`Employee details`} headerButton={`Back`} />
            {query?.isLoading && (
                <Message type="loading">{`Loading employee Id ${id}`}</Message>
            )}
            {query?.isSuccess && (
                <div>{`Employee Id ${query.data.id}: ${query.data.firstName} ${query.data.lastName}`}</div>
            )}
            {query?.isError &&
                query.error.response &&
                (query.error.response.data as ErrorData).message && (
                    <Message type="error">
                        {`${(query.error.response.data as ErrorData).message}`}
                    </Message>
                )}
            {query?.isError && (
                <Message type="error">
                    {`Unable to load employee. ${query.error.message}. Please try again later.`}
                </Message>
            )}
            {formObject && (
                <EmployeeDetails
                    employee={formObject}
                    mutation={updateMutation}
                />
            )}
            {updateMutation.isLoading && (
                <Message type="loading">Updating employee...</Message>
            )}
            {updateMutation.isSuccess && (
                <Message type="success">
                    {`Updated employee Id ${updateMutation.data.id} - ${updateMutation.data.firstName} ${updateMutation.data.lastName}`}
                </Message>
            )}
            {updateMutation.isError &&
                updateMutation.error.response &&
                (updateMutation.error.response.data as ErrorData).message && (
                    <Message type="error">
                        {`${
                            (updateMutation.error.response.data as ErrorData)
                                .message
                        }`}
                    </Message>
                )}
            {updateMutation.isError && (
                <Message type="error">
                    {`Unable to update employee. ${updateMutation.error.message}`}
                </Message>
            )}
        </>
    );
};

export default EmployeeUpdate;
