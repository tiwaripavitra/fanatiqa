import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateForm, deleteForm } from "../../slices/form/form";
import FormDataService from "../../services/form/FormService";

const EditForm = (props) => {

  const initialFormState = {
    id: null,
    projectid: null,
    datafilepath: "",
    formabsoluteurl: "",
    formactorname:"",
    formdescription:"",
    formname: "",
    formrelativeurl: "",
    formsequence: "",
    mappingstate: "",
    startupform: "",
    published: false
  };

  const [currentForm, setCurrentForm] = useState(initialFormState);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const getForm = id => {
    FormDataService.get(id)
      .then(response => {
        setCurrentForm(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getForm(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentForm({ ...currentForm, [name]: value });
  };

  // const updateStatus = status => {
  //   const data = {
  //     id: currentForm.id,
  //     projectname: currentForm.title,
  //     projectdescription: currentForm.description,
  //     accountid: currentForm.accountid,
  //     projectplatformtypeid: currentForm.projectplatformtypeid,
  //     published: status
  //   };

  //   dispatch(updateForm({ id: currentForm.id, data }))
  //     .unwrap()
  //     .then(response => {
  //       console.log(response);
  //       setCurrentForm({ ...currentForm, published: status });
  //       setMessage("The status was updated successfully!");
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // };

  const updateContent = () => {
    dispatch(updateForm({ id: currentForm.id, data: currentForm }))
      .unwrap()
      .then(response => {
        console.log(response);
        setMessage("The Form was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const removeForm = () => {
    dispatch(deleteForm({ id: currentForm.id }))
      .unwrap()
      .then(() => {
        props.history.push("/forms");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentForm ? (
        <div className="edit-form">
          <h4>Project</h4>
          <form>
            <div className="form-group">
              <label htmlFor="projectname">Form Name</label>
              <input
                type="text"
                className="form-control"
                id="projectname"
                name="projectname"
                value={currentForm.projectname}
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
                value={currentForm.projectdescription}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button className="badge badge-danger mr-2" onClick={removeForm}>
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
          <p>Please click on a Form...</p>
        </div>
      )}
    </div>
  );
};

export default EditForm;
