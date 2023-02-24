import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import {
	addEmployee,
	getEmployee,
	updateEmployee,
} from "../../services/EmployeeAPI";
import { EmployeeType } from "../EmployeeList/EmployeeList";
import styles from "./EmployeeDetails.module.scss";

enum ContractTypesEnum {
	PERMANENT = "Permanent",
	CONTRACT = "Contract",
}
enum WorkTypesEnum {
	FULL_TIME = "Full-time",
	PART_TIME = "Part-time",
}

enum MonthsEnum {
	JANUARY = "January",
	FEBRUARY = "February",
	MARCH = "March",
	APRIL = "April",
	MAY = "May",
	JUNE = "June",
	JULY = "July",
	AUGUST = "August",
	SEPTEMBER = "September",
	OCTOBER = "October",
	NOVEMBER = "November",
	DECEMBER = "December",
}

type Inputs = {
	firstName: string;
	middleName: string | null;
	lastName: string;
	email: string;
	mobile: string;
	address: string;
	contractType: ContractTypesEnum;
	startDateDay: number;
	startDateMonth: MonthsEnum;
	startDateYear: number;
	finishDateDay: number;
	finishDateMonth: MonthsEnum;
	finishDateYear: number;
	isOngoing: boolean;
	workType: WorkTypesEnum;
	hoursPerWeek: number;
};

const formatMonth = (monthLabel: MonthsEnum) => {
	const monthIndex = Object.values(MonthsEnum).indexOf(monthLabel) + 1;
	return monthIndex < 10 ? `0${monthIndex}` : monthIndex;
};

const formatDay = (day: number) => {
	return day < 10 ? `0${day}` : day;
};

// type EmployeeDetailsProps = {
// 	employeeId: number;
// 	setEmployeeId: number;
// 	// employee?: EmployeeType;
// };

const EmployeeDetails = () => {
	const [message, setMessage] = useState("");
	const [employee, setEmployee] = useState<EmployeeType>();
	const { id } = useParams();

	// const query = useQuery(["employee", employeeId], () =>
	// 	getEmployee(employeeId)
	// );

	// const employee: EmployeeType = query.data;

	// Fetch employee if id exists
	useEffect(() => {
		if (id) {
			getEmployee(+id)
				.then((employee) => {
					setEmployee(employee);
					console.log("Loaded employee");
					console.table(employee);
					loadDetails(employee);
				})
				.catch((err) => console.log(err));
		}
	}, []);

	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm<Inputs>();

	// Mutations
	const addMutation = useMutation(addEmployee, {
		onSuccess: (response: EmployeeType) => {
			setMessage(
				`Successfully saved employee ${response.firstName} ${response.lastName} to Id ${response.id}`
			);
			// console.log("Added employee!");
			// console.table(response);
			reset();
		},
		onError: (error: AxiosError) => {
			//console.log(error.message);
			setMessage(error.message);
		},
	});

	// const updateMutation = useMutation(updateEmployee, {
	// 	onSuccess: (response: EmployeeType) => {
	// 		setMessage(
	// 			`Successfully  employee ${response.firstName} ${response.lastName} to Id ${response.id}`
	// 		);
	// 		console.log("Updated employee!");
	// 		console.table(response);
	// 	},
	// });

	// If employee exists, run this
	const loadDetails = (employee: EmployeeType) => {
		const startDate = employee.startDate.split("-");
		const finishDate = employee.finishDate.split("-");
		reset({
			firstName: employee.firstName,
			middleName: employee.middleName,
			lastName: employee.lastName,
			email: employee.email,
			mobile: employee.mobile,
			address: employee.address,
			contractType:
				ContractTypesEnum[
					employee.contractType as keyof typeof ContractTypesEnum
				],
			startDateDay: +startDate[2],
			startDateMonth: MonthsEnum[startDate[1] as keyof typeof MonthsEnum],
			startDateYear: +startDate[0],
			finishDateDay: +finishDate[2],
			finishDateMonth:
				MonthsEnum[finishDate[1] as keyof typeof MonthsEnum],
			finishDateYear: +finishDate[0],
			isOngoing: employee.isOngoing,
			workType:
				WorkTypesEnum[employee.workType as keyof typeof WorkTypesEnum],
			hoursPerWeek: employee.hoursPerWeek,
		});
	};

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		//console.log("Form Data");
		//console.table(data);

		const payload: EmployeeType = {
			firstName: data.firstName,
			middleName: data.middleName,
			lastName: data.lastName,
			email: data.email,
			mobile: data.mobile,
			address: data.address,
			contractType: data.contractType.toUpperCase(),
			startDate: `${data.startDateYear}-${formatMonth(
				data.startDateMonth
			)}-${formatDay(data.startDateDay)}`,
			finishDate: `${data.finishDateYear}-${formatMonth(
				data.finishDateMonth
			)}-${formatDay(data.finishDateDay)}`,
			isOngoing: data.isOngoing,
			workType: data.workType.toUpperCase().replace("-", "_"),
			hoursPerWeek: +data.hoursPerWeek,
		};
		// console.log("Payload");
		// console.table(payload);
		if (!employee) {
			addMutation.mutate(payload);
		} else if (employee && employee.id) {
			//updateMutation.mutate(employee.id, payload);
			updateEmployee(employee.id, payload);
		}
	};

	return (
		<div className={styles.EmployeeDetails}>
			<Header title={`Employee details`} headerButton={`Back`} />
			{employee && <div>Employee Id: {employee.id}</div>}
			<form onSubmit={handleSubmit(onSubmit)}>
				<fieldset className={styles.Fieldset}>
					<legend className={styles.Legend}>
						Personal information
					</legend>
					<label className={styles.Label} htmlFor="firstName">
						First name
					</label>
					<input
						className={`${styles.InputText} ${
							errors.firstName ? styles.RedOutline : ""
						}`}
						type="text"
						placeholder="Matthew"
						aria-invalid={errors.firstName ? "true" : "false"}
						{...register("firstName", {
							required: true,
						})}
					/>
					{errors.firstName &&
						errors.firstName.type === "required" && (
							<span role="alert" className={styles.Alert}>
								First name is required
							</span>
						)}
					<label className={styles.Label} htmlFor="firstName">
						Middle name (if applicable)
					</label>
					<input
						className={styles.InputText}
						type="text"
						{...register("middleName")}
					/>
					<label className={styles.Label} htmlFor="lastName">
						Last name
					</label>
					<input
						className={`${styles.InputText} ${
							errors.lastName ? styles.RedOutline : ""
						}`}
						type="text"
						placeholder="Chhay"
						aria-invalid={errors.lastName ? "true" : "false"}
						{...register("lastName", {
							required: true,
						})}
					/>
					{errors.lastName && errors.lastName.type === "required" && (
						<span role="alert" className={styles.Alert}>
							Last name is required
						</span>
					)}
				</fieldset>
				<fieldset className={styles.Fieldset}>
					<legend className={styles.Legend}>Contact details</legend>
					<label className={styles.Label} htmlFor="email">
						Email address
					</label>
					<input
						className={`${styles.InputText} ${
							errors.email ? styles.RedOutline : ""
						}`}
						type="email"
						aria-invalid={errors.email ? "true" : "false"}
						{...register("email", {
							required: true,
							pattern: /\S+@\S+\.\S+/,
						})}
						placeholder="chhaymatt@gmail.com"
					/>
					{errors.email && errors.email.type === "required" && (
						<span role="alert" className={styles.Alert}>
							Email address is required
						</span>
					)}
					{errors.email && errors.email.type === "pattern" && (
						<span role="alert" className={styles.Alert}>
							Email address must be valid
						</span>
					)}
					<label className={styles.Label} htmlFor="mobile">
						Mobile number
						<p className={styles.Tip}>
							Must be an Australian number
						</p>
					</label>
					<input
						className={`${styles.InputText} ${
							errors.mobile ? styles.RedOutline : ""
						}`}
						type="tel"
						inputMode="numeric"
						placeholder="0412345678"
						aria-invalid={errors.mobile ? "true" : "false"}
						{...register("mobile", {
							required: true,
							minLength: 10,
							maxLength: 10,
							pattern: /^0(9|4)\d{8}$/,
						})}
					/>
					{errors.mobile && errors.mobile.type === "required" && (
						<span role="alert" className={styles.Alert}>
							Mobile number is required
						</span>
					)}
					{errors.mobile && errors.mobile.type === "minLength" && (
						<span role="alert" className={styles.Alert}>
							Mobile number must be 10 digits
						</span>
					)}
					{errors.mobile && errors.mobile.type === "maxLength" && (
						<span role="alert" className={styles.Alert}>
							Mobile number must be 10 digits
						</span>
					)}

					{errors.mobile && errors.mobile.type === "pattern" && (
						<span role="alert" className={styles.Alert}>
							Mobile number must start with 04 and only contain
							digits
						</span>
					)}
					<label className={styles.Label} htmlFor="address">
						Residential address
					</label>
					<input
						className={`${styles.InputText} ${
							errors.address ? styles.RedOutline : ""
						}`}
						type="text"
						placeholder="123 Example St, Sydney NSW 2000"
						aria-invalid={errors.address ? "true" : "false"}
						{...register("address", {
							required: true,
						})}
					/>
					{errors.address && errors.address.type === "required" && (
						<span role="alert" className={styles.Alert}>
							Residential address is required
						</span>
					)}
				</fieldset>
				<fieldset className={styles.Fieldset}>
					<legend className={styles.Legend}>Employee status</legend>
					<div className={styles.RadioGroup}>
						<label className={styles.Label} htmlFor="contractType">
							Contract Type
						</label>
						{Object.values(ContractTypesEnum).map(
							(contractType) => (
								<label
									key={contractType}
									className={styles.RadioLabel}>
									<input
										className={styles.RadioButton}
										type="radio"
										aria-invalid={
											errors.contractType
												? "true"
												: "false"
										}
										{...register("contractType", {
											required: true,
										})}
										value={contractType}
									/>
									{contractType}
								</label>
							)
						)}
						{errors.contractType &&
							errors.contractType.type === "required" && (
								<span role="alert" className={styles.Alert}>
									Contract type is required
								</span>
							)}
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
								className={`${styles.InputText} ${
									errors.startDateDay ? styles.RedOutline : ""
								}`}
								type="number"
								inputMode="numeric"
								placeholder="20"
								aria-invalid={
									errors.startDateDay ? "true" : "false"
								}
								{...register("startDateDay", {
									required: true,
									min: 1,
									max: 31,
								})}
							/>
							{errors.startDateDay &&
								errors.startDateDay.type === "required" && (
									<span role="alert" className={styles.Alert}>
										Day is required
									</span>
								)}
							{errors.startDateDay &&
								errors.startDateDay.type === "min" && (
									<span role="alert" className={styles.Alert}>
										Day must be between 1 and 31 (inclusive)
									</span>
								)}
							{errors.startDateDay &&
								errors.startDateDay.type === "max" && (
									<span role="alert" className={styles.Alert}>
										Day must be between 1 and 31 (inclusive)
									</span>
								)}
						</div>
						<div className={styles.DateInput__Section}>
							<label
								className={styles.Label}
								htmlFor="startDateMonth">
								Month
							</label>
							<select
								className={styles.Select}
								{...register("startDateMonth")}>
								{Object.values(MonthsEnum).map((month) => (
									<option key={month} value={month}>
										{month}
									</option>
								))}
							</select>
						</div>
						<div className={styles.DateInput__Section}>
							<label
								className={styles.Label}
								htmlFor="startDateYear">
								Year
							</label>
							<input
								className={`${styles.InputText} ${
									errors.startDateYear
										? styles.RedOutline
										: ""
								}`}
								type="number"
								inputMode="numeric"
								placeholder={`${new Date().getFullYear()}`}
								aria-invalid={
									errors.startDateYear ? "true" : "false"
								}
								{...register("startDateYear", {
									required: true,
									min: 1950,
									max: new Date().getFullYear() + 5,
								})}
							/>
							{errors.startDateYear &&
								errors.startDateYear.type === "required" && (
									<span role="alert" className={styles.Alert}>
										Year is required
									</span>
								)}
							{errors.startDateYear &&
								errors.startDateYear.type === "min" && (
									<span role="alert" className={styles.Alert}>
										{`Year must be between 1950 and
										${new Date().getFullYear() + 5} 
										(inclusive)`}
									</span>
								)}
							{errors.startDateYear &&
								errors.startDateYear.type === "max" && (
									<span role="alert" className={styles.Alert}>
										{`Year must be between 1950 and
										${new Date().getFullYear() + 5} 
										(inclusive)`}
									</span>
								)}
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
								className={`${styles.InputText} ${
									errors.finishDateDay
										? styles.RedOutline
										: ""
								}`}
								type="number"
								inputMode="numeric"
								placeholder="23"
								aria-invalid={
									errors.finishDateDay ? "true" : "false"
								}
								{...register("finishDateDay", {
									required: true,
									min: 1,
									max: 31,
								})}
							/>
							{errors.finishDateDay &&
								errors.finishDateDay.type === "required" && (
									<span role="alert" className={styles.Alert}>
										Day is required
									</span>
								)}
							{errors.finishDateDay &&
								errors.finishDateDay.type === "min" && (
									<span role="alert" className={styles.Alert}>
										Day must be between 1 and 31 (inclusive)
									</span>
								)}
							{errors.finishDateDay &&
								errors.finishDateDay.type === "max" && (
									<span role="alert" className={styles.Alert}>
										Day must be between 1 and 31 (inclusive)
									</span>
								)}
						</div>
						<div className={styles.DateInput__Section}>
							<label
								className={styles.Label}
								htmlFor="finishDateMonth">
								Month
							</label>
							<select
								className={styles.Select}
								{...register("finishDateMonth")}>
								{Object.values(MonthsEnum).map((month) => (
									<option key={month} value={month}>
										{month.valueOf()}
									</option>
								))}
							</select>
						</div>
						<div className={styles.DateInput__Section}>
							<label
								className={styles.Label}
								htmlFor="finishDateYear">
								Year
							</label>
							<input
								className={`${styles.InputText} ${
									errors.finishDateYear
										? styles.RedOutline
										: ""
								}`}
								type="number"
								inputMode="numeric"
								placeholder={`${new Date().getFullYear()}`}
								aria-invalid={
									errors.finishDateYear ? "true" : "false"
								}
								{...register("finishDateYear", {
									required: true,
									min: 1950,
									max: new Date().getFullYear() + 5,
									maxLength: 4,
								})}
							/>
							{errors.finishDateYear &&
								errors.finishDateYear.type === "required" && (
									<span role="alert" className={styles.Alert}>
										Year is required
									</span>
								)}
							{errors.finishDateYear &&
								errors.finishDateYear.type === "min" && (
									<span role="alert" className={styles.Alert}>
										{`Year must be between 1950 and
										${new Date().getFullYear() + 5} 
										(inclusive)`}
									</span>
								)}
							{errors.finishDateYear &&
								errors.finishDateYear.type === "max" && (
									<span role="alert" className={styles.Alert}>
										{`Year must be between 1950 and
										${new Date().getFullYear() + 5} 
										(inclusive)`}
									</span>
								)}
						</div>
					</div>
					<div className={styles.CheckboxInput}>
						<span className={styles.Checkbox}>
							<label className={styles.CheckboxLabel}>
								<input
									className={styles.CheckboxButton}
									type="checkbox"
									{...register("isOngoing")}
								/>
								On going
							</label>
						</span>
					</div>
					<div className={styles.RadioGroup}>
						<label className={styles.Label} htmlFor="workType">
							Is this on a full-time or part-time basis?
						</label>
						{Object.values(WorkTypesEnum).map((workType) => (
							<label key={workType} className={styles.RadioLabel}>
								<input
									className={styles.RadioButton}
									type="radio"
									aria-invalid={
										errors.workType ? "true" : "false"
									}
									{...register("workType", {
										required: true,
									})}
									value={workType}
								/>
								{workType}
							</label>
						))}
						{errors.workType &&
							errors.workType.type === "required" && (
								<span role="alert" className={styles.Alert}>
									Work type is required
								</span>
							)}
					</div>
					<label className={styles.Label} htmlFor="hoursPerWeek">
						Hours per week
					</label>
					<input
						className={`${styles.InputText} ${
							errors.hoursPerWeek ? styles.RedOutline : ""
						}`}
						type="number"
						inputMode="numeric"
						placeholder="38"
						aria-invalid={errors.hoursPerWeek ? "true" : "false"}
						{...register("hoursPerWeek", {
							required: true,
							min: 0,
							max: 40,
						})}
					/>
					{errors.hoursPerWeek &&
						errors.hoursPerWeek.type === "required" && (
							<span role="alert" className={styles.Alert}>
								Hours per week is required
							</span>
						)}
					{errors.hoursPerWeek &&
						errors.hoursPerWeek.type === "min" && (
							<span role="alert" className={styles.Alert}>
								Hours per week must be between 0 and 40
								(inclusive)
							</span>
						)}
					{errors.hoursPerWeek &&
						errors.hoursPerWeek.type === "max" && (
							<span role="alert" className={styles.Alert}>
								Hours per week must be between 0 and 40
								(inclusive)
							</span>
						)}
				</fieldset>
				<div className={styles.FormButtons}>
					<Button label={employee ? "Update" : "Save"} />
					<Link
						className={styles.FormButtons__Link}
						to={"/employeeCreator/employees"}>
						<Button secondary label={`Cancel`} />
					</Link>
				</div>
			</form>
			{message && (
				<div className={`${styles.Message} ${styles.Message__Alert}`}>
					{message}
				</div>
			)}
		</div>
	);
};

export default EmployeeDetails;
