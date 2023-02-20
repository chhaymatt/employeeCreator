import styles from "./HeaderButton.module.scss";
type HeaderButtonProps = {
	label: string;
};
const HeaderButton = ({ label }: HeaderButtonProps) => {
	return (
		<button className={styles.HeaderButton}>
			<span>&lt;</span>
			<span className={styles.HeaderButton__Text}>{label}</span>
		</button>
	);
};

export default HeaderButton;
