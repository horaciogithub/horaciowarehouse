import axios from "axios";
import {
  GET_BOXES_URI,
  CREATE_BOX_URI,
  UPDATE_BOX_URI,
  DELETE_BOX_URI
} from "../constants/pathconstants";

export const getData = reload => {
  axios
    .get(GET_BOXES_URI)
    .then(response => {
      reload(response.data);
    })
    .catch(error => {
      console.log(error);
    });
};

export const createBox = (data, loading) => {
  loading(false);
  axios
    .post(CREATE_BOX_URI, data)
    .then(respose => {
      console.log(respose);
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      loading(true);
    });
};

export const updateBox = (data, loading) => {
  loading(false);
  axios
    .put(UPDATE_BOX_URI + data.id, data)
    .then(respose => {
      console.log(respose);
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      loading(true);
    });
};

export const deleteBox = (id, loading) => {
  loading(false);
  axios
    .delete(DELETE_BOX_URI + id)
    .then(respose => {
      console.log(respose);
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      loading(true);
    });
};
