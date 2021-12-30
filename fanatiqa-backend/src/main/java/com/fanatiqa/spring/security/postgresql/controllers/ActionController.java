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

import com.fanatiqa.spring.security.postgresql.models.Action;
import com.fanatiqa.spring.security.postgresql.repository.ActionRepository;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class ActionController {

	@Autowired
	ActionRepository actionRepository;

	Logger logger = LoggerFactory.getLogger(ActionController.class);

	@GetMapping("/action")
	public ResponseEntity<List<Action>> getAllActionbyFromid(@RequestParam(required = false) Long formid) {
		try {
			List<Action> action = new ArrayList<Action>();

			if (formid == null)
				actionRepository.findAll().forEach(action::add);
			else
				actionRepository.findByForm(formid).forEach(action::add);

			if (action.isEmpty()) {
				
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(action, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/action/{actionid}")
	public ResponseEntity<Action> getActionById(@PathVariable("actionid") long id) {
		Optional<Action> actionData = actionRepository.findById(id);

		if (actionData.isPresent()) {
			return new ResponseEntity<>(actionData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/action")
	public ResponseEntity<Action> createForm(@RequestBody Action action) {
		try {
			/*
			 * logger.info("Froms data received from UI : " + Form.getProjectname() +
			 * project.getProjectdescription() + project.getProjectplatformtype() +
			 * project.getProjectaccountassociated());
			 * 
			 * String actionname, String invalidated, Long invalidendpointformid, Integer
			 * invalidpriority, Integer invalidseverity, String invalidtags, Long projectid,
			 * Long triggercontrolid, Long validendpointformid, Integer validpriority,
			 * Integer validseverity, String validtags, Form form
			 */

			Action _action = actionRepository.save(new Action(action.getActionname(), action.getInvalidated(),
					action.getInvalidendpointformid(), action.getInvalidpriority(), action.getInvalidseverity(),
					action.getInvalidtags(),  action.getTriggercontrolid(),
					action.getValidendpointformid(), action.getValidpriority(), action.getValidseverity(),
					action.getValidtags(), action.getForm()));
			return new ResponseEntity<>(_action, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/action/{actionid}")
	public ResponseEntity<Action> updateProject(@PathVariable("actionid") long actionid, @RequestBody Action action) {

		/*
		 * logger.info("updateProject : Project data received from UI : " +
		 * project.getProjectname() + project.getProjectdescription() +
		 * project.getProjectplatformtype() + project.getProjectaccountassociated());
		 */
		Optional<Action> actionData = actionRepository.findById(actionid);

		if (actionData.isPresent()) {
			Action _action = actionData.get();
			
			/*
			 * _form.setProjectid(form.getProjectid());
			 * _form.setFormname(form.getFormname());
			 * _form.setFormdescription(form.getFormdescription());
			 * _form.setFormactorname(form.getFormactorname());
			 * _form.setFormabsoluteurl(form.getFormabsoluteurl());
			 * _form.setFormrelativeurl(form.getFormrelativeurl());
			 * _form.setFormsequence(form.getFormsequence());
			 * _form.setDatafilepath(form.getDatafilepath());
			 * _form.setMappingstate(form.getMappingstate());
			 * _form.setStartupform(form.getStartupform());
			 * _form.setActions(form.getActions());
			 */
			 
			return new ResponseEntity<>(actionRepository.save(_action), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/action/{actionid}")
	public ResponseEntity<HttpStatus> deleteAction(@PathVariable("actionid") long actionid) {
		try {
			actionRepository.deleteById(actionid);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
