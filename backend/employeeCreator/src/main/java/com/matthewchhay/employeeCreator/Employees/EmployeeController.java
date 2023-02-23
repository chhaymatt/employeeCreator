package com.matthewchhay.employeeCreator.Employees;

import java.util.List;
import java.util.Optional;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import jakarta.validation.Valid;

@CrossOrigin
@RestController
@RequestMapping("/employees")
public class EmployeeController {
    @Autowired
    private EmployeeService service;

    @GetMapping
    public ResponseEntity<List<Employee>> getAll(@RequestParam(required = false) Boolean assigned) {
        List<Employee> allEmployees = this.service.all();
        return new ResponseEntity<>(allEmployees, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> findOneEmployee(@PathVariable Long id) {
        Optional<Employee> maybeEmployee = this.service.findOne(id);

        if (maybeEmployee.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No employee found with id: " + id);
        }

        return new ResponseEntity<>(maybeEmployee.get(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Employee> addEmployee(@Valid @RequestBody EmployeeDTO data) {
        if (data.finishDate != null && data.startDate.isAfter(data.finishDate)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Start date must be before finish date");
        }

        Employee createdEmployee = this.service.add(data);
        return new ResponseEntity<>(createdEmployee, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @Valid @RequestBody EmployeeDTO data) {
        Optional<Employee> maybeEmployee = this.service.findOne(id);

        if (maybeEmployee.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No employee found with id: " + id);
        }

        if (data.finishDate != null && data.startDate.isAfter(data.finishDate)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Start date must be before finish date");
        }

        Employee employee = maybeEmployee.get();

        Employee updatedEmployee = this.service.update(employee, data);
        return new ResponseEntity<>(updatedEmployee, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteEmployee(@PathVariable Long id) {
        Optional<Employee> maybeEmployee = this.service.findOne(id);
        if (maybeEmployee.isEmpty()) {
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        }
        Employee employee = maybeEmployee.get();
        this.service.delete(employee);
        return new ResponseEntity<>(true, HttpStatus.OK);

    }
}
