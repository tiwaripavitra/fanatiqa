package com.fanatiqa.spring.security.postgresql.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fanatiqa.spring.security.postgresql.models.Action;

public interface ActionRepository extends JpaRepository<Action, Long> {
	// List<Project> findByPublished(boolean published);

	List<Action> findByActionnameContaining(String actionname);

	List<Action> findByForm(Long formid);

	// List<Form> findByForm(Form form, Sort sort);
}
