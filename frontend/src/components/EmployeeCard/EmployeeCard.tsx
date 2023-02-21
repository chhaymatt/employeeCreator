import { EmployeeType } from "../../containers/EmployeeList/EmployeeList";
import InlineButtons from "../InlineButtons/InlineButtons";
import styles from "./EmployeeCard.module.scss";

type EmployeeCardProps = {
	employee: EmployeeType;
};
const EmployeeCard = ({ employee }: EmployeeCardProps) => {
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
			<section className={styles.Details}>
				<h3>
					{employee.firstName} {employee.lastName}
				</h3>
				<p>
					{`${employee.contractType} -
					${duration} ${duration > 1 ? `${durationUnit}s` : durationUnit}`}
				</p>
				<p>{employee.email}</p>
			</section>
			<InlineButtons id={employee.id} />
		</div>
	);
};

export default EmployeeCard;
