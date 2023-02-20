import Header from "../../components/Header/Header";
import styles from "./EmployeeDetails.module.scss";
const EmployeeDetails = () => {
	return (
		<div className={styles.EmployeeDetails}>
			<Header title={`Employee details`} headerButton={`Back`} />
			<form>
				<fieldset className={styles.Fieldset}>
					<legend>Personal information</legend>
					<label htmlFor="firstName">First name</label>
					<input
						type="text"
						name="firstName"
						id="firstName"
						placeholder="Matthew"
						required
					/>
					<label htmlFor="firstName">
						Middle name (if applicable)
					</label>
					<input type="text" name="firstName" />
					<label htmlFor="lastName">Last name</label>
					<input
						type="text"
						name="lastName"
						id="lastName"
						placeholder="Chhay"
						required
					/>
				</fieldset>
				<fieldset className={styles.Fieldset}>
					<legend>Contact details</legend>
					<label htmlFor="email">Email address</label>
					<input
						type="email"
						name="email"
						id="email"
						placeholder="chhaymatt@gmail.com"
						required
					/>
					<label htmlFor="mobile">
						Mobile number
						<p className={styles.Tip}>
							Must be an Australian number
						</p>
					</label>
					<input
						type="tel"
						name="mobile"
						id="mobile"
						placeholder="0412345678"
						required
					/>
					<label htmlFor="address">Residential address</label>
					<input
						type="text"
						name="address"
						id="address"
						placeholder="123 Example St, Sydney NSW 2000"
						required
					/>
				</fieldset>
				<fieldset className={styles.Fieldset}>
					<legend>Employee status</legend>
					<label htmlFor="employeeStatus">Contract Type</label>
					<span className={styles.RadioInput}>
						<input
							className={styles.RadioButton}
							id="employeeStatusPermanent"
							type="radio"
							value="employeeStatusPermanent"
							name="employeeStatus"
							defaultChecked
						/>
						<label htmlFor="employeeStatusPermanent">
							Permanent
						</label>
					</span>
					<span className={styles.RadioInput}>
						<input
							className={styles.RadioButton}
							id="employeeStatusContract"
							type="radio"
							value="employeeStatusContract"
							name="employeeStatus"
						/>
						<label htmlFor="employeeStatusContract">Contract</label>
					</span>
				</fieldset>
			</form>
		</div>
	);
};

export default EmployeeDetails;
