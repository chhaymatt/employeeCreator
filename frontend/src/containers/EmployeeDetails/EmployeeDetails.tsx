import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import styles from "./EmployeeDetails.module.scss";
const EmployeeDetails = () => {
	return (
		<div className={styles.EmployeeDetails}>
			<Header title={`Employee details`} headerButton={`Back`} />
			<form>
				<fieldset className={styles.Fieldset}>
					<legend className={styles.Legend}>
						Personal information
					</legend>
					<label className={styles.Label} htmlFor="firstName">
						First name
					</label>
					<input
						className={styles.InputText}
						type="text"
						name="firstName"
						id="firstName"
						placeholder="Matthew"
						required
					/>
					<label className={styles.Label} htmlFor="firstName">
						Middle name (if applicable)
					</label>
					<input
						className={styles.InputText}
						type="text"
						name="firstName"
					/>
					<label className={styles.Label} htmlFor="lastName">
						Last name
					</label>
					<input
						className={styles.InputText}
						type="text"
						name="lastName"
						id="lastName"
						placeholder="Chhay"
						required
					/>
				</fieldset>
				<fieldset className={styles.Fieldset}>
					<legend className={styles.Legend}>Contact details</legend>
					<label className={styles.Label} htmlFor="email">
						Email address
					</label>
					<input
						className={styles.InputText}
						type="email"
						name="email"
						id="email"
						placeholder="chhaymatt@gmail.com"
						required
					/>
					<label className={styles.Label} htmlFor="mobile">
						Mobile number
						<p className={styles.Tip}>
							Must be an Australian number
						</p>
					</label>
					<input
						className={styles.InputText}
						type="tel"
						inputMode="numeric"
						name="mobile"
						id="mobile"
						placeholder="0412345678"
						required
						min={10}
						max={10}
					/>
					<label className={styles.Label} htmlFor="address">
						Residential address
					</label>
					<input
						className={styles.InputText}
						type="text"
						name="address"
						id="address"
						placeholder="123 Example St, Sydney NSW 2000"
						required
					/>
				</fieldset>
				<fieldset className={styles.Fieldset}>
					<legend className={styles.Legend}>Employee status</legend>

					<div className={styles.RadioGroup}>
						<label
							className={styles.Label}
							htmlFor="employeeStatus">
							Contract Type
						</label>
						<div className={styles.RadioInput}>
							<input
								className={styles.RadioButton}
								id="employeeStatusPermanent"
								type="radio"
								value="employeeStatusPermanent"
								name="employeeStatus"
								defaultChecked
							/>
							<label
								className={styles.RadioLabel}
								htmlFor="employeeStatusPermanent">
								Permanent
							</label>
						</div>
						<div className={styles.RadioInput}>
							<input
								className={styles.RadioButton}
								id="employeeStatusContract"
								type="radio"
								value="employeeStatusContract"
								name="employeeStatus"
							/>
							<label
								className={styles.RadioLabel}
								htmlFor="employeeStatusContract">
								Contract
							</label>
						</div>
					</div>
					<label className={styles.Label} htmlFor="startDate">
						Start date
					</label>
					<div className={styles.DateInput}>
						<div className={styles.DateInput__Section}>
							<label
								className={styles.Label}
								htmlFor="startDateDay">
								Day
							</label>
							<input
								className={styles.InputText}
								type="number"
								inputMode="numeric"
								name="startDateDay"
								id="startDateDay"
								placeholder="20"
								required
								min={1}
								max={31}
								maxLength={2}
							/>
						</div>
						<div className={styles.DateInput__Section}>
							<label
								className={styles.Label}
								htmlFor="startDateMonth">
								Month
							</label>
							<select className={styles.Select}>
								<option defaultChecked value="0">
									January
								</option>
								<option value="1">February</option>
								<option value="2">March</option>
								<option value="3">April</option>
								<option value="4">May</option>
								<option value="5">June</option>
								<option value="6">July</option>
								<option value="7">August</option>
								<option value="8">September</option>
								<option value="9">October</option>
								<option value="10">November</option>
								<option value="11">December</option>
							</select>
						</div>
						<div className={styles.DateInput__Section}>
							<label
								className={styles.Label}
								htmlFor="startDateYear">
								Year
							</label>
							<input
								className={styles.InputText}
								type="number"
								inputMode="numeric"
								name="startDateYear"
								id="startDateYear"
								placeholder={`${new Date().getFullYear()}`}
								required
								min="1950"
								max={new Date().getFullYear() + 5}
								maxLength={4}
							/>
						</div>
					</div>
					<label className={styles.Label} htmlFor="finishDate">
						Finish date
					</label>
					<div className={styles.DateInput}>
						<div className={styles.DateInput__Section}>
							<label
								className={styles.Label}
								htmlFor="finishDateDay">
								Day
							</label>
							<input
								className={styles.InputText}
								type="number"
								inputMode="numeric"
								name="finishDateDay"
								id="finishDateDay"
								placeholder="23"
								required
								min={1}
								max={31}
								maxLength={2}
							/>
						</div>
						<div className={styles.DateInput__Section}>
							<label
								className={styles.Label}
								htmlFor="finishDateMonth">
								Month
							</label>
							<select className={styles.Select}>
								<option defaultChecked value="0">
									January
								</option>
								<option value="1">February</option>
								<option value="2">March</option>
								<option value="3">April</option>
								<option value="4">May</option>
								<option value="5">June</option>
								<option value="6">July</option>
								<option value="7">August</option>
								<option value="8">September</option>
								<option value="9">October</option>
								<option value="10">November</option>
								<option value="11">December</option>
							</select>
						</div>
						<div className={styles.DateInput__Section}>
							<label
								className={styles.Label}
								htmlFor="finishDateYear">
								Year
							</label>
							<input
								className={styles.InputText}
								type="number"
								inputMode="numeric"
								name="startDateYear"
								id="finishDateYear"
								placeholder={`${new Date().getFullYear()}`}
								required
								min={1950}
								max={new Date().getFullYear() + 5}
								maxLength={4}
							/>
						</div>
					</div>
					<div className={styles.CheckboxInput}>
						<span className={styles.Checkbox}>
							<input
								className={styles.CheckboxButton}
								type="checkbox"
								name="isOngoing"
								id="isOngoing"
							/>
							<label
								className={styles.CheckboxLabel}
								htmlFor="isOngoing">
								On going
							</label>
						</span>
					</div>
					<div className={styles.RadioGroup}>
						<label className={styles.Label} htmlFor="workType">
							Is this on a full-time or part-time basis?
						</label>
						<div className={styles.RadioInput}>
							<input
								className={styles.RadioButton}
								id="workTypeFullTime"
								type="radio"
								value="workTypeFullTime"
								name="workType"
								defaultChecked
							/>
							<label
								className={styles.RadioLabel}
								htmlFor="workTypeFullTime">
								Full-time
							</label>
						</div>
						<div className={styles.RadioInput}>
							<input
								className={styles.RadioButton}
								id="workTypePartTime"
								type="radio"
								value="workTypePartTime"
								name="workType"
							/>
							<label
								className={styles.RadioLabel}
								htmlFor="workTypePartTime">
								Part-time
							</label>
						</div>
					</div>
					<label className={styles.Label} htmlFor="hoursPerWeek">
						Hours per week
					</label>
					<input
						className={styles.InputText}
						type="number"
						inputMode="numeric"
						name="hoursPerWeek"
						id="hoursPerWeek"
						placeholder="38"
						min={0}
						max={40}
						required
					/>
				</fieldset>
				<div className={styles.FormButtons}>
					<Button label={`Save`} />
					<Button secondary label={`Cancel`} />
				</div>
			</form>
		</div>
	);
};

export default EmployeeDetails;
