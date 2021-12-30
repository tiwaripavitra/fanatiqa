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
import com.fanatiqa.spring.security.postgresql.models.Form;
import com.fanatiqa.spring.security.postgresql.repository.FormsRepository;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class FormsController {

	@Autowired
	FormsRepository formRepository;

	Logger logger = LoggerFactory.getLogger(FormsController.class);

	@GetMapping("/form")
	public ResponseEntity<List<Form>> getAllForm(@RequestParam(required = false) String formname) {
		try {
			List<Form> Form = new ArrayList<Form>();

			if (formname == null)
				formRepository.findAll().forEach(Form::add);
			else
				formRepository.findByFormnameContaining(formname).forEach(Form::add);

			if (Form.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(Form, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/form/{formid}")
	public ResponseEntity<Form> getFormById(@PathVariable("formid") long id) {
		Optional<Form> formData = formRepository.findById(id);

		if (formData.isPresent()) {
			return new ResponseEntity<>(formData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	
	/*
	 * @GetMapping("/form/{id}") public ResponseEntity<Form>
	 * getFormByProjectid(@PathVariable("id") long id) { List<Form> formData =
	 * formRepository.getFormByProjectid(id);
	 * 
	 * if (!formData.isEmpty()) {
	 * 
	 * System.out.println("query result from forms repository : " + formData);
	 * 
	 * return new ResponseEntity<>(formData.get(1), HttpStatus.OK); } else { return
	 * new ResponseEntity<>(HttpStatus.NOT_FOUND); } }
	 */

	@PostMapping("/form")
	public ResponseEntity<Form> createForm(@RequestBody Form form) {
		try {
			/*
			 * logger.info("Froms data received from UI : " + Form.getProjectname() +
			 * project.getProjectdescription() + project.getProjectplatformtype() +
			 * project.getProjectaccountassociated());
			 * 
			 * public Form( String datafilepath, String formabsoluteurl, String
			 * formactorname, String formdescription, String formname, String
			 * formrelativeurl, Integer formsequence, String mappingstate, Long projectid,
			 * Boolean startupform, List<Action> actions)
			 */
			Form _form = formRepository.save(new Form(form.getDatafilepath(), form.getFormabsoluteurl(),
					form.getFormactorname(), form.getFormdescription(), form.getFormname(), form.getFormrelativeurl(),
					form.getFormsequence(), form.getMappingstate(), form.getStartupform(), form.getProject()));
			return new ResponseEntity<>(_form, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/form/{formid}")
	public ResponseEntity<Form> updateProject(@PathVariable("formid") long formid, @RequestBody Form form) {

		/*
		 * logger.info("updateProject : Project data received from UI : " +
		 * project.getProjectname() + project.getProjectdescription() +
		 * project.getProjectplatformtype() + project.getProjectaccountassociated());
		 */
		Optional<Form> FormData = formRepository.findById(formid);

		if (FormData.isPresent()) {
			Form _form = FormData.get();
			// _form.setProjectid(form.getProjectid());
			_form.setFormname(form.getFormname());
			_form.setFormdescription(form.getFormdescription());
			_form.setFormactorname(form.getFormactorname());
			_form.setFormabsoluteurl(form.getFormabsoluteurl());
			_form.setFormrelativeurl(form.getFormrelativeurl());
			_form.setFormsequence(form.getFormsequence());
			_form.setDatafilepath(form.getDatafilepath());
			_form.setMappingstate(form.getMappingstate());
			_form.setStartupform(form.getStartupform());
			
			Action action1 = new Action();
			_form.addAction(action1);
			//_form.setActions(form.getActions());

			return new ResponseEntity<>(formRepository.save(_form), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

	}

	@DeleteMapping("/form/{formid}")
	public ResponseEntity<HttpStatus> deleteForm(@PathVariable("formid") long formid) {
		try {
			formRepository.deleteById(formid);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
