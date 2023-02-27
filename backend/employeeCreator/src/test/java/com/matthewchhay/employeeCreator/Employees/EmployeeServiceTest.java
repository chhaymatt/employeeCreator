package com.matthewchhay.employeeCreator.Employees;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.Locale;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.github.javafaker.Faker;

@ExtendWith(MockitoExtension.class)
public class EmployeeServiceTest {

    @Mock
    private EmployeeRepository employeeRepository;

    private EmployeeService underTest;

    @BeforeEach
    void setup() {
        underTest = new EmployeeService(employeeRepository);
    }

    @Test
    void canGetAllEmployees() {
        // When
        underTest.all();
        // Then
        verify(employeeRepository).findAll();
    }

    @Test
    void canAddEmployee() {
        // Given
        Faker faker = new Faker(new Locale("en-AU"));
        String firstName = faker.name().firstName();
        String lastName = faker.name().lastName();
        EmployeeDTO employeeDTO = new EmployeeDTO(
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

        // When
        underTest.add(employeeDTO);

        // Then
        ArgumentCaptor<Employee> employeeArgumentCaptor = ArgumentCaptor.forClass(Employee.class);

        verify(employeeRepository).save(employeeArgumentCaptor.capture());

        Employee capturedEmployee = employeeArgumentCaptor.getValue();

        // Cannot compare two instances and employeeDTO does not contain id
        // assertThat(capturedEmployee).isEqualTo(employeeDTO);

        // Compare each field
        assertThat(capturedEmployee.getFirstName()).isEqualTo(employeeDTO.firstName);
        assertThat(capturedEmployee.getMiddleName()).isEqualTo(employeeDTO.middleName);
        assertThat(capturedEmployee.getLastName()).isEqualTo(employeeDTO.lastName);
        assertThat(capturedEmployee.getEmail()).isEqualTo(employeeDTO.email);
        assertThat(capturedEmployee.getMobile()).isEqualTo(employeeDTO.mobile);
        assertThat(capturedEmployee.getAddress()).isEqualTo(employeeDTO.address);
        assertThat(capturedEmployee.getContractType()).isEqualTo(employeeDTO.contractType);
        assertThat(capturedEmployee.getStartDate()).isEqualTo(employeeDTO.startDate);
        assertThat(capturedEmployee.getFinishDate()).isEqualTo(employeeDTO.finishDate);
        assertThat(capturedEmployee.getIsOngoing()).isEqualTo(employeeDTO.isOngoing);
        assertThat(capturedEmployee.getWorkType()).isEqualTo(employeeDTO.workType);
        assertThat(capturedEmployee.getHoursPerWeek()).isEqualTo(employeeDTO.hoursPerWeek);
    }

    @Test
    void canDeleteEmployee() {
        // Given
        Faker faker = new Faker(new Locale("en-AU"));
        String firstName = faker.name().firstName();
        String lastName = faker.name().lastName();
        Employee employee = new Employee(
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

        // When
        underTest.delete(employee);

        // Then
        verify(employeeRepository).delete(employee);
    }

    @Test
    void canFindEmployeeById() {
        // Given
        Long id = 1l;
        Faker faker = new Faker(new Locale("en-AU"));
        String firstName = faker.name().firstName();
        String lastName = faker.name().lastName();
        Employee employee = new Employee(
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

        when(employeeRepository.findById(id)).thenReturn(Optional.of(employee));

        // When
        Optional<Employee> maybeEmployee = underTest.findOne(id);

        // Then
        verify(employeeRepository).findById(id);
        assertThat(maybeEmployee).isPresent();
        Employee foundEmployee = maybeEmployee.get();
        assertThat(foundEmployee.getFirstName()).isEqualTo(employee.getFirstName());
        assertThat(foundEmployee.getMiddleName()).isEqualTo(employee.getMiddleName());
        assertThat(foundEmployee.getLastName()).isEqualTo(employee.getLastName());
        assertThat(foundEmployee.getEmail()).isEqualTo(employee.getEmail());
        assertThat(foundEmployee.getMobile()).isEqualTo(employee.getMobile());
        assertThat(foundEmployee.getAddress()).isEqualTo(employee.getAddress());
        assertThat(foundEmployee.getContractType()).isEqualTo(employee.getContractType());
        assertThat(foundEmployee.getStartDate()).isEqualTo(employee.getStartDate());
        assertThat(foundEmployee.getFinishDate()).isEqualTo(employee.getFinishDate());
        assertThat(foundEmployee.getIsOngoing()).isEqualTo(employee.getIsOngoing());
        assertThat(foundEmployee.getWorkType()).isEqualTo(employee.getWorkType());
        assertThat(foundEmployee.getHoursPerWeek()).isEqualTo(employee.getHoursPerWeek());

    }

    @Test
    void cannotFindEmployeeById() {
        // Given
        Long id = 12345678l;
        when(employeeRepository.findById(id)).thenReturn(Optional.empty());

        // When 
        Optional<Employee> maybeEmployee = underTest.findOne(id);

        // Then
        verify(employeeRepository).findById(id);
        assertThat(maybeEmployee).isEmpty();
    }

    @Test
    void testUpdate() {
        // Given
        Faker faker = new Faker(new Locale("en-AU"));
        String firstName = faker.name().firstName();
        String lastName = faker.name().lastName();
        Employee employee = new Employee(
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

        // System.out.println(employee);

        Faker faker2 = new Faker(new Locale("en-AU"));
        String firstName2 = faker2.name().firstName();
        String lastName2 = faker2.name().lastName();
        EmployeeDTO employeeDTO = new EmployeeDTO(
                firstName2,
                faker2.name().firstName(),
                lastName2,
                faker2.internet().emailAddress(firstName2 + "." + lastName2),
                faker2.phoneNumber().cellPhone(),
                faker2.address().fullAddress(),
                ContractTypes.values()[faker2.number().numberBetween(0, ContractTypes.values().length)],
                LocalDate.now(),
                LocalDate.now().plusYears(5),
                faker2.bool().bool(),
                WorkTypes.values()[faker2.number().numberBetween(0, WorkTypes.values().length)],
                faker2.number().numberBetween(0, 40));

        // System.out.println(employeeDTO);

        // When
        underTest.update(employee, employeeDTO);

        // Then
        ArgumentCaptor<Employee> employeeArgumentCaptor = ArgumentCaptor.forClass(Employee.class);

        verify(employeeRepository).save(employeeArgumentCaptor.capture());

        Employee capturedEmployee = employeeArgumentCaptor.getValue();

        assertThat(capturedEmployee.getFirstName()).isEqualTo(employeeDTO.firstName);
        assertThat(capturedEmployee.getMiddleName()).isEqualTo(employeeDTO.middleName);
        assertThat(capturedEmployee.getLastName()).isEqualTo(employeeDTO.lastName);
        assertThat(capturedEmployee.getEmail()).isEqualTo(employeeDTO.email);
        assertThat(capturedEmployee.getMobile()).isEqualTo(employeeDTO.mobile);
        assertThat(capturedEmployee.getAddress()).isEqualTo(employeeDTO.address);
        assertThat(capturedEmployee.getContractType()).isEqualTo(employeeDTO.contractType);
        assertThat(capturedEmployee.getStartDate()).isEqualTo(employeeDTO.startDate);
        assertThat(capturedEmployee.getFinishDate()).isEqualTo(employeeDTO.finishDate);
        assertThat(capturedEmployee.getIsOngoing()).isEqualTo(employeeDTO.isOngoing);
        assertThat(capturedEmployee.getWorkType()).isEqualTo(employeeDTO.workType);
        assertThat(capturedEmployee.getHoursPerWeek()).isEqualTo(employeeDTO.hoursPerWeek);

    }
}
