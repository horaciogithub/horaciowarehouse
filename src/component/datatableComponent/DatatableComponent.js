import React, { Component } from 'react';
import axios from 'axios';

export default class DatatableComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: {},
            dataFiltered: {},
            currentPage: 1,
            pagination: [],
            search: ''
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/warehouse/items/all`)
            .then(res => {
                const data = res.data;
                const dataFiltered = res.data;
                let totalPages = Math.ceil(res.data.length / 10)
                let pagination = []
                for (let index = 1; index <= totalPages; index++) {
                    pagination[index] = [index];
                }

                this.setState({ 
                    data,
                    dataFiltered,
                    pagination
                });
            })
    }

    // componentDidMount() {
       
    //             const data = this.props.items;
    //             const dataFiltered = this.props.items;
    //             let totalPages = Math.ceil(this.props.items.length / 10)
    //             let pagination = []
    //             for (let index = 1; index <= totalPages; index++) {
    //                 pagination[index] = [index];
    //             }

    //             this.setState({ 
    //                 data,
    //                 dataFiltered,
    //                 pagination
    //             });
    // }

    searchHandler = (e) => {

        let dataFilter = [];
        let iterator = 0;

        this.state.data.map(item => (
            item.ref.includes(e.currentTarget.value.toUpperCase()) || item.ub.includes(e.currentTarget.value.toUpperCase())? 
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
 
    render() {
        console.log(this.state.data)

        if(this.state.dataFiltered.length > 0) {
            let items = this.state.dataFiltered.slice(((this.state.currentPage - 1) * 10), this.state.currentPage * 10); // Cortamos el JSon para la paginación

            let key = 1;
            const rows = items.map(item => (
                <tr key={key++}>
                    <td>{item.ref}</td>
                    <td>{item.ub}</td>
                    <td>{item.name}</td>
                    <td>{item.brand}</td>
                    <td>{item.color}</td>
                    <td>{item.description}</td>
                    <td>{item.amount}</td>
                    <td><input type="checkbox" /></td>
                </tr>
            ))

            // Botones de paginación
            const paginationBtns = (
                this.state.pagination.map((page) => (
                    parseInt(page) === this.state.currentPage ? 
                    <button className="active" key={page} onClick={() => this.pageHandler(page)}>{page}</button> :
                    <button key={page} onClick={() => this.pageHandler(page)}>{page}</button>
                ))
            )

            return(
                <div className="table-responsive">
                    <div>
                        <input type="text" name="search" placeholder="Buscar" onChange={(e) => this.searchHandler(e)}/>
                    </div>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th><input type="text" /></th>
                                <th><input type="text" /></th>
                                <th><input type="text" className="item"/></th>
                                <th><input type="text" /></th>
                                <th><input type="text" /></th>
                                <th><input type="text" /></th>
                                <th><input type="text" /></th>
                                <th><input type="button" value="Nuevo"/></th>
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
        return null;
    }
}