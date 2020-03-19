import React from "react";

import Pagination from "../pagination/paginationComponent";

import "./DatatableComponentStyles.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import Modal from "../modal/ModalComponent";

const DatatableComponent = props => {
  if (props.dataFiltered.length > 0) {
    let items = props.dataFiltered.slice(
      (props.currentPage - 1) * 8,
      props.currentPage * 8
    ); // Cortamos el JSon para la paginación

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
          <button
            type="button"
            data-toggle="modal"
            data-target={"#modal" + item.id}
          >
            <FontAwesomeIcon icon={faEdit} color="black" />
          </button>
          <button
            className="button-delete"
            value={item.id}
            onClick={props.deleteHandler}
          >
            <FontAwesomeIcon icon={faTrashAlt} color="#d50000" />
          </button>
          <Modal
            id={item.id}
            reference={item.ref}
            ub={item.ub}
            name={item.name}
            brand={item.brand}
            color={item.color}
            description={item.description}
            amount={item.amount}
            loadData={props.loadData}
          />
        </td>
      </tr>
    ));

    // Referencias de la caja
    let references = [];
    let i = -1;

    props.data.map(item => (references[i++] = item.ref));

    let options = [...new Set(references)];

    return (
      <div className="table-responsive table-items">
        <div>
          <input
            type="text"
            name="search"
            placeholder="Buscar"
            onChange={e => props.searchHandler(e)}
          />
          <p>Resultado: {props.dataFiltered.length}</p>
        </div>
        <table className="table table-hover">
          <thead>
            <tr className="data-items">
              <th>
                <select name="ref" onChange={props.changeRefHandler}>
                  {options.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </th>
              <th>
                <input type="text" value={props.ub} readOnly />
              </th>
              <th>
                <input
                  name="name"
                  type="text"
                  className="item"
                  onChange={props.changeNewData}
                />
              </th>
              <th>
                <input
                  name="brand"
                  type="text"
                  onChange={props.changeNewData}
                />
              </th>
              <th>
                <input
                  name="color"
                  type="text"
                  onChange={props.changeNewData}
                />
              </th>
              <th>
                <input
                  name="description"
                  type="text"
                  onChange={props.changeNewData}
                />
              </th>
              <th>
                <input
                  name="amount"
                  type="text"
                  onChange={props.changeNewData}
                />
              </th>
              <th>
                <input
                  type="button"
                  className="add-button"
                  value="Nuevo"
                  onClick={props.newItemSendHandler}
                />
              </th>
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
          <tbody>{rows}</tbody>
        </table>
        <Pagination
          pages={props.pages}
          currentPage={props.currentPage}
          pageHandler={props.pageHandler}
          range={4}
        />
      </div>
    );
  } else {
    return (
      <div className="no-content">
        <p>No hay contenido que mostrar</p>
      </div>
    );
  }
};
export default DatatableComponent;
