import { useState } from "react";
import { Link } from "react-router-dom";
import { EmployeeType } from "../../containers/EmployeeList/EmployeeList";
import InlineButtons from "../InlineButtons/InlineButtons";
import Message from "../Message/Message";
import styles from "./EmployeeCard.module.scss";

type EmployeeCardProps = {
    employee: EmployeeType;
};

const EmployeeCard = ({ employee }: EmployeeCardProps) => {
    const [error, setError] = useState("");

    const finishDate = employee.finishDate
        ? new Date(employee.finishDate)
        : new Date();
    const startDate = new Date(employee.startDate);

    const yearDiff = finishDate.getFullYear() - startDate.getFullYear();
    const monthDiff = finishDate.getMonth() - startDate.getMonth();

    const durationInMonths = yearDiff * 12 + monthDiff;
    const durationInYears = Math.floor(durationInMonths / 12);

    const duration = durationInYears > 0 ? durationInYears : durationInMonths;
    const durationUnit =
        durationInYears > 1
            ? "yrs"
            : durationInYears === 1
            ? "yr"
            : durationInMonths > 1 || durationInMonths <= 0
            ? "months"
            : "month";

    return (
        <div className={styles.EmployeeCard}>
            <div className={styles.EmployeeSection}>
                <section className={styles.Details}>
                    <Link
                        className={styles.Link}
                        to={`/employees/${employee.id}`}
                    >
                        <h3>
                            {employee.firstName} {employee.lastName}
                        </h3>
                    </Link>
                    <p>{`Employee Id: ${employee.id}`}</p>
                    <p>
                        {`${
                            employee.contractType.charAt(0).toUpperCase() +
                            employee.contractType.slice(1).toLowerCase()
                        } - ${duration < 0 ? "Future employee starting in" : ""}
					${duration > 0 ? `${duration} ${durationUnit}` : employee.startDate}`}
                    </p>
                    <p>{employee.email}</p>
                </section>
                <InlineButtons id={employee.id as number} setError={setError} />
            </div>
            {error && (
                <Message type="error">
                    {`${error}. Please try again later.`}
                </Message>
            )}
        </div>
    );
};

export default EmployeeCard;
