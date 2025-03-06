package io.service;

import io.entity.Project;
import io.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project getProjectById(Long id) {
        return projectRepository.findById(id).orElse(null);
    }

    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    public Project updateProject(Long id, Project updatedProject) {
        Project project = projectRepository.findById(id).orElse(null);
        if (project != null) {
            project.setName(updatedProject.getName());
            return projectRepository.save(project);
        }
        return null;
    }

    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }
    public boolean checkDuplicateProjectName(String projectName) {
        Project existingProject = projectRepository.findByName(projectName);
        if (Objects.isNull(existingProject)) {
            return false;
        }
        return true;
    }
}
