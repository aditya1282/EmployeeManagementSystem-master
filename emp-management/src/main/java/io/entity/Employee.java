package io.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "employee")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstname;
    private String lastname;
    private String mobile;
    private String email;

    public Employee() {
    }

    public Employee(String firstname, String lastname, String mobile, String email ) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.mobile = mobile;
        this.email = email;
    }

    // Getters and Setters

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setfirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getfirstname() {
        return firstname;
    }

    public void setlastname(String lastname) {
        this.lastname = lastname;
    }

    public String getlastname() {
        return lastname;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getMobile() {
        return mobile;
    }
    
    public void setemail(String email) {
        this.email = email;
    }

    public String getemail() {
        return email;
    }
}
