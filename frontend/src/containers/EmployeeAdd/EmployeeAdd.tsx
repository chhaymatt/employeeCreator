import { AxiosError } from "axios";
import { useMutation } from "react-query";
import Header from "../../components/Header/Header";
import Message from "../../components/Message/Message";
import { addEmployee } from "../../services/EmployeeAPI";
import { ErrorData } from "../../shared/ErrorData";
import EmployeeDetails from "../EmployeeDetails/EmployeeDetails";
import { EmployeeType } from "../EmployeeList/EmployeeList";

const EmployeeAdd = () => {
    const addMutation = useMutation(addEmployee, {
        onSuccess: (response: EmployeeType) => {
            window.scrollTo(0, document.body.scrollTop);
        },
        onError: (error: AxiosError) => {
            window.scrollTo(0, document.body.scrollHeight);
        },
    });
    return (
        <>
            <Header title={`Add new employee`} headerButton={`Back`} />
            {addMutation.isSuccess && (
                <Message type="success">
                    {`${addMutation.data.firstName} ${addMutation.data.lastName} was saved to Employee Id ${addMutation.data.id}`}
                </Message>
            )}
            <EmployeeDetails mutation={addMutation} />
            {addMutation.isLoading && (
                <Message type="loading">Saving employee...</Message>
            )}
            {addMutation.isError &&
                addMutation.error.response &&
                (addMutation.error.response.data as ErrorData) && (
                    <Message type="error">
                        {(addMutation.error.response.data as ErrorData).message}
                    </Message>
                )}
            {addMutation.isError && (
                <Message type="error">{`Unable to add employee. ${addMutation.error.message}`}</Message>
            )}
        </>
    );
};

export default EmployeeAdd;
