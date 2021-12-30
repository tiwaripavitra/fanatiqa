package com.fanatiqa.spring.security.postgresql.models;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * The persistent class for the projects database table.
 * 
 */
@Entity
@Table(name = "projects")
@NamedQuery(name = "Project.findAll", query = "SELECT p FROM Project p")
public class Project implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private Long accountid;

	private String projectdescription;

	private String projectname;

	private Long projectplatformtypeid;

	@OneToMany(mappedBy="project")
	private List<Form> form = new ArrayList<>();

	public Project() {
	}

	public Project(String projectname, String projectdescription, Long projectplatformtypeid, Long accountid) {
		super();
		this.accountid = accountid;
		this.projectdescription = projectdescription;
		this.projectname = projectname;
		this.projectplatformtypeid = projectplatformtypeid;
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getAccountid() {
		return this.accountid;
	}

	public void setAccountid(Long accountid) {
		this.accountid = accountid;
	}

	public String getProjectdescription() {
		return this.projectdescription;
	}

	public void setProjectdescription(String projectdescription) {
		this.projectdescription = projectdescription;
	}

	public String getProjectname() {
		return this.projectname;
	}

	public void setProjectname(String projectname) {
		this.projectname = projectname;
	}

	public Long getProjectplatformtypeid() {
		return this.projectplatformtypeid;
	}

	public void setProjectplatformtypeid(Long projectplatformtypeid) {
		this.projectplatformtypeid = projectplatformtypeid;
	}

	/**
	 * @return the form
	 */
	public List<Form> getForm() {
		return form;
	}

	/**
	 * @param add Form
	 */
	public void addForm(Form form) {
		this.form.add(form);
	}

	/**
	 * @param remove form
	 */
	public void removeForm(Form form) {
		this.form.remove(form);
	}

}