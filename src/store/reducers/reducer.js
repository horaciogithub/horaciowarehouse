import * as Actions from '../actions';

const initialState = {
    data: []
}

const reducer = (state = initialState, action) => {
    
    switch (action.type) {
        case  Actions.LOAD_DATA_TYPE:
            return {...state, data: action.data }
        
        default:
            return state 
    }
       
}

export default reducer;