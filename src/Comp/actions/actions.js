import axios from "axios";
export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";

export const fetchUsersRequest = (loading) => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};
export const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};
export const fetchUsersFailed = (error) => {
  return {
    type: FETCH_USERS_FAILED,
    payload: error,
  };
};
export const fetchUsers = () => async (dispatch) => {
  try {
    const res = await axios.get("https://reqres.in/api/users?page=2");
    dispatch({
      type: FETCH_USERS_SUCCESS,
      payload: res.data.data,
    });
  } catch (e) {
    dispatch({
      type: FETCH_USERS_FAILED,
      payload: console.log(e),
    });
  }
};
