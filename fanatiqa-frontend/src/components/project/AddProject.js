import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProject } from "../../slices/project/project";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const AddProject = () => {

	const [submitted, setSubmitted] = useState(false);
	const dispatch = useDispatch();
	const associatedaccountsdropdown = [
		{ key: 'Select your account', value: '' },
		{ key: 'Microsoft', value: '1' },
		{ key: 'Google', value: '2' },
		{ key: 'HP', value: '3' }
	]
	const projectplatformdropdown = [
		{ key: 'Select your account', value: '' },
		{ key: 'Desktop', value: '1' },
		{ key: 'Web', value: '2' }
	]
	const initialValues = {
		id: null,
		projectname: "",
		projectdescription: "",
		accountid: null,
		accountid: null,
		published: false
	};

	const validationSchema = Yup.object().shape({
		projectname: Yup.string().required("This field is required!"),
		projectdescription: Yup.string().required("This field is required!"),
		formabsoluteurl: Yup.string().required("This field is required!"),
	});
	const [project, setProject] = useState(initialValues);

	const handleNewProject = (formValues) => {
		const { projectname, projectdescription, accountid, projectplatformtypeid } = formValues;
		
		console.log("handleNewProject : form values " , formValues);

		dispatch(createProject({ projectname, projectdescription, accountid, projectplatformtypeid }))
			.unwrap()
			.then(data => {
				console.log("Save Project : ", data);
				setProject({
					id: data.id,
					projectname: data.projectname,
					projectdescription: data.projectdescription,
					accountid: data.projectaccountassoaccountidciated * 1,  // converting string to number
					projectplatformtypeid: + data.projectplatformtypeid * 1, // converting string to number
					published: data.published
				});
				setSubmitted(true);
			})
			.catch(e => {
				console.log(e);
			});
	};

	const newProject = () => {
		setProject(initialValues);
		setSubmitted(false);
	};

	return (
		<div className="submit-form">
			{submitted ? (
				<div>
					<h4>You submitted successfully!</h4>
					<button className="btn btn-success" onClick={newProject}>
						Add
          </button>
				</div>
			) : (

					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleNewProject}
					>
						<Form>
							<div>
								<div className="form-group">
									<label htmlFor="projectname">Project Name</label>
									<Field name="projectname" type="text" className="form-control" />
									<ErrorMessage
										name="projectname"
										component="div"
										className="alert alert-danger"
									/>
								</div>
								<div className="form-group">
									<label htmlFor="projectdescription">Description</label>
									<Field name="projectdescription" type="text" className="form-control" />
									<ErrorMessage
										name="projectdescription"
										component="div"
										className="alert alert-danger"
									/>
								</div>
								<div className="form-group">
									<label htmlFor="description">Linked Account</label>
									<select

										className="form-control"
										id="accountid"
										required
										value={project.accountid}
										onChange={handleInputChange}
										name="accountid"
									>
										{associatedaccountsdropdown.map(accountsDropdown => {
											return (
												<option key={accountsDropdown.value} value={accountsDropdown.value}>
													{accountsDropdown.key}
												</option>
											)
										})}
									</select>
								</div>

								<div className="form-group">
									<label htmlFor="description">Project Platform Type</label>
									<select

										className="form-control"
										id="projectplatformtypeid"
										required
										value={project.projectplatformtypeid}
										onChange={handleInputChange}
										name="projectplatformtypeid"
									>
										{projectplatformdropdown.map(platform => {
											return (
												<option key={platform.value} value={platform.value}>
													{platform.key}
												</option>
											)
										})}
									</select>
								</div>
								<button onClick={saveProject} className="btn btn-success">
									Submit
          </button>
							</div>
						</Form>
					</Formik>
				)}
		</div>
	);
};

export default AddProject;
