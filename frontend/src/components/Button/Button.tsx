import styles from "./Button.module.scss";

type ButtonProps = {
	label: string;
	secondary?: boolean;
};
const Button = ({ label, secondary }: ButtonProps) => {
	return (
		<button className={`${styles.Button} ${secondary && styles.Secondary}`}>
			{label}
		</button>
	);
};

export default Button;
