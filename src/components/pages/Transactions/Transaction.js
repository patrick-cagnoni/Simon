import React, {useState} from 'react';
import { connect } from 'react-redux';

import { ADD_TRANSACTION, DELETE_TRANSACTION, UPDATE_TRANSACTION } from '../../../store/reducers/transactionsReducer';

import { categoriesOpt, typeOpt } from '../../../config/transactions';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

const Transaction = props => {

    const {  addTransaction, transaction } = props;
    const action = 'new';

    const initialState = (() => {
        if(action === 'new'){
            return {
                date: Date.now(),
                type: 'Expense',
                category: categoriesOpt.expense[0],
                notes: "",
                amount: 0
            }
        }
        else {
            return {
                date: transaction.date,
                type: transaction.type,
                category: transaction.category,
                notes: transaction.notes,
                amount: transaction.amount
            }
        }

    })()

    const [date, setDate] = useState(initialState.date);
    const [type, setType] = useState(initialState.type);
    const [category, setCategory] = useState(initialState.category);
    const [notes, setNotes] = useState(initialState.notes);
    const [amount, setAmount] = useState(initialState.amount);

    function handleAddTransaction(e){
        e.preventDefault();
        const newTransaction = {
            date,
            type,
            category,
            notes,
            amount
        }
        addTransaction(newTransaction);
        reset();
    }  
    
    function changeAmount(value){
        if(value){

            value = value.replace(/^0+/, '');
            setAmount(value);
        }
        else {
            setAmount(0);
        }
    } 

    function changeDate(value){
        if(value){
            setDate(value.getTime())
        }
        else {
            setDate(Date.now());
        }
    }

    function reset(){
        setDate(initialState.date);
        setType(initialState.type);
        setCategory(initialState.category);
        setNotes(initialState.notes);
        setAmount(initialState.amount);
    }

    return ( 
        <div className="transaction-new">
            <h1 className="page-title">New Transaction</h1>
            <form className="transaction-form">

                <div className="transaction-type-wrapper">
                    <div 
                    className={`transaction-type type-expense ${type==='Expense'? 'selected' : null}`}
                    onClick={() => setType('Expense')}
                    >Expense
                    </div>
                    <div 
                    className={`transaction-type type-income ${type==='Income'? 'selected': null}`}
                    onClick={() => setType('Income')}
                    >Income</div>
                </div>

                <div className="form-grid">
                    <span>Date</span>

                    <DatePicker 
                    selected={new Date(date)}
                    onChange={date => changeDate(date)}
                    className="form-control"
                    />

                    <span>Category</span>

                    <select 
                    onChange={e => setCategory(e.target.value)} 
                    className="select-category form-control"
                    value={category}>
                        {categoriesOpt[type.toLowerCase()].map(cat =>(
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>

                    <span>Notes</span>

                    <textarea
                        rows="2" 
                        className="textarea-notes form-control"
                        onChange={e => setNotes(e.target.value)}  
                        value={notes}
                        maxLength="255"
                    />

                    <span>Amount</span>

                    <input 
                        type="number" 
                        value={amount} 
                        className="input-amount form-control" 
                        maxLength="9"
                        onChange={e => changeAmount(e.target.value > 0? e.target.value: 0)}
                        />

                    <button 
                        className="transaction-form-btn btn btn-primary" 
                        onClick={handleAddTransaction} 
                        disabled={(!date || !amount)}>
                            Save
                    </button>
                </div>


            </form>
        </div>
     );
}
 
const mapDispatchToProps = dispatch => {
    return {

        addTransaction: transaction => {
            const action ={
                type: ADD_TRANSACTION,
                transaction
            } 
            dispatch(action)
        },

        deleteTransaction: transactionId => {
            const action ={
                type: DELETE_TRANSACTION,
                transactionId
            } 
            dispatch(action)
        },

        updateTransaction: transaction => {
            const action ={
                type: UPDATE_TRANSACTION,
                transaction
            } 
            dispatch(action)
        },
    }
}

export default connect(null, mapDispatchToProps)(Transaction);