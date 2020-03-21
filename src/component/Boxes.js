import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  GET_BOXES_URI,
  CREATE_BOX_URI,
  UPDATE_BOX_URI,
  DELETE_BOX_URI
} from "../constants/pathconstants";
import Table from './commons/Table';

const Boxes = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const columns = [
    { title: "Referencia", field: "ref" },
    { title: "Ubicación", field: "ub" },
    { title: "Descripción", field: "description" }
  ];

  useEffect(() => {
    if(loading)  getData();
  }, [loading]);

  const getData = () => {
    axios.get(GET_BOXES_URI)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const createHandler = (data) => {
    setLoading(false)
    axios.post(CREATE_BOX_URI, data)
    .then(respose => {
      console.log(respose);
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
        setLoading(true)
    });
  }

  const updateHandler = (data) => {
    setLoading(false)
    axios.put(UPDATE_BOX_URI + data.id, data)
    .then(respose => {
      console.log(respose);
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
        setLoading(true)
    });
  }

  const deleteHandler = (id) => {
    setLoading(false)
    axios
    .delete(DELETE_BOX_URI + id)
    .then(respose => {
      console.log(respose);
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
        setLoading(true)
    });
  }

  return (
    <div>
      {data !== undefined ? (
        <Table 
            title="Cajas"
            data={data} 
            columns={columns}
            create={createHandler}
            update={updateHandler}
            delete={deleteHandler}/>
      ) : null}
    </div>
  );
};

export default Boxes;
