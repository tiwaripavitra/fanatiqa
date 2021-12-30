package com.fanatiqa.spring.security.postgresql.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fanatiqa.spring.security.postgresql.models.Form;

public interface FormsRepository extends JpaRepository<Form, Long> {
	// List<Project> findByPublished(boolean published);

	List<Form> findByFormnameContaining(String formname);
	
	
	//SELECT p, f FROM Project p, Form f WHERE p.projectid  = f.projectid
	/*
	 * @Query("SELECT p FROM Form p WHERE p.projectid  = ?1") List<Form>
	 * getFormByProjectid(long projectid);
	 */

	//List<Project> findByProjectid(Project projectid, Sort sort);
}
