package com.fanatiqa.spring.security.postgresql.models;

import java.io.Serializable;
import javax.persistence.*;

/**
 * The persistent class for the actions database table.
 * 
 */
@Entity
@Table(name = "actions")
@NamedQuery(name = "Action.findAll", query = "SELECT a FROM Action a")
public class Action implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private String actionname;

	private String invalidated;

	private Long invalidendpointformid;

	private Integer invalidpriority;

	private Integer invalidseverity;

	private String invalidtags;

	private Long triggercontrolid;

	private Long validendpointformid;

	private Integer validpriority;

	private Integer validseverity;

	private String validtags;

	// bi-directional many-to-one association to Form
	@ManyToOne(fetch = FetchType.LAZY)
	private Form form;

	public Action() {
	}

	public Action(String actionname, String invalidated, Long invalidendpointformid, Integer invalidpriority,
			Integer invalidseverity, String invalidtags,  Long triggercontrolid,
			Long validendpointformid, Integer validpriority, Integer validseverity, String validtags, Form form) {
		super();
		this.actionname = actionname;
		this.invalidated = invalidated;
		this.invalidendpointformid = invalidendpointformid;
		this.invalidpriority = invalidpriority;
		this.invalidseverity = invalidseverity;
		this.invalidtags = invalidtags;
		this.triggercontrolid = triggercontrolid;
		this.validendpointformid = validendpointformid;
		this.validpriority = validpriority;
		this.validseverity = validseverity;
		this.validtags = validtags;
		this.form = form;
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getActionname() {
		return this.actionname;
	}

	public void setActionname(String actionname) {
		this.actionname = actionname;
	}

	public String getInvalidated() {
		return this.invalidated;
	}

	public void setInvalidated(String invalidated) {
		this.invalidated = invalidated;
	}

	public Long getInvalidendpointformid() {
		return this.invalidendpointformid;
	}

	public void setInvalidendpointformid(Long invalidendpointformid) {
		this.invalidendpointformid = invalidendpointformid;
	}

	public Integer getInvalidpriority() {
		return this.invalidpriority;
	}

	public void setInvalidpriority(Integer invalidpriority) {
		this.invalidpriority = invalidpriority;
	}

	public Integer getInvalidseverity() {
		return this.invalidseverity;
	}

	public void setInvalidseverity(Integer invalidseverity) {
		this.invalidseverity = invalidseverity;
	}

	public String getInvalidtags() {
		return this.invalidtags;
	}

	public void setInvalidtags(String invalidtags) {
		this.invalidtags = invalidtags;
	}
	
	public Long getTriggercontrolid() {
		return this.triggercontrolid;
	}

	public void setTriggercontrolid(Long triggercontrolid) {
		this.triggercontrolid = triggercontrolid;
	}

	public Long getValidendpointformid() {
		return this.validendpointformid;
	}

	public void setValidendpointformid(Long validendpointformid) {
		this.validendpointformid = validendpointformid;
	}

	public Integer getValidpriority() {
		return this.validpriority;
	}

	public void setValidpriority(Integer validpriority) {
		this.validpriority = validpriority;
	}

	public Integer getValidseverity() {
		return this.validseverity;
	}

	public void setValidseverity(Integer validseverity) {
		this.validseverity = validseverity;
	}

	public String getValidtags() {
		return this.validtags;
	}

	public void setValidtags(String validtags) {
		this.validtags = validtags;
	}

	public Form getForm() {
		return this.form;
	}

	public void setForm(Form form) {
		this.form = form;
	}

}