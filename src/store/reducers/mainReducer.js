export const SET_USER = "SET_USER";

const initialState = {
    
}

export default function mainReducer ( state = initialState, action ){
        switch(action.type){

        case SET_USER:
            return {...state, user:action.user}
        default: return state;
    }
} 