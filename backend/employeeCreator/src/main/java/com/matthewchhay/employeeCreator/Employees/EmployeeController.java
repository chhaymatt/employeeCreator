package com.matthewchhay.employeeCreator.Employees;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import jakarta.validation.Valid;

@CrossOrigin
@RestController
@RequestMapping("/employees")
public class EmployeeController {
    @Autowired
    private EmployeeService service;

    Logger logger = LoggerFactory.getLogger(this.getClass());

    @GetMapping
    public ResponseEntity<List<Employee>> getAll() {
        List<Employee> allEmployees;
        try {
            allEmployees = this.service.all();
        } catch (Exception e) {
            logger.error("500 INTERNAL_SERVER_ERROR - Unexpected server error when finding all employees", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Unexpected server error when finding all employees");
        }
        logger.info("200 OK - Found employees: " + allEmployees.size());
        return new ResponseEntity<>(allEmployees, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> findOneEmployee(@PathVariable Long id) {
        Optional<Employee> maybeEmployee;
        try {
            maybeEmployee = this.service.findOne(id);
        } catch (Exception e) {
            logger.error("500 INTERNAL_SERVER_ERROR - Unexpected server error when finding employee with id: " + id, e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Unexpected server error when finding employee with id: " + id);
        }

        if (maybeEmployee.isEmpty()) {
            logger.error("404 NOT_FOUND - No employee found with id: " + id);
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No employee found with id: " + id);
        }

        logger.info("200 OK - Found employee id: " + id);
        return new ResponseEntity<>(maybeEmployee.get(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Employee> addEmployee(@Valid @RequestBody EmployeeDTO data) {
        if (data.finishDate != null && data.startDate.isAfter(data.finishDate)) {
            logger.error("400 BAD_REQUEST - Start date must be before finish date");
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Start date must be before finish date");
        }

        Employee createdEmployee;
        try {
            createdEmployee = this.service.add(data);
        } catch (Exception e) {
            logger.error("500 INTERNAL_SERVER_ERROR - Unexpected server error when creating employee", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Unexpected server error when creating employee");
        }

        logger.info("201 CREATED - Created employee with id: " + createdEmployee.getId());
        return new ResponseEntity<>(createdEmployee, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @Valid @RequestBody EmployeeDTO data) {
        Optional<Employee> maybeEmployee;
        try {
            maybeEmployee = this.service.findOne(id);
        } catch (Exception e) {
            logger.error("500 INTERNAL_SERVER_ERROR - Unexpected server error when finding employee with id: " + id, e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Unexpected server error when finding employee with id: " + id);
        }

        if (maybeEmployee.isEmpty()) {
            logger.error("404 NOT_FOUND - No employee found with id: " + id);
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No employee found with id: " + id);
        }

        if (data.finishDate != null && data.startDate.isAfter(data.finishDate)) {
            logger.error("400 BAD_REQUEST - Start date must be before finish date");
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Start date must be before finish date");
        }

        Employee employee = maybeEmployee.get();
        Employee updatedEmployee;

        try {
            updatedEmployee = this.service.update(employee, data);
        } catch (Exception e) {
            logger.error("500 INTERNAL_SERVER_ERROR - Unexpected server error when updating employee with id: " + id,
                    e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Unexpected server error when updating employee with id: " + id);
        }

        logger.info("200 OK - Updated employee with id: " + updatedEmployee.getId());
        return new ResponseEntity<>(updatedEmployee, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteEmployee(@PathVariable Long id) {
        Optional<Employee> maybeEmployee;
        try {
            maybeEmployee = this.service.findOne(id);
        } catch (Exception e) {
            logger.error("500 INTERNAL_SERVER_ERROR - Unexpected server error when finding employee with id: " + id);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Unexpected server error when finding employee with id: " + id);
        }

        Employee employee = maybeEmployee.get();

        try {
            this.service.delete(employee);
        } catch (Exception e) {
            logger.error("500 INTERNAL_SERVER_ERROR - Unexpected server error when deleting employee with id: " + id);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Unexpected server error when deleting employee with id: " + id);
        }

        logger.info("200 OK - Deleted employee with id: " + id);
        return new ResponseEntity<>(true, HttpStatus.OK);

    }
}
