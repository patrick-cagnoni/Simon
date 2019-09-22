import React, {useState} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'; 
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import * as uniqid from 'uniqid';

import { ADD_TRANSACTION } from '../../../store/reducers/transactionsReducer';
import { categoriesOpt } from '../../../config/transactions';

const NewTransaction = props => {

    const { addTransaction, history } = props;

    const initialState = {
        date: Date.now(),
        type: 'Expense',
        category: categoriesOpt.expense[0],
        notes: "",
        amount: 0
    }
    
    const [date, setDate] = useState(initialState.date);
    const [type, setType] = useState(initialState.type);
    const [category, setCategory] = useState(initialState.category);
    const [notes, setNotes] = useState(initialState.notes);
    const [amount, setAmount] = useState(initialState.amount);

    function handleAddTransaction(){

        const newTransaction = {
            id: uniqid(),
            date,
            type,
            category,
            notes,
            amount
        }

        addTransaction(newTransaction);
        history.push('/transactions');
    }  
    
    function changeAmount(value){

        if(value){

            value = value.replace(/^0+/, '');
            setAmount(value);
        }

        else {
            setAmount("");
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

    function handleTypeClick(type){
        setType(type);
        setCategory(categoriesOpt[type.toLowerCase()][0]);
    }

    return ( 
        <div className="transaction-new">
            <h1 className="page-title">New Transaction</h1>
            <form className="transaction-form">

                <div className="transaction-form-type-wrapper">
                    <div 
                    className={`transaction-form-type transaction-form-type-expense ${type==='Expense'? 'selected' : null}`}
                    onClick={() => handleTypeClick('Expense')}
                    >Expense
                    </div>
                    <div 
                    className={`transaction-form-type transaction-form-type-income ${type==='Income'? 'selected': null}`}
                    onClick={() => handleTypeClick('Income')}
                    >Income</div>
                </div>

                <div className="transaction-form-grid">
                    <span>Date</span>

                    <DatePicker 
                    selected={new Date(date)}
                    onChange={date => changeDate(date)}
                    className="form-control"
                    />

                    <span>Category</span>

                    <select 
                    onChange={e => setCategory(e.target.value)} 
                    className="form-control"
                    value={category}>
                        {categoriesOpt[type.toLowerCase()].map(cat =>(
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>

                    <span>Notes</span>

                    <textarea
                        rows="2" 
                        className="form-control"
                        onChange={e => setNotes(e.target.value)}  
                        value={notes}
                        maxLength="255"
                    />

                    <span>Amount</span>

                    <input 
                        type="number" 
                        value={amount} 
                        className="form-control" 
                        maxLength="9"
                        onClick={(e) => e.target.select()}
                        onChange={e => changeAmount(e.target.value > 0? e.target.value: 0)}
                        />
                    <div className="transaction-form-footer">

                        <button 
                            className="transaction-form-btn btn btn-primary" 
                            onClick={handleAddTransaction} 
                            disabled={(!date || !amount)}>
                                Save
                        </button>
                    </div>
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
        }
    }
}

export default withRouter(connect(null, mapDispatchToProps)(NewTransaction));