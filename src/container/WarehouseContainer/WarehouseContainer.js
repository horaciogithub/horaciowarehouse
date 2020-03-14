import React, { Component } from 'react';
import { connect } from "react-redux";
import * as Functions from '../../events/loadData';

import {
    GET_ITEMS_URI,
    CREATE_ITEM_URI,
    DELETE_ITEM_URI,
    CREATE_ITEMS_MASSIVE_URI,
    CREATE_BOX_URI
} from '../../constants/pathconstants'

import axios from 'axios';

import FileReaderComponent from '../../component/fileReaderComponent/FileReaderComponent';
import DatatableComponent from '../../component/datatableComponent/DatatableComponent';

class WarehouseContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataFiltered: {},
            currentPage: 1,
            pagination: 0,
            search: '',
            
            "amount":0,
            "brand": "",
            "name": "",
            "color": "",
            "description": "",
            "box": {
                "ref": "",
            },

            "ub": "E1",
        }
    }

    componentDidMount() {
        this.props.loadData();
        this.refreshTableHandler();
    }

    refreshTableHandler = () => {
        axios.get(GET_ITEMS_URI)
            .then(res => {
                const dataFiltered = res.data;
                let totalPages = Math.ceil(res.data.length / 8)

                this.setState({ 
                    dataFiltered,
                    pagination: totalPages,
                });
            })
    }

    searchHandler = (e) => {

        let dataFilter = [];
        let iterator = 0;

        this.props.data.map(item => (
            item.ref.includes(e.currentTarget.value.toUpperCase()) || item.ub.includes(e.currentTarget.value.toUpperCase())
            || (item.name.toUpperCase()).includes(e.currentTarget.value.toUpperCase()) ? 
                dataFilter[iterator++] = item : 
                null
        ))

        if (dataFilter.length > 0) {
            let totalPages = Math.ceil(dataFilter.length / 10)
            this.setState({ 
                dataFiltered: dataFilter,
                pagination: totalPages,
                currentPage: 1
            })
        } else {
            let totalPages = Math.ceil(this.state.data.length / 10)
            this.setState({ 
                dataFiltered: this.state.data,
                pagination: totalPages,
                currentPage: 1
            })
        }
    }

    pageHandler = (page) => { this.setState({  currentPage: page }) }

    changeNewData = (e) => {
        this.setState({ [e.target.name] : e.target.value });
    }

    changeRefHandler = (e) => {

        let ub = this.state.ub;

        this.state.data.map(item => (
            item.ref === e.target.value ? ub = item.ub : null
        ))

        this.setState({ 
           box: {
            [e.target.name] : e.target.value
           },
            "ub": ub 
        });
    }

    newItemSendHandler = () => {
        let data = { 
            "amount": this.state.amount,
            "brand": this.state.brand,
            "name": this.state.name,
            "color": this.state.color,
            "description": this.state.description,
            "box": {
                "ref": this.state.box.ref,
            },
        }

        axios.post(CREATE_ITEM_URI, data)
        .then(res => {
            this.refreshTableHandler()
        }).catch(e => {
            console.log('Error: ' + e)
        })
    }

    deleteHandler = (e) => {
        console.log(e)
        let id = e.currentTarget.value;
        axios.delete(DELETE_ITEM_URI + id)
        .then(res => {
            console.log('Item eliminado: ' + id)
            this.refreshTableHandler()
        }).catch(e => {
            console.log('Error: ' + e)
        })
    }

    showFileHandler = () => {
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
               }
            } 
            reader.readAsText(file);
   
      } else {
         alert("Your browser is too old to support HTML5 File API");
      }
     this.refreshTableHandler()
    }

    render() {

        return(
            <div>
                <FileReaderComponent showFile = { this.showFileHandler } />    
                <DatatableComponent 
                    data               = { this.props.data         }
                    dataFiltered       = { this.state.dataFiltered }
                    currentPage        = { this.state.currentPage  }
                    ub                 = { this.state.ub           }
                    pagination         = { this.state.pagination   }
                    pageHandler        = { this.pageHandler        }
                    searchHandler      = { this.searchHandler      }
                    changeRefHandler   = { this.changeRefHandler   }
                    changeNewData      = { this.changeNewData      }
                    newItemSendHandler = { this.newItemSendHandler }
                    deleteHandler      = { this.deleteHandler      }
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      data: state.data,
      dataFiltered: state.data
    }
}
   
export default connect(mapStateToProps, Functions) (WarehouseContainer)