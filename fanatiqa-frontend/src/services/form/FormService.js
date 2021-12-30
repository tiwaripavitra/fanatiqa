import http from "../../http-common";

const getAll = () => {
  return http.get("/forms");
};

const get = id => {
  return http.get(`/forms/${id}`);
};

const create = data => {
  console.log("create in service : " , data);
  return http.post("/forms", data);
};

const update = (id, data) => {
  return http.put(`/forms/${id}`, data);
};

const remove = id => {
  return http.delete(`/forms/${id}`);
};


const FormService = {
  getAll,
  get,
  create,
  update,
  remove
};

export default FormService;