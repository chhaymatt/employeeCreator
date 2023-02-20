import Button from "../../components/Button/Button";
import EmployeeCard from "../../components/EmployeeCard/EmployeeCard";
import Header from "../../components/Header/Header";
import styles from "./EmployeeList.module.scss";
const EmployeeList = () => {
	return (
		<div className={styles.EmployeeList}>
			<Header title={`Employees' list`} />
			<section className={styles.Section}>
				<p>
					Please click on 'Edit' to find more details of each
					employee.
				</p>
				<Button label={`Add employee`} />
			</section>
			<EmployeeCard
				firstName={"Matthew"}
				lastName={"Chhay"}
				contractType={"Permanent"}
				duration={5}
				durationUnit={"yr"}
				email={"chhaymatt@gmail.com"}
			/>
			<EmployeeCard
				firstName={"Matthew"}
				lastName={"Chhay"}
				contractType={"Permanent"}
				duration={5}
				durationUnit={"yr"}
				email={"chhaymatt@gmail.com"}
			/>
			<EmployeeCard
				firstName={"Matthew"}
				lastName={"Chhay"}
				contractType={"Permanent"}
				duration={5}
				durationUnit={"yr"}
				email={"chhaymatt@gmail.com"}
			/>
		</div>
	);
};

export default EmployeeList;
