import HeaderButton from "../HeaderButton/HeaderButton";
import styles from "./Header.module.scss";
type HeaderProps = {
	title: string;
	headerButton?: string;
};

const Header = ({ title, headerButton }: HeaderProps) => {
	return (
		<div className={styles.Header}>
			{headerButton && <HeaderButton label={headerButton} />}
			<h1 className={styles.Text}>{title}</h1>
		</div>
	);
};

export default Header;
