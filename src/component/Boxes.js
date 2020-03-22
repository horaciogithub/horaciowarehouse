import React, { useState, useEffect } from "react";
import { getData, createBox, updateBox, deleteBox } from '../utils/boxesRequests';
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
    if(loading)  getData(setData);
  }, [loading]);

  const createHandler = (data) => {
    createBox(data, setLoading)
  }

  const updateHandler = (data) => {
    updateBox(data, setLoading)
  }

  const deleteHandler = (id) => {
    deleteBox(id, setLoading)
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