import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Message from "../../components/Message/Message";
import { getEmployee, updateEmployee } from "../../services/EmployeeAPI";
import { ErrorData } from "../../shared/ErrorData";
import EmployeeDetails from "../EmployeeDetails/EmployeeDetails";
import { EmployeeType } from "../EmployeeList/EmployeeList";

const EmployeeUpdate = () => {
    const { id } = useParams();
    const employeeId = id ? +id : 0;
    const queryClient = useQueryClient();
    let query;
    if (employeeId) {
        query = useQuery(
            ["employee", employeeId],
            () => getEmployee(employeeId),
            {
                onSuccess: (employee: EmployeeType) => {},
                onError: (error: AxiosError) => {},
            }
        );
    }

    const updateMutation = useMutation(
        (payload: EmployeeType) => updateEmployee(employeeId, payload),
        {
            onSuccess: (response: EmployeeType) => {
                queryClient.invalidateQueries("employee");
            },
            onError: (error: AxiosError) => {},
        }
    );

    return (
        <>
            <Header title={`Employee details`} headerButton={`Back`} />
            {query?.isLoading && (
                <Message type="loading">{`Loading employee Id ${employeeId}`}</Message>
            )}
            {query?.isSuccess && <div>{`Employee Id ${query.data.id}`}</div>}
            {query?.isError && query.error.response ? (
                <Message type="error">
                    {`${(query.error.response.data as ErrorData).message}`}
                </Message>
            ) : (
                query?.isError && (
                    <Message type="error">
                        {`${query.error.message}. Please try again later.`}
                    </Message>
                )
            )}
            {query?.data && (
                <EmployeeDetails
                    employee={query.data}
                    mutation={updateMutation}
                />
            )}
            {updateMutation.isLoading && (
                <Message type="loading">Updating employee...</Message>
            )}
            {updateMutation.isSuccess && (
                <Message type="success">
                    {`Updated Employee Id ${updateMutation.data.id} - ${updateMutation.data.firstName} ${updateMutation.data.lastName}`}
                </Message>
            )}
            {updateMutation.isError && updateMutation.error.response && (
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
