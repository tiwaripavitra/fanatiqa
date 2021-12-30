import http from "../../http-common";

const getAll = () => {
  return http.get("/projects");
};

const get = id => {
  return http.get(`/projects/${id}`);
};

const create = data => {
  console.log("create in service : " , data);
  return http.post("/projects", data);
};

const update = (id, data) => {
  return http.put(`/projects/${id}`, data);
};

const remove = id => {
  return http.delete(`/projects/${id}`);
};

const removeAll = () => {
  return http.delete(`/projects`);
};

const findByTitle = projectname => {
  return http.get(`/projects?projectname=${projectname}`);
};

const ProjectService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};

export default ProjectService;