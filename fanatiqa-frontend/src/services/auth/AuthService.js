import http from "../../http-common";

const loginUser = id => {
  console.log("login User in service : " , id);
  return http.get(`/user/${id}`);
};

const registerUser = data => {
  console.log("register User in service : " , data);
  return http.post("/user", data);
};

const logoutUser = id => {
  console.log("logout User in service : " , id);
  return http.delete(`/user/${id}`);
};


const AuthService = {
 loginUser,
 registerUser,
 logoutUser
};

export default AuthService;