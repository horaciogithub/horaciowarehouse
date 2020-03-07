import React, { Component } from 'react';

import './DatatableComponentStyles.css';

export default class DatatableComponent extends Component {

    render() {

        if(this.props.dataFiltered.length > 0) {
            let items = this.props.dataFiltered.slice(((this.props.currentPage - 1) * 8), this.props.currentPage * 8); // Cortamos el JSon para la paginación

            const rows = items.map(item => (
                <tr key={item.id}>
                    <td>{item.ref}</td>
                    <td>{item.ub}</td>
                    <td>{item.name}</td>
                    <td>{item.brand}</td>
                    <td>{item.color}</td>
                    <td>{item.description}</td>
                    <td>{item.amount}</td>
                    <td>
                        <button value={item.id} onClick={ this.deleteHandler }>Eliminar</button>
                    </td>
                </tr>
            ))

            // Botones de paginación
            const paginationBtns = (
               <div className="pagination-bar">
                { this.props.pagination.map((page) => (
                    parseInt(page) === parseInt(this.props.currentPage) ? 
                    <button className="active" key={page} onClick={() => this.props.pageHandler(page)}>{page}</button> :
                    <button key={page} onClick={() => this.props.pageHandler(page)}>{page}</button>
                ))}
               </div>
            )

            // Referencias de la caja
            let references = [];
            let i = -1;
 
            this.props.data.map(item => (
                references[i++] = item.ref
            ))

            let options = [...new Set(references)]

            return(
                <div className="table-responsive table-items">
                    <div>
                        <input type="text" name="search" placeholder="Buscar" onChange={(e) => this.props.searchHandler(e)}/>
                        <p>Resultado: {this.props.dataFiltered.length}</p>
                    </div>
                    <table className="table table-hover">
                        <thead>
                            <tr className="data-items">
                                <th>
                                    <select name="ref" onChange={ this.props.changeRefHandler }>
                                        {options.map(option => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </th>
                                <th>
                                    <input type="text" value={this.props.ub} readOnly/>
                                </th>
                                <th><input name="name"        type="text" className="item" onChange={ this.props.changeNewData } /></th>
                                <th><input name="brand"       type="text"  onChange={ this.props.changeNewData } /></th>
                                <th><input name="color"       type="text"  onChange={ this.props.changeNewData } /></th>
                                <th><input name="description" type="text"  onChange={ this.props.changeNewData } /></th>
                                <th><input name="amount"      type="text"  onChange={ this.props.changeNewData } /></th>
                                <th><input type="button"      className="add-button" value="Nuevo" onClick={ this.props.newItemSendHandler}/></th>
                            </tr>
                            <tr>
                                <th>Ref</th>
                                <th>Ub</th>
                                <th>Item</th>
                                <th>Marca</th>
                                <th>Color</th>
                                <th>Descripcion</th>
                                <th>Cantidad</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            { rows }
                        </tbody>
                    </table>
                    {paginationBtns}
                </div>
            )
        } else {
            return <div className="no-content"><p>No hay contenido que mostrar</p></div>;
        }
    }
}