import React, { useState, useEffect } from 'react';
import { getData, updateItem, createItem, deleteItem, createFromFile } from '../utils/itemsRequests';
import FileReader from './fileReader/FileReader';
import SelectControl from './commons/SelectControl';
import Table from './commons/Table';

import '../styles/Items.css';

const  Items  = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const columns = [
        { title: "Ref", field: "ref",editComponent:props => (
            <SelectControl data={data} change={props.onChange} reference='ref'/>
          ) },
        { title: "Ub", field: "ub", editable: "never" },
        { title: "Item", field: "name" },
        { title: "Marca", field: "brand" },
        { title: "Color", field: "color" },
        { title: "Cantidad", field: "amount" },
        { title: "Descripción", field: "description" }
      ];

    useEffect(() => {
       if(loading)  getData(setData);
    }, [loading])

    const createHandler = (data) => {
        createItem(data, setLoading)
    }

    const updateHandler = (data) => {
        updateItem(data, setLoading)
    }

    const deleteHandler = (id) => {
        deleteItem(id, setLoading)
    }

    return(
        <div>
            <div className="file-control">
                <FileReader onCreate = { () => createFromFile(setLoading) } />
            </div>
            {data !== undefined ? (
                <Table 
                    title="Items"
                    data={data} 
                    columns={columns}
                    create={createHandler}
                    update={updateHandler}
                    delete={deleteHandler}/>
            ) : null}  
        </div>
        );
    }
   
export default Items;