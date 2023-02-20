import Button from "../../components/Button/Button";
import EmployeeCard from "../../components/EmployeeCard/EmployeeCard";
import Header from "../../components/Header/Header";
import styles from "./EmployeeList.module.scss";
import { createEmployees } from "../../services/factories/Employees";

export type EmployeeType = {
	id: string;
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
	const employees = createEmployees(5);
	console.log(employees);
	return (
		<div className={styles.EmployeeList}>
			<Header title={`Employees' list`} />
			<section className={styles.Section}>
				<p className={styles.Section__Text}>
					Please click on 'Edit' to find more details of each
					employee.
				</p>
				<Button label={`Add employee`} />
			</section>
			{employees.map((employee, index) => (
				<EmployeeCard key={index} employee={employee} />
			))}
		</div>
	);
};

export default EmployeeList;
