import EmployeeCard from "./components/EmployeeCard/EmployeeCard";
import Header from "./components/Header/Header";
import styles from "./App.module.scss";
import EmployeeList from "./containers/EmployeeList/EmployeeList";
import EmployeeDetails from "./containers/EmployeeDetails/EmployeeDetails";

const App = () => {
	return (
		<div className={styles.App}>
			<div className={styles.Container}>
				<EmployeeList />
				<EmployeeDetails />
			</div>
		</div>
	);
};

export default App;
