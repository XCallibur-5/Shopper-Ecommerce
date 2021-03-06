import {loginStart,loginSuccess,loginFailure,logoutStart,logoutSuccess} from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";

export const login = async (dispatch, user) => {

  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(loginFailure(null));
  }
};

export const logout = async (dispatch, user) => {

  dispatch(logoutStart());
  try {
    const res = await userRequest.post("/auth/logout", user);
    console.log(res);
    dispatch(logoutSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};