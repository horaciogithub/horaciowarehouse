import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    GET_ITEMS_URI,
    CREATE_ITEM_URI,
    UPDATE_ITEM_URI,
    DELETE_ITEM_URI,
    CREATE_ITEMS_MASSIVE_URI,
    CREATE_BOX_URI
} from '../constants/pathconstants'
import FileReaderComponent from './fileReaderComponent/FileReaderComponent';
import SelectComponent from './commons/SelectControl';
import Table from './commons/Table';
import './Items.css';

const  Items  = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const columns = [
        { title: "Ref", field: "ref",editComponent:props => (
            <SelectComponent data={data} change={props.onChange} reference='ref'/>
          ) },
        { title: "Ub", field: "ub", editable: "never" },
        { title: "Item", field: "name" },
        { title: "Marca", field: "brand" },
        { title: "Color", field: "color" },
        { title: "Cantidad", field: "amount" },
        { title: "Descripción", field: "description" }
      ];

    useEffect(() => {
       if(loading)  getData();
    }, [loading])

    const getData = () => {
        axios.get(GET_ITEMS_URI)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.log(error)
            })
    }

    const createHandler = (data) => {
        setLoading(false)
        axios.post(CREATE_ITEM_URI, data)
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
        axios.put(UPDATE_ITEM_URI + data.id, data)
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
        axios.delete(DELETE_ITEM_URI + id)
        .then(respose => {
            console.log(respose);
          })
          .catch(error => {
            console.log(error);
          }).finally(() => {
            setLoading(true)
        });
    }

    const showFileHandler = () => {
        setLoading(false)
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            var file = document.querySelector('input[type=file]').files[0];
            var reader = new FileReader()
   
            var textFile = /text.*/;
   
            if (file.type.match(textFile)) {
               reader.onload = function (event) {
                  let fileContent = event.target.result;
                  let boxes = fileContent.split('*');
                  let items = [];
                  

                  for (let i = 0; i < boxes.length; i++) {
                        items[i] = boxes[i].split('+');
                  }
                  
                  let boxJson = [];
                  let itemJson = [];
                  let ref = '';
                  let count = 0;

                  for (let i = 0; i < items.length; i++) {

                      for (let j = 0; j < items[i].length; j++) {
                         
                        if (j === 0) { // Extrae los datos de la caja
                            let position = items[i][j].split('|');
                            let ub = '';
                            let desc = '';

                           if(items[i][j].length > 0) {
                                if (position.length < 3) {
                                    ref = position[0].replace("\n", '').split(':')[1].trim();
                                    ub  = position[1].replace("\n", '').split(':')[1].trim();
                                } else {
                                    ref  = position[0].replace("\n", '').split(':')[1].trim();
                                    ub   = position[1].replace("\n", '').split(':')[1].trim();
                                    desc = position[2].replace("\n", '').split(':')[1].trim();
                                }

                                boxJson = {
                                        ref: ref,
                                        ub: ub,
                                        desc: desc
                                    }

                                axios.post(CREATE_BOX_URI, boxJson)
                                    .then(res => {
                                       console.log("-> Se han creado las cajas")
                                    }).catch(e => {
                                        console.log('Error: ' + e)
                                })
                           } 

                        } else {
                            let brand  = '';
                            let name   = '';
                            let amount = '';
                            let color  = '';
                            let desc   = '';

                            if(items[i][j].length > 0) {
                                let item = items[i][j].split(',');
                                
                                amount = item[0] !== undefined && item[0].includes("\n") ? item[0].replace("\n", '')[1]     : item[0];
                                brand  = item[1] !== undefined && item[1].includes("\n") ? item[1].replace("\n", '')[1].trim()     : item[1];
                                name   = item[2] !== undefined && item[2].includes("\n") ? item[2].replace("\n", '')[1].trim()     : item[2];
                                color  = item[3] !== undefined && item[3].includes("\n") ? item[3].replace("\n", '')[1]     : item[3];
                                desc   = item[4] !== undefined && item[4].includes("\n") ? item[4].replace("\n", '').trim() : item[4];
                            }

                            itemJson[count] = {
                                    box: {ref: ref},
                                    brand: brand,
                                    name: name,
                                    amount: parseInt(amount),
                                    color: color,
                                    description: desc
                            }

                            count++;
                        }
                    }
                }

                axios.post(CREATE_ITEMS_MASSIVE_URI, itemJson)
                    .then(res => {
                        console.log("-> Se han creado los items")
                    }).catch(e => {
                        console.log('Error: ' + e)
                    })
                    .finally(() => {
                        setLoading(true)
                    })
               }
            } 
            reader.readAsText(file);
   
      } else {
         alert("Your browser is too old to support HTML5 File API");
      }
    }

    return(
        <div>
            <div className="file-control">
                <FileReaderComponent showFile = { showFileHandler } />
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