package io.controller;

import io.entity.Project;
import io.repository.ProjectRepository;
import io.service.ProjectService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/projects")
@CrossOrigin("http://localhost:4200")
public class ProjectController {

    private final ProjectRepository projectRepository;
    private final ProjectService projectService;
    
    @Autowired
    public ProjectController(ProjectRepository projectRepository,ProjectService projectService ) {
        this.projectRepository = projectRepository;
		this.projectService = projectService;
    }

    @GetMapping
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @GetMapping("/{id}")
    public Project getProjectById(@PathVariable Long id) {
        return projectRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Project createProject(@RequestBody Project project) {
        return projectRepository.save(project);
    }

    @PutMapping("/{id}")
    public Project updateProject(@PathVariable Long id, @RequestBody Project updatedProject) {
        Project project = projectRepository.findById(id).orElse(null);
        if (project != null) {
            project.setName(updatedProject.getName());
            return projectRepository.save(project);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteProject(@PathVariable Long id) {
        projectRepository.deleteById(id);
    }
    @PostMapping("/check-duplicate-projectname")
    public Map<String, Boolean> checkDuplicateProjectName(@RequestBody Map<String, String> payload) {
        String projectName = payload.get("projectName");
        boolean exists = projectService.checkDuplicateProjectName(projectName);
        Map<String, Boolean> response = new HashMap<>();
        response.put("exists", exists);
        return response;
    }

}
