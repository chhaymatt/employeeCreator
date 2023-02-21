package com.matthewchhay.employeeCreator.Employees;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

enum ContractTypes {
    PERMANENT, CONTRACT
}

enum WorkTypes {
    FULL_TIME, PART_TIME
}

@Entity
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private String firstName;

    @Column
    private String middleName;

    @Column
    private String lastName;

    @Column
    private String email;

    @Column
    private String mobile;

    @Column
    private String address;

    @Column
    private ContractTypes contractType;

    @Column
    private LocalDate startDate;

    @Column
    private LocalDate finishDate;

    @Column
    private boolean isOngoing;

    @Column
    private WorkTypes workType;

    @Column
    private int hoursPerWeek;

    public Employee() {
    }

    public Employee(String firstName, String middleName, String lastName, String email, String mobile,
            String address, ContractTypes contractType, LocalDate startDate, LocalDate finishDate, boolean isOngoing,
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

    public Long getId() {
        return this.id;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMiddleName() {
        return this.middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobile() {
        return this.mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getAddress() {
        return this.address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public ContractTypes getContractType() {
        return this.contractType;
    }

    public void setContractType(ContractTypes contractType) {
        this.contractType = contractType;
    }

    public LocalDate getStartDate() {
        return this.startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getFinishDate() {
        return this.finishDate;
    }

    public void setFinishDate(LocalDate finishDate) {
        this.finishDate = finishDate;
    }

    public boolean isIsOngoing() {
        return this.isOngoing;
    }

    public boolean getIsOngoing() {
        return this.isOngoing;
    }

    public void setIsOngoing(boolean isOngoing) {
        this.isOngoing = isOngoing;
    }

    public WorkTypes getWorkType() {
        return this.workType;
    }

    public void setWorkType(WorkTypes workType) {
        this.workType = workType;
    }

    public int getHoursPerWeek() {
        return this.hoursPerWeek;
    }

    public void setHoursPerWeek(int hoursPerWeek) {
        this.hoursPerWeek = hoursPerWeek;
    }

}
