import styles from "./InlineButtons.module.scss";

const InlineButtons = () => {
	return (
		<section className={styles.InlineButtons}>
			<button className={styles.InlineButtons__button}>Edit</button>
			<span className={styles.InlineButtons__divider}>|</span>
			<button className={styles.InlineButtons__button}>Remove</button>
		</section>
	);
};

export default InlineButtons;
