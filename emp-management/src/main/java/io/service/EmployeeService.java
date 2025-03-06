package io.service;

import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;

import io.entity.Employee;
import io.repository.EmployeeRepository;
@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id).orElse(null);
    }

    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }
    public boolean checkDuplicate(String mobile) {
    	Employee duplicateEmployee = employeeRepository.findByMobile(mobile);
    	if(Objects.isNull(duplicateEmployee)) {
    		return false;
    	}
    	return true;
    }

    public Employee updateEmployee(Long id, Employee updatedEmployee) {
        Employee employee = employeeRepository.findById(id).orElse(null);
        if (employee != null) {
            employee.setfirstname(updatedEmployee.getfirstname());
            employee.setlastname(updatedEmployee.getlastname());
            employee.setMobile(updatedEmployee.getMobile());
            employee.setemail(updatedEmployee.getemail());
            return employeeRepository.save(employee);
        }
        return null;
    }

    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }
}