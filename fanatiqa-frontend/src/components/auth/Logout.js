import axios from "axios";

const LogOutAuthAction = (history) => {
    return async (dispatch) => {
      try {
        const res = await axios.get("/logout");
        const { data } = res;
        dispatch({
          payload: data.message,
        });
        history.push("/login");
      } catch (error) {
        if (error.response) {
          dispatch({
            payload: error.response.data.message,
          });
        }
      }
    };
  };
  
  export {
    LogOutAuthAction,
  };