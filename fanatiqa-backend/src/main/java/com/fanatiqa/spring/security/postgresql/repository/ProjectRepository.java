package com.fanatiqa.spring.security.postgresql.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.fanatiqa.spring.security.postgresql.models.Form;
import com.fanatiqa.spring.security.postgresql.models.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {
	// List<Project> findByPublished(boolean published);

	// List<Project> findByProjectnameContaining(String projectname);


}
