import axios from 'axios';
import * as Actions from '../store/actions';;

export const loadData = ()  => {
    return (dispatch) => {
        axios.get('http://localhost:8080/warehouse/items/all')
        .then((response) => {
            dispatch( { type: Actions.LOAD_DATA_TYPE, data: response.data } ) 
        })
    }
}
    