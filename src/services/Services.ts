import axios from "axios";
import { getToken, SearchInputSchema } from "../components/utility/Helper";

const URL: string = `https://expertsdemo.com`;
// const URL: string = `http://localhost/dev/op_v4.0.2.2`;
// const URL: string = `http://localhost/dev`;

type FormValues = {
  name: string;
  description: string;
  address: string;
  contact: string;
  bed: string;
  bath: string;
  type: string;
  price: string;
  parking: boolean;
  furnished: boolean;
  offer: boolean;
  images: any[] | null;
  token: string;
};

export const newList = (data: FormValues) => {
  const token: string | null = getToken();
  return axios(`${URL}/index.php?route=extension/opencart/module/api.addList`, {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "content-type": "application/x-www-form-urlencoded",
      authorization: token,
    },
    data: data,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const fileUpload = (data: any) => {
  const token: string | null = getToken();
  return axios(`${URL}/index.php?route=extension/opencart/module/api.upload`, {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "content-type": "multipart/form-data",
      authorization: token,
    },
    data: data,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
export const getListing = () => {
  const token: string | null = getToken();
  return axios(
    `${URL}/index.php?route=extension/opencart/module/api.getListing&list=1`,
    {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "content-type": "multipart/form-data",
        authorization: token,
      },
    }
  )
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const getEditList = (id: any) => {
  const token: string | null = getToken();
  return axios(
    `${URL}/index.php?route=extension/opencart/module/api.getEditList&list=${id}`,
    {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "content-type": "multipart/form-data",
        authorization: token,
      },
    }
  )
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
export const updateList = (id: any, data: FormValues) => {
  const token: string | null = getToken();
  return axios(
    `${URL}/index.php?route=extension/opencart/module/api.updateList&list=${id}`,
    {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "content-type": "application/x-www-form-urlencoded",
        authorization: token,
      },
      data: data,
    }
  )
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
export const deleteList = (id: any) => {
  const token: string | null = getToken();
  return axios(
    `${URL}/index.php?route=extension/opencart/module/api.deleteList&list=${id}`,
    {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "content-type": "application/x-www-form-urlencoded",
        authorization: token,
      },
    }
  )
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const searchList = (data: SearchInputSchema) => {
  //const token: string | null = getToken();
  return axios(
    `${URL}/index.php?route=extension/opencart/module/api.getSearchList&search=new_list`,
    {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "content-type": "application/x-www-form-urlencoded",
        Authorization: "test",
      },
      data: data,
    }
  )
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
export const getListdetail = (id: any) => {
  const token: string | null = getToken();
  return axios(
    `${URL}/index.php?route=extension/opencart/module/api.getEditList&list=${id}`,
    {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "content-type": "multipart/form-data",
        authorization: token,
      },
    }
  )
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
export const getHomeList = () => {
  // const token: string | null = getToken();
  return axios(
    `${URL}/index.php?route=extension/opencart/module/api.homeList&list=search`,
    {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        authorization: "",
      },
    }
  )
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
