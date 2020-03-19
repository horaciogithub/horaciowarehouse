import React, { useState, useEffect } from 'react';

import {
    GET_ITEMS_URI,
    CREATE_ITEM_URI,
    DELETE_ITEM_URI,
    CREATE_ITEMS_MASSIVE_URI,
    CREATE_BOX_URI
} from '../constants/pathconstants'

import axios from 'axios';

import FileReaderComponent from './fileReaderComponent/FileReaderComponent';
import DatatableComponent from './datatableComponent/DatatableComponent';

const  WarehouseContainer  = () => {

    const [data, setData] = useState({}); // TODO: unificar estados
    const [dataFiltered, setDataFiltered] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const [amount, setAmount] = useState();
    const [brand, setBrand] = useState('');
    const [name, setName] = useState('');
    const [color, setColor] = useState('');
    const [description, setDescription] = useState('');
    const [ub, setUbication] = useState('');
    const [box, setBox] = useState({});

    const [loadData, setloadData] = useState();

    useEffect(() => {
        refreshTable();
        if(loadData) {
            refreshTable();
        }
    }, [loadData])

    const refreshTable = () => {
        axios.get(GET_ITEMS_URI)
            .then(response => {
                return response.data;
            })
            .then(responseData => {
                setData(responseData)
                setDataFiltered(responseData)
                setTotalPages(Math.ceil(responseData.length / 8))
            }).catch(error => {
                console.log(error)
            })
    }

    const searchHandler = (e) => {
        let dataFilter = [];
        let iterator = 0;

        data.map(item => (
            item.ref.includes(e.currentTarget.value.toUpperCase()) || item.ub.includes(e.currentTarget.value.toUpperCase())
            || (item.name.toUpperCase()).includes(e.currentTarget.value.toUpperCase()) ? 
                dataFilter[iterator++] = item : 
                null
        ))

        if (dataFilter.length > 0) {
            setDataFiltered(dataFilter)
            setTotalPages(Math.ceil(dataFilter.length / 10))
        } else {
            setDataFiltered(data)
        }
    }

    const pageHandler = (page) => { setCurrentPage(page) }

    const changeInputValue = (e) => {
        switch(e.target.name) {
            case 'name':
                return setName(e.target.value);
            case 'brand':
                return setBrand(e.target.value);
            case 'amount':
                return setAmount(e.target.value);
            case 'color':
                return setColor(e.target.value);
            case 'description':
                return setDescription(e.target.value);
            default: 
                return null;
        }
    }

    const changeRefHandler = (e) => {
        data.map(item => (
            item.ref === e.target.value ? setUbication(item.ub) : null
        ))
        setBox({ ref : e.target.value })
    }

    const newItemSendHandler = () => {
        let data = { 
            "amount": amount,
            "brand": brand,
            "name": name,
            "color": color,
            "description": description,
            "box": {
                "ref": box.ref,
            },
        }

        axios.post(CREATE_ITEM_URI, data)
        .then(res => {
            setloadData(Math.random())
        }).catch(e => {
            console.log('Error: ' + e)
        })
    }

    const deleteHandler = (e) => {

        let id = e.currentTarget.value;

        axios.delete(DELETE_ITEM_URI + id)
        .then(res => {
            setloadData(Math.random())
            console.log('Item eliminado: ' + id)
        }).catch(e => {
            console.log('Error: ' + e)
        })
        refreshTable();
    }

    const showFileHandler = () => {
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
                        setloadData(Math.random())
                        console.log("-> Se han creado los items")
                    }).catch(e => {
                        console.log('Error: ' + e)
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
            <FileReaderComponent showFile = { showFileHandler } />    
            <DatatableComponent 
                data               = { data         !== null ? data         : [] }
                dataFiltered       = { dataFiltered !== null ? dataFiltered : [] }
                currentPage        = { currentPage        }
                ub                 = { ub                 }
                pages              = { totalPages         }
                pageHandler        = { pageHandler        }
                searchHandler      = { searchHandler      }
                changeRefHandler   = { changeRefHandler   }
                changeNewData      = { changeInputValue   }
                newItemSendHandler = { newItemSendHandler }
                deleteHandler      = { deleteHandler      }
                loadData           = { setloadData        }
            />
        </div>
        );
    }
   
export default WarehouseContainer;