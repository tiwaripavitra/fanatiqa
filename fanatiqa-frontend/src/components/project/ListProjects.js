import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  retrieveProject,
  findProjectByTitle,
  deleteAllProjects,
} from "../../slices/project/project";
import { Link } from "react-router-dom";

const ListProject = () => {
  const [currentProject, setCurrentProject] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  const projects = useSelector(state => state.projects);
  const dispatch = useDispatch();

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const initFetch = useCallback(() => {
    const returneddata = dispatch(retrieveProject());
    console.log("after dispatch call in initFetch : " , returneddata);
  }, [dispatch])

  useEffect(() => {
    initFetch()
  }, [initFetch])

  const refreshData = () => {
    setCurrentProject(null);
    setCurrentIndex(-1);
  };

  const setActiveProject = (project, index) => {
    setCurrentProject(project);
    setCurrentIndex(index);
  };

  const removeAllProjects = () => {
    dispatch(deleteAllProjects())
      .then(response => {
        refreshData();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    refreshData();
    dispatch(findProjectByTitle({ title: searchTitle }));
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Projects List</h4>

        <ul className="list-group">
          {projects &&
            projects.map((project, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveProject(project, index)}
                key={index}
              >
                {project.projectname}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllProjects}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentProject ? (
          <div>
            <h4>Project</h4>
            <div>
              <label>
                <strong>Project Name:</strong>
              </label>{" "}
              {currentProject.projectname}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentProject.projectdescription}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentProject.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/projects/" + currentProject.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Project...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListProject;
