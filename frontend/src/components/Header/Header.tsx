import { Link } from "react-router-dom";
import HeaderButton from "../HeaderButton/HeaderButton";
import styles from "./Header.module.scss";
type HeaderProps = {
	title: string;
	headerButton?: string;
};

const Header = ({ title, headerButton }: HeaderProps) => {
	return (
		<div className={styles.Header}>
			{headerButton && (
				<Link
					className={styles.Link}
					to="/employeeCreator/employees">
					<HeaderButton label={headerButton} />
				</Link>
			)}
			<h1 className={styles.Text}>{title}</h1>
		</div>
	);
};

export default Header;
