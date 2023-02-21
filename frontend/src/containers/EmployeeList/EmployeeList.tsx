import Button from "../../components/Button/Button";
import EmployeeCard from "../../components/EmployeeCard/EmployeeCard";
import Header from "../../components/Header/Header";
import styles from "./EmployeeList.module.scss";
import { createEmployees } from "../../services/factories/Employees";
import { Link } from "react-router-dom";

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
	//const employees: EmployeeType[] = [];
	
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
					to={`/employeeCreator/employees/add-employee`}>
					<Button label={`Add employee`} />
				</Link>
			</section>
			{employees &&
				employees.map((employee, index) => (
					<EmployeeCard key={index} employee={employee} />
				))}
		</div>
	);
};

export default EmployeeList;
