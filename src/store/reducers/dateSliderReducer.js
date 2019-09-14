
export const CHANGE_DATE = 'CHANGE_DATE';

const initialState = {
    date: new Date()

}

export default function(state = initialState, action){
    switch(action.type){

        case CHANGE_DATE: 
            return {...state, date: action.date};
        default: return state;
    }
}