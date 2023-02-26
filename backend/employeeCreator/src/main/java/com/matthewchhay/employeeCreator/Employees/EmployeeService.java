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

    public EmployeeService(EmployeeRepository repository) {
        this.repository = repository;
    }

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
            middleName = capitaliseFirstLetter(data.middleName);
        }

        Employee newEmployee = new Employee(
                capitaliseFirstLetter(data.firstName),
                middleName,
                capitaliseFirstLetter(data.lastName),
                data.email.trim(),
                data.mobile.trim(),
                capitaliseFirstLetter(data.address),
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
            middleName = capitaliseFirstLetter(data.middleName);
        }

        employee.setFirstName(capitaliseFirstLetter(data.firstName));
        employee.setMiddleName(middleName);
        employee.setLastName(capitaliseFirstLetter(data.lastName));
        employee.setEmail(data.email.trim());
        employee.setMobile(data.mobile.trim());
        employee.setAddress(capitaliseFirstLetter(data.address));
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

    private String capitaliseFirstLetter(String str) {
        if (str == null || str.isEmpty()) {
            return str;
        }
        str = str.trim();
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    }

}
