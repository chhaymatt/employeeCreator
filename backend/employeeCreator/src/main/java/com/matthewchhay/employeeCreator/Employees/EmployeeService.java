package com.matthewchhay.employeeCreator.Employees;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class EmployeeService {

    @Autowired
    private EmployeeRepository repository;

    public List<Employee> all() {
        return this.repository.findAll();
    }

    public Optional<Employee> findOne(Long id) {
        Optional<Employee> maybeEmployee = this.repository.findById(id);
        return maybeEmployee;
    }

    public Employee add(EmployeeDTO data) {
        String middleName = null;
        if (data.middleName != null) {
            middleName = data.middleName.trim();
        }

        Employee newEmployee = new Employee(
                data.firstName.trim(),
                middleName, data.lastName.trim(),
                data.email.trim(),
                data.mobile.trim(),
                data.address.trim(),
                data.contractType,
                data.startDate,
                data.finishDate,
                data.isOngoing,
                data.workType,
                data.hoursPerWeek);
        return this.repository.save(newEmployee);
    }

    public Employee update(Employee employee, EmployeeDTO data) {
        String middleName = null;
        if (data.middleName != null) {
            middleName = data.middleName.trim();
        }

        employee.setFirstName(data.firstName.trim());
        employee.setMiddleName(middleName);
        employee.setLastName(data.lastName.trim());
        employee.setEmail(data.email.trim());
        employee.setMobile(data.mobile.trim());
        employee.setAddress(data.address.trim());
        employee.setContractType(data.contractType);
        employee.setStartDate(data.startDate);
        employee.setFinishDate(data.finishDate);
        employee.setIsOngoing(data.isOngoing);
        employee.setWorkType(data.workType);
        employee.setHoursPerWeek(data.hoursPerWeek);
        return this.repository.save(employee);
    }

    public void delete(Employee employee) {
        this.repository.delete(employee);
    }

}
