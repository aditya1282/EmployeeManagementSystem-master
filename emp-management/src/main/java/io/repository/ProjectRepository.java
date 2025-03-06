package io.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import io.entity.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {
	Project findByName(String name);
}
