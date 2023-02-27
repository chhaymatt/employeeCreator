import styles from "./App.module.scss";
import EmployeeList from "./containers/EmployeeList/EmployeeList";
import EmployeeDetails from "./containers/EmployeeDetails/EmployeeDetails";
import { Route, Routes } from "react-router-dom";
import NotFound from "./containers/NotFound/NotFound";
import Footer from "./components/Footer/Footer";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <div className={styles.App}>
                <div className={styles.Container}>
                    <Routes>
                        <Route
                            path="/employeeCreator/"
                            element={<EmployeeList />}
                        />
                        <Route
                            path="/employeeCreator/employees"
                            element={<EmployeeList />}
                        />
                        <Route
                            path="/employeeCreator/employees/:id"
                            element={<EmployeeDetails />}
                        />
                        <Route
                            path="/employeeCreator/employees/add-employee"
                            element={<EmployeeDetails />}
                        />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </QueryClientProvider>
    );
};

export default App;
