package com.fanatiqa.spring.security.postgresql.models;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * The persistent class for the forms database table.
 * 
 */
@Entity
@Table(name = "forms")
@NamedQuery(name = "Form.findAll", query = "SELECT f FROM Form f")
public class Form implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private String datafilepath;

	private String formabsoluteurl;

	private String formactorname;

	private String formdescription;

	private String formname;

	private String formrelativeurl;

	private Integer formsequence;

	@ManyToOne(fetch = FetchType.LAZY)
	private Project project;

	private String mappingstate;

	private Boolean startupform;

	// bi-directional many-to-one association to Action

	@OneToMany(mappedBy = "form")
	private List<Action> actions = new ArrayList<>();

	public Form(String datafilepath, String formabsoluteurl, String formactorname, String formdescription,
			String formname, String formrelativeurl, Integer formsequence, String mappingstate, Boolean startupform,
			Project project) {
		super();
		this.datafilepath = datafilepath;
		this.formabsoluteurl = formabsoluteurl;
		this.formactorname = formactorname;
		this.formdescription = formdescription;
		this.formname = formname;
		this.formrelativeurl = formrelativeurl;
		this.formsequence = formsequence;
		this.mappingstate = mappingstate;
		this.startupform = startupform;
		this.project = project;
	}

	public Form() {
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDatafilepath() {
		return this.datafilepath;
	}

	public void setDatafilepath(String datafilepath) {
		this.datafilepath = datafilepath;
	}

	public String getFormabsoluteurl() {
		return this.formabsoluteurl;
	}

	public void setFormabsoluteurl(String formabsoluteurl) {
		this.formabsoluteurl = formabsoluteurl;
	}

	public String getFormactorname() {
		return this.formactorname;
	}

	public void setFormactorname(String formactorname) {
		this.formactorname = formactorname;
	}

	public String getFormdescription() {
		return this.formdescription;
	}

	public void setFormdescription(String formdescription) {
		this.formdescription = formdescription;
	}

	public String getFormname() {
		return this.formname;
	}

	public void setFormname(String formname) {
		this.formname = formname;
	}

	public String getFormrelativeurl() {
		return this.formrelativeurl;
	}

	public void setFormrelativeurl(String formrelativeurl) {
		this.formrelativeurl = formrelativeurl;
	}

	public Integer getFormsequence() {
		return this.formsequence;
	}

	public void setFormsequence(Integer formsequence) {
		this.formsequence = formsequence;
	}

	public String getMappingstate() {
		return this.mappingstate;
	}

	public void setMappingstate(String mappingstate) {
		this.mappingstate = mappingstate;
	}

	public Boolean getStartupform() {
		return this.startupform;
	}

	public void setStartupform(Boolean startupform) {
		this.startupform = startupform;
	}

	public Action addAction(Action action) {
		getActions().add(action);
		action.setForm(this);
		return action;
	}

	public Action removeAction(Action action) {
		getActions().remove(action);
		action.setForm(null);
		return action;
	}

	/**
	 * @return the project
	 */
	public Project getProject() {
		return project;
	}

	/**
	 * @param project the project to set
	 */
	public void setProject(Project project) {
		this.project = project;
	}

	/**
	 * @return the actions
	 */
	public List<Action> getActions() {
		return actions;
	}

}