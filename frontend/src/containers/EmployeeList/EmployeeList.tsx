import Button from "../../components/Button/Button";
import EmployeeCard from "../../components/EmployeeCard/EmployeeCard";
import Header from "../../components/Header/Header";
import styles from "./EmployeeList.module.scss";
import { Link } from "react-router-dom";
import { getEmployeeList } from "../../services/EmployeeAPI";
import { useQuery } from "react-query";

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
	finishDate: string;
	isOngoing: boolean;
	workType: string;
	hoursPerWeek: number;
};

const EmployeeList = () => {
	//const employees = createEmployees(5);
	//const employees: EmployeeType[] = [];
	// const [employees, setEmployees] = useState([]);

	// useEffect(() => {
	// 	getEmployeeList()
	// 		.then((employee) => setEmployees(employee))
	// 		.catch((err) => console.log(err));
	// }, []);

	const query = useQuery("employees", getEmployeeList);
	const employees: EmployeeType[] = query.data;

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
			{query.isLoading && (
				<div className={styles.Alert}>Loading employees...</div>
			)}
			{query.isError && (
				<div
					className={`${styles.Alert} ${styles.Alert__Error}`}>{`Status ${query.status} - ${query.error}. Please try again later.`}</div>
			)}
			{employees && employees.length === 0 && (
				<div className={`${styles.Alert}`}>
					There are no employees. Get started by clicking on 'Add
					employee' above.
				</div>
			)}
			{employees &&
				employees.map((employee, index) => (
					<EmployeeCard key={index} employee={employee} />
				))}
		</div>
	);
};

export default EmployeeList;
