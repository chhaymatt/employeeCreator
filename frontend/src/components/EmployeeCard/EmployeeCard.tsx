import styles from "./EmployeeCard.module.scss";
type EmployeeCardProps = {
	firstName: string;
	lastName: string;
	contractType: string;
	duration: number;
	durationUnit: string;
	email: string;
};
const EmployeeCard = ({
	firstName,
	lastName,
	contractType,
	duration,
	durationUnit,
	email,
}: EmployeeCardProps) => {
	return (
		<div className={styles.EmployeeCard}>
			<section className={styles.Details}>
				<h3>
					{firstName} {lastName}
				</h3>
				<p>
					{contractType} - {duration}
					{duration > 1 ? `${durationUnit}s` : durationUnit}
				</p>
				<p>{email}</p>
			</section>
			<section className={styles.Interact}>
				<button>Edit</button>
				<span>|</span>
				<button>Remove</button>
			</section>
		</div>
	);
};

export default EmployeeCard;
