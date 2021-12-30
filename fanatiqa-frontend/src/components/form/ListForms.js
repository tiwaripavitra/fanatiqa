import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  retrieveForm
} from "../../slices/form/form";
import { Link } from "react-router-dom";

const ListForm = () => {
  const [currentForm, setCurrentForm] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
 

  const forms = useSelector(state => state.forms);
  const dispatch = useDispatch();


  const initFetch = useCallback(() => {
    const returneddata = dispatch(retrieveForm());
    console.log("after dispatch call in initFetch : " , returneddata);
  }, [dispatch])

  useEffect(() => {
    initFetch()
  }, [initFetch])

  const setActiveForm = (form, index) => {
    setCurrentForm(form);
    setCurrentIndex(index);
  };

  return (
    <div className="list row">
     
      <div className="col-md-6">
        <h4>Projects List</h4>

        <ul className="list-group">
          {forms &&
            forms.map((form, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveForm(form, index)}
                key={index}
              >
                {form.projectname}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentForm ? (
          <div>
            <h4>Form</h4>
            <div>
              <label>
                <strong>Form Name:</strong>
              </label>{" "}
              {currentForm.projectname}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentForm.projectdescription}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentForm.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/forms/" + currentForm.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Form...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListForm;
