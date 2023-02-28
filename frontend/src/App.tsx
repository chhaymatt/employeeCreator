import styles from "./App.module.scss";
import EmployeeList from "./containers/EmployeeList/EmployeeList";
import { Route, Routes } from "react-router-dom";
import NotFound from "./containers/NotFound/NotFound";
import Footer from "./components/Footer/Footer";
import { QueryClient, QueryClientProvider } from "react-query";
import EmployeeAdd from "./containers/EmployeeAdd/EmployeeAdd";
import EmployeeUpdate from "./containers/EmployeeUpdate/EmployeeUpdate";

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <div className={styles.App}>
                <div className={styles.Container}>
                    <Routes>
                        <Route path="/" element={<EmployeeList />} />
                        <Route path="/employees" element={<EmployeeList />} />
                        <Route
                            path="/employees/:id"
                            element={<EmployeeUpdate />}
                        />
                        <Route
                            path="/employees/add-employee"
                            element={<EmployeeAdd />}
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
