import axios from "axios";
const PROTOCOL = "http://";
const BASE_URL = "192.168.101.2";
const PORT = "5116";
const PATH = PROTOCOL + BASE_URL + ":" + PORT;

const createUser = (payload) => {
  return new Promise((resolve, reject) => {
    let dataPayload = {
      struct: "user",
      data: {
        userName: payload.userName,
        email: payload.email,
        password: payload.password,
        mongoId: "6125aec10506fa59a674f56a",
      },
    };

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: PATH + "/api/v1/user/create",
      headers: {
        "Content-Type": "application/json",
      },
      data: dataPayload,
    };

    axios
      .request(config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const authUser = (username, password) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: PATH + "/api/v1/login",
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        username,
        password,
      },
    };

    axios(config)
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const AuthApi = {
  createUser,
  authUser,
};

export default AuthApi;
