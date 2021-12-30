import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProject } from "../../slices/project/project";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const AddForm = () => {

	const [loading, setLoading] = useState(false);
	const [errorHandler, setErrorHandler] = useState({
		hasError: false,
		message: "",
	});

	const [submitted, setSubmitted] = useState(false);
	const dispatch = useDispatch();

	const initialValues = {
		id: null,
		projectid: null,
		datafilepath: "",
		formabsoluteurl: "",
		formactorname: "",
		formdescription: "",
		formname: "",
		formrelativeurl: "",
		formsequence: "",
		mappingstate: "",
		startupform: "",
		published: false
	};

	const validationSchema = Yup.object().shape({
		formname: Yup.string().required("This field is required!"),
		formactorname: Yup.string().required("This field is required!"),
		formabsoluteurl: Yup.string().required("This field is required!"),
		datafilepath: Yup.string().required("This field is required!")
	});

	const [form, setForm] = useState(initialValues);


	const handleFormCreation = (formValues) => {
		const { id, projectid, datafilepath, formabsoluteurl, formactorname, formdescription, formname, formrelativeurl, formsequence, mappingstate, startupform } = form;
		const { name, value } = formValues;
		console.log("handleFormCreation: Form values : ", formValues);
		setForm({ ...form, [name]: value }); //mutates the old form value and updates with new values.

		dispatch(createProject({ id, projectid, datafilepath, formabsoluteurl, formactorname, formdescription, formname, formrelativeurl, formsequence, mappingstate, startupform }))
			.unwrap()
			.then(data => {
				console.log("Save Form : ", data);
				setForm({
					id: data.id,
					projectid: data.projectid,
					datafilepath: data.datafilepath,
					formabsoluteurl: data.formabsoluteurl,
					formactorname: data.formactorname,
					formdescription: data.formdescription,
					formname: data.formname,
					formrelativeurl: data.formrelativeurl,
					formsequence: data.formsequence,
					mappingstate: data.mappingstate,
					startupform: data.startupform,
				});
				setSubmitted(true);
				setErrorHandler({
					hasError: false,
					message: data.message
				});
			})
			.catch(e => {
				console.log(e);
				setErrorHandler({
					hasError: true,
					message: e.response.data.message
				});
			});
	};

	const newForm = () => {
		setForm(initialValues);
		setSubmitted(false);
	};

	return (
		<div className="submit-form">
			{submitted ? (
				<div>
					<h4>You submitted successfully!</h4>
					<button className="btn btn-success" onClick={newForm}>
						Add
          </button>
				</div>
			) : (
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleFormCreation}
					>
						<Form>
							<div>
								<div className="form-group">
									<label htmlFor="formname">Form Name</label>
									<Field name="formname" type="text" className="form-control" />
									<ErrorMessage
										name="formname"
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
									<label htmlFor="datafilepath">Data File Path</label>
									<Field name="datafilepath" type="text" className="form-control" />
									<ErrorMessage
										name="datafilepath"
										component="div"
										className="alert alert-danger"
									/>
								</div>
								<div className="form-group">
									<label htmlFor="formabsoluteurl">Form absolute Url</label>
									<Field name="formabsoluteurl" type="text" className="form-control" />
									<ErrorMessage
										name="formabsoluteurl"
										component="div"
										className="alert alert-danger"
									/>
								</div>
								<div className="form-group">
									<label htmlFor="formactorname">Form Actor Name</label>
									<Field name="formactorname" type="text" className="form-control" />
									<ErrorMessage
										name="formactorname"
										component="div"
										className="alert alert-danger"
									/>
								</div>
								<div className="form-group">
									<label htmlFor="formrelativeurl">Form Relative Url</label>
									<Field name="formrelativeurl" type="text" className="form-control" />
									<ErrorMessage
										name="formrelativeurl"
										component="div"
										className="alert alert-danger"
									/>
								</div>
								<div className="form-group">
									<label htmlFor="formsequence">Description</label>
									<Field name="formsequence" type="text" className="form-control" />
									<ErrorMessage
										name="formsequence"
										component="div"
										className="alert alert-danger"
									/>
								</div>
								<div className="form-group">
									<label htmlFor="mappingstate">Mapping State</label>
									<Field name="mappingstate" type="text" className="form-control" />
									<ErrorMessage
										name="mappingstate"
										component="div"
										className="alert alert-danger"
									/>
								</div>

								<div className="form-group">
									<label htmlFor="startupform">Start-up Form</label>
									<Field name="startupform" type="text" className="form-control" />
									<ErrorMessage
										name="startupform"
										component="div"
										className="alert alert-danger"
									/>
								</div>
								<button type="submit" className="btn btn-primary btn-block" disabled={loading}>
									{loading && (
										<span className="spinner-border spinner-border-sm"></span>
									)}
									<span>Submit</span>
								</button>
							</div>
						</Form>
					</Formik>
				)}
		</div>
	);
};

export default AddForm;
