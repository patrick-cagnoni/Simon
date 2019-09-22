import React from 'react';
import { connect } from 'react-redux';
import DateSlider from '../../DateSlider/DateSlider';

const TransactionsHeader = props => {

    const { transactions } = props;

    const total = (() => {
        let totalIncome = 0;
        let totalExpense = 0;
 
        transactions.map(t => {
                totalIncome = totalIncome + parseFloat(t.totalIncome);
                totalExpense = totalExpense + parseFloat(t.totalExpense);
        })

        return {
            totalIncome,
            totalExpense
        }
    })();


    return ( 
        <div className="transactions-header">

            <div className="page-title">
                <h4>TRANSACTIONS</h4>
            </div>

            <DateSlider />

            <div className="transactions-total-wrapper">
                <div className="transactions-total">
                    <div className="transactions-total-income text-success font-weight-bold">Income <br/> $ {total.totalIncome}</div>
                    <div className="transactions-total-expense text-danger font-weight-bold">Expense <br/> $ {total.totalExpense}</div>
                    <div className="transactions-total-balance text-light font-weight-bold">Balance <br/> $ {total.totalIncome - total.totalExpense}</div>
                </div>
            </div>

        </div>

     );
}

const mapStateToProps = state => {
    return {
        transactions: state.transactions.transactionsByDay
    }
}
 
export default connect(mapStateToProps)(TransactionsHeader);