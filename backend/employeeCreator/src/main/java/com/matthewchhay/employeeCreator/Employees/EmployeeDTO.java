package com.matthewchhay.employeeCreator.Employees;

import java.time.LocalDate;

import org.hibernate.validator.constraints.Range;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class EmployeeDTO {
    @NotBlank(message = "First name required")
    String firstName;

    String middleName;

    @NotBlank(message = "Last name required")
    String lastName;

    @NotBlank(message = "Email address required")
    @Email(message = "Email address must be valid")
    String email;

    @NotBlank(message = "Mobile number required")
    @Size(min = 10, max = 10, message = "Mobile number must be 10 digits long")
    String mobile;

    @NotBlank(message = "Address required")
    String address;

    @NotNull(message = "Contract type required, 0 = `PERMANENT`, 1 = `CONTRACT`")
    ContractTypes contractType;

    @NotNull(message = "Start date required")
    LocalDate startDate;

    @NotNull(message = "Finish date required")
    LocalDate finishDate;

    @NotNull(message = "Is Ongoing must be true or false")
    Boolean isOngoing;

    @NotNull(message = "Work type required, 0 = `FULL_TIME`, 1 = `PART_TIME`")
    WorkTypes workType;

    @NotNull(message = "Hours per week required")
    @Range(min = 0, max = 40, message = "Hours per week must be between 0 and 40 inclusive")
    int hoursPerWeek;

    public EmployeeDTO(String firstName, String middleName, String lastName, String email, String mobile,
            String address, ContractTypes contractType, LocalDate startDate, LocalDate finishDate, Boolean isOngoing,
            WorkTypes workType, int hoursPerWeek) {
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.email = email;
        this.mobile = mobile;
        this.address = address;
        this.contractType = contractType;
        this.startDate = startDate;
        this.finishDate = finishDate;
        this.isOngoing = isOngoing;
        this.workType = workType;
        this.hoursPerWeek = hoursPerWeek;
    }

}
