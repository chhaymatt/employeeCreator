import { useState } from "react";
import { Link } from "react-router-dom";
import { EmployeeType } from "../../containers/EmployeeList/EmployeeList";
import InlineButtons from "../InlineButtons/InlineButtons";
import Message from "../Message/Message";
import styles from "./EmployeeCard.module.scss";

type EmployeeCardProps = {
	employee: EmployeeType;
};

const EmployeeCard = ({ employee }: EmployeeCardProps) => {
	const [error, setError] = useState("");
	let duration, durationUnit;
	const durationInMilliSeconds =
		Date.parse(employee.finishDate) - Date.parse(employee.startDate);
	const durationInMonths = Math.ceil(durationInMilliSeconds / 2.628e9);
	const durationInYears = Math.ceil(durationInMilliSeconds / 3.154e10);

	if (durationInMonths >= 12) {
		duration = durationInYears; // Duration in years
		durationUnit = "yr";
	} else {
		duration = durationInMonths; // Duration in months
		durationUnit = "month";
	}

	return (
		<div className={styles.EmployeeCard}>
			<div className={styles.EmployeeSection}>
				<section className={styles.Details}>
					<Link
						className={styles.Link}
						to={`/employeeCreator/employees/${employee.id}`}>
						<h3>
							{employee.firstName} {employee.lastName}
						</h3>
					</Link>
					<p>{`Employee Id: ${employee.id}`}</p>
					<p>
						{`${
							employee.contractType.charAt(0).toUpperCase() +
							employee.contractType.slice(1).toLowerCase()
						} -
					${duration} ${duration > 1 ? `${durationUnit}s` : durationUnit}`}
					</p>
					<p>{employee.email}</p>
				</section>
				<InlineButtons id={employee.id as number} setError={setError} />
			</div>
			{error && (
				<Message type="error">
					{`${error}. Please try again later.`}
				</Message>
			)}
		</div>
	);
};

export default EmployeeCard;
