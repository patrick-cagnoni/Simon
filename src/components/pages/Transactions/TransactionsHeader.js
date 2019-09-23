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

            <div className="page-header page-header-transactions">

                <h1 className="page-title">TRANSACTIONS</h1>
                <DateSlider />

            </div>

            <div className="transactions-total-wrapper">
                <div className="transactions-total">
                    <div className="transactions-total-income card-info card-green"><div>Income <br/><span className="font-weight-bold">{total.totalIncome}</span>$ </div></div>
                    <div className="transactions-total-expense card-info card-orange"><div>Expense <br/><span className="font-weight-bold">{total.totalExpense}</span>$ </div></div>
                    <div className="transactions-total-balance card-info card-yellow"><div>Balance <br/><span className="font-weight-bold">$ {total.totalIncome - total.totalExpense}</span></div></div>
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