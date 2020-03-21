import React from 'react';
import MaterialTable from 'material-table';

const Table = (props) => {
    return (
        <MaterialTable
          title={props.title}
          columns={props.columns}
          data={props.data}
          editable={{
            onRowAdd: newData =>
              new Promise(resolve => {
                setTimeout(() => {
                  props.create(newData);
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  {
                    const index = props.data.indexOf(oldData);
                    props.data[index] = newData;
                    props.update(newData);
                  }
                  resolve();
                }, 1000);
              }),
            onRowDelete: oldData =>
              new Promise((resolve) => {
                setTimeout(() => {
                  props.delete(oldData.id);
                  resolve();
                }, 1000);
              })
          }}
        />
    )
}

export default Table;