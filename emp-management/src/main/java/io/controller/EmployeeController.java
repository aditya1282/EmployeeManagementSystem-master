package io.controller;

import io.entity.Employee;
import io.repository.EmployeeRepository;
import io.service.EmployeeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/employees")
@CrossOrigin("http://localhost:4200")
public class EmployeeController {

    private final EmployeeRepository employeeRepository;
    private final EmployeeService employeeService;

    @Autowired
    public EmployeeController(EmployeeRepository employeeRepository, EmployeeService employeeService) {
        this.employeeRepository = employeeRepository;
        this.employeeService = employeeService;
    }

    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @GetMapping("/{id}")
    public Employee getEmployeeById(@PathVariable Long id) {
        return employeeRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Employee createEmployee(@RequestBody Employee employee) {
        if (!this.employeeService.checkDuplicate(employee.getMobile())) {
            return employeeRepository.save(employee);
        } else {
            throw new RuntimeException("Employee already exists.");
        }
    }

    @PutMapping("/{id}")
    public Employee updateEmployee(@PathVariable Long id, @RequestBody Employee updatedEmployee) {
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

    @DeleteMapping("/{id}")
    public void deleteEmployee(@PathVariable Long id) {
        employeeRepository.deleteById(id);
    }

    @PostMapping("/check-duplicate-mobile")
    public Map<String, Boolean> checkDuplicateMobile(@RequestBody Employee employee) {
        boolean exists = employeeService.checkDuplicate(employee.getMobile());
        Map<String, Boolean> response = new HashMap<>();
        response.put("exists", exists);
        return response;
    }
}
