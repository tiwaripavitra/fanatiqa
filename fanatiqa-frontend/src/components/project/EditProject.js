import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateProject, deleteProject } from "../../slices/project/project";
import ProjectDataService from "../../services/project/ProjectService";

const EditProject = (props) => {

  const initialProjectState = {
    id: null,
    projectname: "",
    projectdescription: "",
    accountid:"",
    projectplatformtypeid:"",
    published: false
  };

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

  const [currentProject, setCurrentProject] = useState(initialProjectState);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const getTutorial = id => {
    ProjectDataService.get(id)
      .then(response => {
        setCurrentProject(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getTutorial(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentProject({ ...currentProject, [name]: value });
  };

  const updateStatus = status => {
    const data = {
      id: currentProject.id,
      projectname: currentProject.title,
      projectdescription: currentProject.description,
      accountid: currentProject.accountid,
      projectplatformtypeid: currentProject.projectplatformtypeid,
      published: status
    };

    dispatch(updateProject({ id: currentProject.id, data }))
      .unwrap()
      .then(response => {
        console.log(response);
        setCurrentProject({ ...currentProject, published: status });
        setMessage("The status was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateContent = () => {
    dispatch(updateProject({ id: currentProject.id, data: currentProject }))
      .unwrap()
      .then(response => {
        console.log(response);
        setMessage("The project was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const removeProject = () => {
    dispatch(deleteProject({ id: currentProject.id }))
      .unwrap()
      .then(() => {
        props.history.push("/projects");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentProject ? (
        <div className="edit-form">
          <h4>Project</h4>
          <form>
            <div className="form-group">
              <label htmlFor="projectname">Project Name</label>
              <input
                type="text"
                className="form-control"
                id="projectname"
                name="projectname"
                value={currentProject.projectname}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="projectdescription">Description</label>
              <input
                type="text"
                className="form-control"
                id="projectdescription"
                name="projectdescription"
                value={currentProject.projectdescription}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
						<label htmlFor="description">Project Account Type</label>
						<select
							className="form-control"
							id="accountid"
							required
							value={currentProject.accountid}
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
							value={currentProject.projectplatformtypeid}
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

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentProject.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentProject.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateStatus(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateStatus(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={removeProject}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateContent}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Project...</p>
        </div>
      )}
    </div>
  );
};

export default EditProject;
