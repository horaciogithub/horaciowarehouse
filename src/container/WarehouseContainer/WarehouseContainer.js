import React, { Component } from 'react';
import { connect } from "react-redux";
import * as Functions from '../../events/loadData';

import axios from 'axios';

import FileReaderComponent from '../../component/fileReaderComponent/FileReaderComponent';
import DatatableComponent from '../../component/datatableComponent/DatatableComponent';

class WarehouseContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentPage: 1,
            pagination: [],
            search: '',
            file: '',
        }
    }

    componentDidMount() {
        this.props.loadData()
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

                                axios.post(`http://localhost:8080/warehouse/boxes/create`, boxJson)
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

                axios.post(`http://localhost:8080/warehouse/items/create/massive`, itemJson.reverse())
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
    }

    render() {
        
        let totalPages = Math.ceil(this.props.data.length / 10)
        let pages = []
        for (let index = 1; index <= totalPages; index++) {
            pages[index] = [index];
        }

        return(
            <div>
                <FileReaderComponent showFile={ this.showFileHandler }/>    
                <DatatableComponent 
                    items={ this.props.data }
                    itemsFiltered={ this.props.dataFiltered }
                    pages={ pages }
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