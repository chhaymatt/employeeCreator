import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import styles from "./NotFound.module.scss";

const NotFound = () => {
    return (
        <div>
            <Header title="404 page not found" />
            <section className={styles.Section}>
                <p className={styles.Section__Text}>
                    The page you're looking for could not be found. It may have
                    been moved or archived, or you may have followed a broken
                    link from another site.
                </p>
                <ul className={styles.Section__List}>
                    <li>
                        <Link className={styles.Section__Link} to="/employees">
                            View list of employees
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={styles.Section__Link}
                            to="/employees/add-employee"
                        >
                            Add a new employee
                        </Link>
                    </li>
                </ul>
            </section>
        </div>
    );
};

export default NotFound;
