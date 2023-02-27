package com.matthewchhay.employeeCreator.Employees;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.server.ResponseStatusException;

import com.github.javafaker.Faker;

@ExtendWith(MockitoExtension.class)
public class EmployeeControllerTest {

    @Mock
    private EmployeeService employeeService;

    @InjectMocks
    private EmployeeController employeeController;

    Faker faker = new Faker(new Locale("en-AU"));

    public Employee createTestEmployee(Long id) {
        String firstName = faker.name().firstName();
        String lastName = faker.name().lastName();
        return new Employee(
                id,
                firstName,
                faker.name().firstName(),
                lastName,
                faker.internet().emailAddress(firstName + "." + lastName),
                faker.phoneNumber().cellPhone(),
                faker.address().fullAddress(),
                ContractTypes.values()[faker.number().numberBetween(0, ContractTypes.values().length)],
                LocalDate.now(),
                LocalDate.now().plusYears(5),
                faker.bool().bool(),
                WorkTypes.values()[faker.number().numberBetween(0, WorkTypes.values().length)],
                faker.number().numberBetween(0, 40));
    }

    public EmployeeDTO createTestEmployeeDTO() {
        String firstName = faker.name().firstName();
        String lastName = faker.name().lastName();
        return new EmployeeDTO(
                firstName,
                faker.name().firstName(),
                lastName,
                faker.internet().emailAddress(firstName + "." + lastName),
                faker.phoneNumber().cellPhone(),
                faker.address().fullAddress(),
                ContractTypes.values()[faker.number().numberBetween(0, ContractTypes.values().length)],
                LocalDate.now(),
                LocalDate.now().plusYears(5),
                faker.bool().bool(),
                WorkTypes.values()[faker.number().numberBetween(0, WorkTypes.values().length)],
                faker.number().numberBetween(0, 40));
    }

    @Test
    void testGetAll() {
        // Given
        List<Employee> employees = new ArrayList<>();
        employees.add(createTestEmployee(1l));
        when(employeeService.all()).thenReturn(employees);

        // When
        ResponseEntity<List<Employee>> response = employeeController.getAll();

        // Then
        verify(employeeService).all();
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo(employees);
    }

    @Test
    void testAddEmployee() {
        // Given
        EmployeeDTO employeeDTO = createTestEmployeeDTO();
        Employee employee = createTestEmployee(1l);
        when(employeeService.add(employeeDTO)).thenReturn(employee);

        // When
        ResponseEntity<Employee> response = employeeController.addEmployee(employeeDTO);

        // Then
        verify(employeeService).add(employeeDTO);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(response.getBody()).isEqualTo(employee);
    }

    @Test
    void testFindOneEmployee() {
        // Given
        Long id = 1l;
        Employee employee = createTestEmployee(id);
        when(employeeService.findOne(id)).thenReturn(Optional.of(employee));

        // When
        ResponseEntity<Employee> response = employeeController.findOneEmployee(id);

        // Then
        verify(employeeService).findOne(id);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo(employee);
    }

    @Test
    void testCannotFindOneEmployee() throws ResponseStatusException {
        // Given
        Long id = 5l;
        when(employeeService.findOne(id)).thenReturn(Optional.empty());

        // When
        ResponseStatusException response = assertThrows(ResponseStatusException.class,
                () -> employeeController.findOneEmployee(id));

        // Then
        verify(employeeService).findOne(id);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
        assertThat(response.getBody().getDetail()).isEqualTo("No employee found with id: " + id);
    }

    @Test
    void testDeleteEmployee() {
        // Given
        Long id = 1l;
        Employee employee = createTestEmployee(id);
        when(employeeService.findOne(id)).thenReturn(Optional.of(employee));

        // When
        ResponseEntity<Boolean> response = employeeController.deleteEmployee(id);

        // Then
        verify(employeeService).findOne(id);
        verify(employeeService).delete(employee);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo(true);
    }

    @Test
    void testUpdateEmployee() {
        // Given
        Long id = 1l;
        Employee employee = createTestEmployee(id);
        String firstName = faker.name().firstName();
        String lastName = faker.name().lastName();
        Faker faker2 = new Faker();
        EmployeeDTO employeeDTO = new EmployeeDTO(
                firstName,
                faker2.name().firstName(),
                lastName,
                faker2.internet().emailAddress(firstName + "." + lastName),
                faker2.phoneNumber().cellPhone(),
                faker2.address().fullAddress(),
                ContractTypes.values()[faker.number().numberBetween(0, ContractTypes.values().length)],
                LocalDate.now(),
                LocalDate.now().plusYears(5),
                faker2.bool().bool(),
                WorkTypes.values()[faker.number().numberBetween(0, WorkTypes.values().length)],
                faker2.number().numberBetween(0, 40));

        Employee updatedEmployee = new Employee(
                id,
                firstName,
                faker2.name().firstName(),
                lastName,
                faker2.internet().emailAddress(firstName + "." + lastName),
                faker2.phoneNumber().cellPhone(),
                faker2.address().fullAddress(),
                ContractTypes.values()[faker.number().numberBetween(0, ContractTypes.values().length)],
                LocalDate.now(),
                LocalDate.now().plusYears(5),
                faker2.bool().bool(),
                WorkTypes.values()[faker.number().numberBetween(0, WorkTypes.values().length)],
                faker2.number().numberBetween(0, 40));
        when(employeeService.findOne(id)).thenReturn(Optional.of(employee));
        when(employeeService.update(employee, employeeDTO)).thenReturn(updatedEmployee);

        // When
        ResponseEntity<Employee> response = employeeController.updateEmployee(id, employeeDTO);

        // Then
        verify(employeeService).update(employee, employeeDTO);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo(updatedEmployee);
    }
}
