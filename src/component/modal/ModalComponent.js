import React, { useState } from 'react';
import axios from 'axios';
import { UPDATE_ITEM_URI } from '../../constants/pathconstants';

import './ModalComponentStyles.css';
import { useEffect } from 'react';

import SelectControl from '../commons/SelectControl';

const Modal = (props) => {
    const [data, setData] = useState({});
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        if(edit === false) {
            setData({
                name: props.name,
                brand: props.brand,
                color: props.color,
                amount: props.amount,
                description: props.description,
                ref: props.reference
            });
        }
    }, [props, edit])

    const changeField = e => {

        setEdit(true) // Habilita modo edición

        switch(e.target.name) {
            case 'name':
                setData({...data, name: e.target.value});
                break;
            case 'brand':
                setData({...data, brand: e.target.value});
                break;
            case 'color':
                setData({...data, color: e.target.value});
                break;
            case 'amount':
                setData({...data, amount: e.target.value});
                break;
            case 'description':
                setData({...data, description: e.target.value});
                break;
            case 'ref':
                setData({...data, ref: e.target.value});
                break;
            default: return null;
        }
    }

    const updateItem = (id) => {
        axios.put(UPDATE_ITEM_URI + id, data)
            .then(response => {
                console.log("Se ha actualizado el item: " + id)
                props.loadData(Math.random())
            })
            .catch(error => {
                console.log(error)
            })
    }

    return(
        <div className="modal fade" id={"modal"+props.id} >
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h4 className="modal-title">{props.name + ' ' + props.brand}</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>

                    <div className="modal-body">
                        <div className="modal-body">
                           
                            <div className="d-flex col-12">
                                <label className="col-3">Referencia: </label>
                                <SelectControl 
                                    options={props.options} 
                                    reference={data.ref ? data.ref: ''}
                                    changeField={ changeField }/>
                            </div>

                            <div className="d-flex col-12">
                                <label className="col-3">Nombre: </label>
                                <div className="col-9">
                                    <input type="text" value={edit ? data.name : props.name} name="name" onChange={(e) => changeField(e)}/><br/>
                                </div>
                            </div>

                            <div className="d-flex col-12">
                                <label className="col-3">Marca: </label>
                                <div className="col-9">
                                    <input type="text" value={edit ? data.brand : props.brand} name="brand" onChange={(e) => changeField(e)}/><br/>
                                </div>
                            </div>

                            <div className="d-flex col-12">
                                <label className="col-3">Color: </label>
                                <div className="col-9">
                                    <input type="text" value={edit ? data.color : props.color} name="color" onChange={(e) => changeField(e)}/><br/>
                                </div>
                            </div>

                            <div className="d-flex col-12">
                                <label className="col-3">Descripción: </label>
                                <div className="col-9">
                                    <input type="text" value={edit ? data.description : props.description} name="description" onChange={(e) => changeField(e)}/><br/>
                                </div>
                            </div>

                            <div className="d-flex col-12">
                                <label className="col-3">Cantidad: </label>
                                <div className="col-9">
                                    <input type="text" value={edit ? data.amount : props.amount} name="amount" onChange={(e) => changeField(e)}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="add-button" data-dismiss="modal" onClick={() => updateItem(props.id)}>Aceptar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal