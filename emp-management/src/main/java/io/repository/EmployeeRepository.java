package io.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import io.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Employee findByEmail(String email);
    Employee findByMobile(String mobile);
}
