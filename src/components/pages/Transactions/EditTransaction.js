import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';

import {DELETE_TRANSACTION, UPDATE_TRANSACTION } from '../../../store/reducers/transactionsReducer';

import { categoriesOpt, typeOpt } from '../../../config/transactions';
import DatePicker from 'react-datepicker';
import { withRouter } from 'react-router-dom'; 

import "react-datepicker/dist/react-datepicker.css";
import AppDialog from '../../../components/AppDialog/AppDialog';


const EditTransaction = props => {

    const { transactions, deleteTransaction, updateTransaction, location, history } = props;

    const pathArr = location.pathname.split('/');
    const id = pathArr[pathArr.length - 1];
    const transaction = transactions.find(t => t.id === id)

    const [date, setDate] = useState( Date.now());
    const [type, setType] = useState( 'Expense');
    const [category, setCategory] = useState( categoriesOpt.expense[0]);
    const [notes, setNotes] = useState("");
    const [amount, setAmount] = useState(0);

    const [dialogShow, setDialogShow] = useState(false);

    useEffect(()=> {
        if(transaction){
            setDate(transaction.date);
            setType(transaction.type);
            setCategory(transaction.category);
            setNotes(transaction.notes);
            setAmount(transaction.amount);
        }
    },[transactions])

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

    function handleDeleteTransaction(){
        deleteTransaction(id);
        history.push('/transactions');
    }

    function handleUpdateTransaction(){
        const updatedTransaction = {
            id,
            date,
            type,
            category,
            notes,
            amount
        }
        updateTransaction(updatedTransaction);
        history.push('/transactions')
    }

    function handleDeleteClick(e){
        e.preventDefault();
        setDialogShow(true);
    }

    function handleTypeClick(type){
        setType(type);
        setCategory(categoriesOpt[type.toLowerCase()][0]);
    }

        return (
            <React.Fragment>

                <div className="transaction-new">
                    <h1 className="page-title">Edit Transaction</h1>
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
                                    className="transaction-form-btn btn btn-danger mr-3" 
                                    onClick={handleDeleteClick} 
                                    disabled={(!date || !amount)}>
                                        Delete
                                </button>
                                <button 
                                    className="transaction-form-btn btn btn-primary" 
                                    onClick={handleUpdateTransaction} 
                                    disabled={(!date || !amount)}>
                                        Update
                                </button>
                            </div>
                        </div>

                    </form>
                </div>
                <AppDialog 
                    title={'Delete Transaction'}
                    message={`Do you want to delete this transaction?`}
                    show={dialogShow}
                    onConfirm={handleDeleteTransaction}
                    onClose={() => setDialogShow(false)}
                />
            </React.Fragment>
        )
    
}

const mapStateToProps = state => {
    return {
        transactions: state.transactions.transactions
    }
}
 
const mapDispatchToProps = dispatch => {
    return {

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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditTransaction));