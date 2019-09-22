
import { isSameMonth, parseISO, isSameDay } from 'date-fns'

export const SELECT_TRANSACTION = "SELECT_TRANSACTION";
export const ADD_TRANSACTION = "ADD_TRANSACTION";
export const UPDATE_TRANSACTION = "UPDATE_TRANSACTION";
export const DELETE_TRANSACTION = "DELETE_TRANSACTION";
export const LOAD_TRANSACTIONS = "LOAD_TRANSACTIONS";
export const FILTER_TRANSACTIONS = "FILTER_TRANSACTIONS";

const initialState ={
    transactions: [],
    filteredTransactions: [],
    transactionsByDay: []
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
                const date1 = new Date(t.date)
                const date2 = action.date;

                return isSameMonth(date1, date2);
            });

            let transactionsByDay= [];
            filteredTransactions.map(t => {
                let sameDayTransaction =  transactionsByDay.find(dt => isSameDay(new Date(dt.date), new Date(t.date)));
                if(transactionsByDay.length === 0 || !sameDayTransaction ){
                    let dayTransaction = {list:[]};
                    dayTransaction.date = t.date
                    dayTransaction.totalIncome = t.type === 'Income'? t.amount: 0;
                    dayTransaction.totalExpense = t.type === 'Expense'? t.amount: 0;
                    dayTransaction.list.push(t);
                    transactionsByDay.push(dayTransaction);
                }
                else {
                    let index = transactionsByDay.indexOf(sameDayTransaction);
                    transactionsByDay[index].list.push(t);
                    if(t.type === 'Income'){

                        transactionsByDay[index].totalIncome = parseFloat(transactionsByDay[index].totalIncome) + parseFloat(t.amount);
                    }
                    else {
                        transactionsByDay[index].totalExpense = parseFloat(transactionsByDay[index].totalExpense) + parseFloat(t.amount);

                    }
                }
            })
            transactionsByDay.sort((a,b) => {
                if(a.date > b.date) return -1;
                else return 1;
            })

            return {...state, transactionsByDay};
        }

        case SELECT_TRANSACTION:
            return {...state, selectedTransaction:action.transaction};
        
        default: 
            return state;
    }
}