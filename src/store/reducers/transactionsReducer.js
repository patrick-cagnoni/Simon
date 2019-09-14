
import { isSameMonth, parseISO } from 'date-fns'

export const SELECT_TRANSACTION = "SELECT_TRANSACTION";
export const ADD_TRANSACTION = "ADD_TRANSACTION";
export const UPDATE_TRANSACTION = "UPDATE_TRANSACTION";
export const DELETE_TRANSACTION = "DELETE_TRANSACTION";
export const LOAD_TRANSACTIONS = "LOAD_TRANSACTIONS";
export const FILTER_TRANSACTIONS = "FILTER_TRANSACTIONS";

const initialState ={
    transactions: [],
    filteredTransactions: []
}

export default function transactionsReducer (state = initialState, action){
    switch(action.type){

        case ADD_TRANSACTION:
            return {...state, transactions: [...state.transactions, action.transaction]};

        case UPDATE_TRANSACTION:{

            let copyTransactions = [...state.transactions];
            const transaction = copyTransactions.find(t => t.id === action.transaction.id);
            const index = copyTransactions.indexOf(transaction);
            copyTransactions.splice(index, 1, action.transaction);
            return {...state, transactions: copyTransactions};
        }

        case DELETE_TRANSACTION:{

            const newTransactions = state.transactions.filter(t => t.id !== action.transactionId);
            return {...state, transactions: newTransactions};
        }

        case LOAD_TRANSACTIONS:
            return {...state, transactions:[...action.transactions]};

        case FILTER_TRANSACTIONS:{

            const filteredTransactions = state.transactions.filter(t => {
                const date1 = parseISO(t.date, 'yyyy-MM-dd', new Date());
                const date2 = action.date;

                return isSameMonth(date1, date2);
            });

            return {...state, filteredTransactions};
        }

        case SELECT_TRANSACTION:
            return {...state, selectedTransaction:action.transaction};
        
        default: 
            return state;
    }
}