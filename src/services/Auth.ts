import axios from "axios";

const URL: string = `https://expertsdemo.com`;

type FormValues = {
  name: string;
  password: string;
  confirmPassword: string;
  email: string;
};

type LoginType = {
  password: string;
  email: string;
};

export const signupUser = (payload: FormValues) => {
  return axios(`${URL}/index.php?route=extension/opencart/module/api.signup`, {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "content-type": "application/x-www-form-urlencoded",
    },
    data: payload,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const loginUser = (payload: LoginType) => {
  return axios(`${URL}/index.php?route=extension/opencart/module/api.login`, {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "content-type": "application/x-www-form-urlencoded",
    },
    data: payload,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
