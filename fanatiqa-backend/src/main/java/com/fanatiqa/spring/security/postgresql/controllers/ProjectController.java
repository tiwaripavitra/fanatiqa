package com.fanatiqa.spring.security.postgresql.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

import com.fanatiqa.spring.security.postgresql.models.Project;
import com.fanatiqa.spring.security.postgresql.repository.ProjectRepository;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class ProjectController {

	@Autowired
	ProjectRepository projectRepository;

	Logger logger = LoggerFactory.getLogger(ProjectController.class);

	@GetMapping("/projects")
	public ResponseEntity<List<Project>> getAllProjects(@RequestParam(required = false) String projectname) {
		try {
			List<Project> projects = new ArrayList<Project>();

			if (projectname == null)
				projectRepository.findAll().forEach(projects::add);
			    logger.debug("getAllProjects: project list from database: " + projects);
			/*
			 * else
			 * projectRepository.findByProjectnameContaining(projectname).forEach(projects::
			 * add);
			 */

			if (projects.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(projects, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/projects/{id}")
	public ResponseEntity<Project> getProjectById(@PathVariable("id") long id) {
		Optional<Project> projectData = projectRepository.findById(id);

		if (projectData.isPresent()) {
			return new ResponseEntity<>(projectData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/projects")
	public ResponseEntity<Project> createProject(@RequestBody Project project) {
		try {
			logger.info("Project data received from UI : " + project.getProjectname() + project.getProjectdescription()
					+ project.getProjectplatformtypeid() + project.getAccountid());
			Project _project = projectRepository.save(new Project(project.getProjectname(),
					project.getProjectdescription(), project.getProjectplatformtypeid(), project.getAccountid()));
			return new ResponseEntity<>(_project, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/projects/{id}")
	public ResponseEntity<Project> updateProject(@PathVariable("projectid") long projectid,
			@RequestBody Project project) {

		logger.info("updateProject : Project data received from UI : " + project.getProjectname()
				+ project.getProjectdescription() + project.getProjectplatformtypeid() + project.getAccountid());
		Optional<Project> projectData = projectRepository.findById(projectid);

		if (projectData.isPresent()) {
			Project _project = projectData.get();

			_project.setProjectname(project.getProjectname());
			_project.setProjectdescription(project.getProjectdescription());
			_project.setProjectplatformtypeid(project.getProjectplatformtypeid());
			_project.setAccountid(project.getAccountid());

			return new ResponseEntity<>(projectRepository.save(_project), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

	}

	@DeleteMapping("/projects/{id}")
	public ResponseEntity<HttpStatus> deleteProject(@PathVariable("id") long id) {
		try {
			projectRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
