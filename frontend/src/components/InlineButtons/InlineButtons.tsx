import { Link } from "react-router-dom";
import styles from "./InlineButtons.module.scss";

const InlineButtons = ({ id }: any) => {
	return (
		<section className={styles.InlineButtons}>
			<Link
				className={styles.InlineButtons__Link}
				to={`/employeeCreator/employees/${id}`}>
				<button className={styles.InlineButtons__Button}>Edit</button>
			</Link>
			<span className={styles.InlineButtons__Divider}>|</span>
			<button className={styles.InlineButtons__Button}>Remove</button>
		</section>
	);
};

export default InlineButtons;
