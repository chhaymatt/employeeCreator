import { Link } from "react-router-dom";
import { EmployeeType } from "../../containers/EmployeeList/EmployeeList";
import styles from "./InlineButtons.module.scss";

type InlineButtonProps = {
	employee: EmployeeType;
};
const InlineButtons = ({ employee }: InlineButtonProps) => {
	return (
		<section className={styles.InlineButtons}>
			<Link
				className={styles.InlineButtons__Link}
				to={`/employeeCreator/employees/${employee.id}`}>
				<button className={styles.InlineButtons__Button}>Edit</button>
			</Link>
			<span className={styles.InlineButtons__Divider}>|</span>
			<button className={styles.InlineButtons__Button}>Remove</button>
		</section>
	);
};

export default InlineButtons;
