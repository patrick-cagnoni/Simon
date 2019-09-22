import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const TransactionsContent = props => {

    const { transactionsByDay } = props;

    return ( 
        <React.Fragment>

            <div className="transaction-add-btn-wrapper">
                <Link className="transaction-add-btn" to='/transactions/new'>+</Link>
            </div>
            <div className="transactions-content">

                {transactionsByDay.map(tday => (

                    <div className="transaction-day card">

                        <div className="transaction-day-header">

                            <div className="transaction-day-monthday">

                                {format(new Date(tday.date),'dd')}
                                <span className="weekday-span">{format(new Date(tday.date),'EEEE')}</span>

                            </div>
                            <div className="transaction-day-total">

                                <div className="transaction-day-total-income">

                                    <div>Income</div>
                                    <div className="text-success">$ {tday.totalIncome}</div>

                                </div>
                                <div className="transaction-day-total-expense">

                                    <div>Expenses</div>
                                    <div className="text-danger">$ {tday.totalExpense}</div>

                                </div>

                            </div>

                        </div>
                        <ul className="transaction-day-list">

                            {tday.list.map(t => (
                                
                                <li>

                                    <Link className="transaction-day-item" to={`/transactions/edit/${t.id}`}>

                                        <div className="transaction-day-item-category">
                                            {t.category}
                                        </div>
                                        <div className="transaction-day-item-notes">
                                            {t.notes}
                                        </div>
                                        <div className="transaction-day-item-amount">
                                            <div className="transaction-day-item-amount-income text-success">
                                                {t.type === 'Income'? `$ ${t.amount}`: null}
                                            </div>
                                            <div className="transaction-day-item-amount-expense text-danger">
                                                {t.type === 'Expense'? `$ ${t.amount}`: null}
                                            </div>
                                            
                                        </div>

                                    </Link>

                                </li>

                            ))}

                        </ul>

                    </div>
                ))}
                    
            </div>
            
        </React.Fragment>
     );
}

const mapStateToProps = state => {
    return {
        transactionsByDay: state.transactions.transactionsByDay,
        date: state.dateSlider.date
    }
}


 
export default connect(mapStateToProps)(TransactionsContent);