import React, { Component } from 'react';
import axios from 'axios';

import './DatatableComponentStyles.css';

export default class DatatableComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: {},
            dataFiltered: {},
            currentPage: 1,
            pagination: [],
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
        this.refreshTableHandler();
    }

    refreshTableHandler = () => {
        axios.get(`http://localhost:8080/warehouse/items/all`)
            .then(res => {
                const data = res.data;
                const dataFiltered = res.data;
                let totalPages = Math.ceil(res.data.length / 8)
                let pagination = []
                for (let index = 1; index <= totalPages; index++) {
                    pagination[index] = [index];
                }

                this.setState({ 
                    data,
                    dataFiltered,
                    pagination,
                });
            })
    }

    searchHandler = (e) => {

        let dataFilter = [];
        let iterator = 0;

        this.state.data.map(item => (
            item.ref.includes(e.currentTarget.value.toUpperCase()) || item.ub.includes(e.currentTarget.value.toUpperCase())
            || (item.name.toUpperCase()).includes(e.currentTarget.value.toUpperCase()) ? 
                dataFilter[iterator++] = item : 
                null
        ))

        if (dataFilter.length > 0) {
            let totalPages = Math.ceil(dataFilter.length / 10)
            let pagination = []
            for (let index = 1; index <= totalPages; index++) {
                pagination[index] = [index];
            }
            this.setState({ 
                dataFiltered: dataFilter,
                pagination: pagination,
                currentPage: 1
            })
        } else {
            let totalPages = Math.ceil(this.state.data.length / 10)
            let pagination = []
            for (let index = 1; index <= totalPages; index++) {
                pagination[index] = [index];
            }
            this.setState({ 
                dataFiltered: this.state.data,
                pagination: pagination,
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

        axios.post(`http://localhost:8080/warehouse/items/create`, data)
        .then(res => {
            this.refreshTableHandler()
        }).catch(e => {
            console.log('Error: ' + e)
        })
    }

    deleteHandler = (e) => {
        //deleteItem(e.currentTarget.value, this.refreshTableHandler()) // Respuesta lenta

        let id = e.currentTarget.value;
        axios.delete(`http://localhost:8080/warehouse/items/item/delete/` + id)
        .then(res => {
            console.log('Item eliminado: ' + id)
            this.refreshTableHandler()
        }).catch(e => {
            console.log('Error: ' + e)
        })
    }
    
 
    render() {

        // console.log(this.state)

        if(this.state.dataFiltered.length > 0) {
            let items = this.state.dataFiltered.slice(((this.state.currentPage - 1) * 8), this.state.currentPage * 8); // Cortamos el JSon para la paginación

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
                { this.state.pagination.map((page) => (
                    parseInt(page) === parseInt(this.state.currentPage) ? 
                    <button className="active" key={page} onClick={() => this.pageHandler(page)}>{page}</button> :
                    <button key={page} onClick={() => this.pageHandler(page)}>{page}</button>
                ))}
               </div>
            )

            // Referencias de la caja
            let references = [];
            let i = -1;
 
            this.state.data.map(item => (
                references[i++] = item.ref
            ))

            let options = [...new Set(references)]

            return(
                
                <div className="table-responsive table-items">
                    <div>
                        <input type="text" name="search" placeholder="Buscar" onChange={(e) => this.searchHandler(e)}/>
                        <p>Resultado: {this.state.dataFiltered.length}</p>
                    </div>
                    <table className="table table-hover">
                        <thead>
                            <tr className="data-items">
                                <th>
                                    <select name="ref" onChange={ this.changeRefHandler }>
                                        {options.map(option => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </th>
                                <th>
                                    <input type="text" value={this.state.ub} readOnly/>
                                </th>
                                <th><input name="name"        type="text" className="item" onChange={ this.changeNewData } /></th>
                                <th><input name="brand"       type="text"  onChange={ this.changeNewData } /></th>
                                <th><input name="color"       type="text"  onChange={ this.changeNewData } /></th>
                                <th><input name="description" type="text"  onChange={ this.changeNewData } /></th>
                                <th><input name="amount"      type="text"  onChange={ this.changeNewData } /></th>
                                <th><input type="button"      className="add-button" value="Nuevo" onClick={ this.newItemSendHandler}/></th>
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
        }
        return <div className="no-content"><p>No hay contenido que mostrar</p></div>;
    }
}