import styles from "./App.module.scss";
import EmployeeList from "./containers/EmployeeList/EmployeeList";
import EmployeeDetails from "./containers/EmployeeDetails/EmployeeDetails";
import { Route, Routes } from "react-router-dom";
import NotFound from "./containers/NotFound/NotFound";
import Footer from "./components/Footer/Footer";

const App = () => {
	return (
		<>
			<div className={styles.App}>
				<div className={styles.Container}>
					<Routes>
						<Route
							path="/employeeCreator/"
							element={<EmployeeList></EmployeeList>}></Route>
						<Route
							path="/employeeCreator/employees"
							element={<EmployeeList />}></Route>
						<Route
							path="/employeeCreator/employees"
							element={<EmployeeDetails />}></Route>
						<Route
							path="/employeeCreator/employees/:id"
							element={<EmployeeDetails />}></Route>
						<Route
							path="/employeeCreator/employees/add-employee"
							element={<EmployeeDetails />}></Route>
						<Route path="*" element={<NotFound />} />
					</Routes>
				</div>
				<Footer />
			</div>
		</>
	);
};

export default App;
