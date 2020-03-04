import axios from 'axios';

export function deleteItem(e, method) {
    axios.delete(`http://localhost:8080/warehouse/items/item/delete/` + e)
        .then(res => {
            console.log('Item eliminado: ' + e)
            method()
        }).catch(e => {
            console.log('Error: ' + e)
        })
}