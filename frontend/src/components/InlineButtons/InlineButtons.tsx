import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { EmployeeType } from "../../containers/EmployeeList/EmployeeList";
import { deleteEmployee } from "../../services/EmployeeAPI";
import styles from "./InlineButtons.module.scss";

type InlineButtonProps = {
	id: number;
	setError: (error: string) => void;
};

const InlineButtons = ({ id, setError }: InlineButtonProps) => {
	const queryClient = useQueryClient();
	const deleteMutation = useMutation((id: number) => deleteEmployee(id), {
		onSuccess: (response: boolean) => {
			console.log(
				"Employee was successfully deleted, response:",
				response
			);
			// Invalidate and refetch
			queryClient.invalidateQueries("employees");
		},
		onError: (error: AxiosError) => {
			console.log(error.message);
			setError(error.message);
		},
	});

	return (
		<section className={styles.InlineButtons}>
			<Link
				className={styles.InlineButtons__Link}
				to={`/employeeCreator/employees/${id}`}>
				<button className={styles.InlineButtons__Button}>Edit</button>
			</Link>
			<span className={styles.InlineButtons__Divider}>|</span>
			<button
				onClick={() => deleteMutation.mutate(id)}
				className={styles.InlineButtons__Button}>
				Remove
			</button>
		</section>
	);
};

export default InlineButtons;
