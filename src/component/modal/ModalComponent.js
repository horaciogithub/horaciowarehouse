import React from 'react';

import './ModalComponentStyles.css';

const Modal = (props) => {
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
                                <div className="col-9">
                                    <input type="text" value={props.reference} onChange={() => props.changeField()}/>
                                </div>
                            </div>

                            <div className="d-flex col-12">
                                <label className="col-3">Ubicación: </label>
                                <div className="col-9">
                                    <input type="text" value={props.ub} onChange={() => props.changeField()}/><br/>
                                </div>
                            </div>

                            <div className="d-flex col-12">
                                <label className="col-3">Nombre: </label>
                                <div className="col-9">
                                    <input type="text" value={props.name} onChange={() => props.changeField()}/><br/>
                                </div>
                            </div>

                            <div className="d-flex col-12">
                                <label className="col-3">Marca: </label>
                                <div className="col-9">
                                    <input type="text" value={props.brand} onChange={() => props.changeField()}/><br/>
                                </div>
                            </div>

                            <div className="d-flex col-12">
                                <label className="col-3">Marca: </label>
                                <div className="col-9">
                                    <input type="text" value={props.brand} onChange={() => props.changeField()}/><br/>
                                </div>
                            </div>

                            <div className="d-flex col-12">
                                <label className="col-3">Color: </label>
                                <div className="col-9">
                                    <input type="text" value={props.color} onChange={() => props.changeField()}/><br/>
                                </div>
                            </div>

                            <div className="d-flex col-12">
                                <label className="col-3">Descripción: </label>
                                <div className="col-9">
                                    <input type="text" value={props.description} onChange={() => props.changeField()}/><br/>
                                </div>
                            </div>

                            <div className="d-flex col-12">
                                <label className="col-3">Cantidad: </label>
                                <div className="col-9">
                                    <input type="text" value={props.amount} onChange={() => props.changeField()}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="add-button" data-dismiss="modal" onClick={() => props.updateItem()}>Aceptar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal