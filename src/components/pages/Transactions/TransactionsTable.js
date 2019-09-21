import React, {useState} from 'react';
import { connect } from 'react-redux';
import TransactionRow from './TransactionRow';
import AppDialog from '../../../components/AppDialog/AppDialog';
import { Link } from 'react-router-dom';

import { format } from 'date-fns'
import * as uniqid from 'uniqid';

const TransactionsTable = props => {

    const { 
        filteredTransactions:transactions, 
        addTransaction, deleteTransaction, 
        updateTransaction, 
     } = props;

    

    const typeOpt = [
        "Expense",
        "Income"
    ]

    //STATE ----------------------------------------------------------------------------------

    const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [type, setType] = useState('Expense');
    const [category, setCategory] = useState('Beauty');
    const [notes, setNotes] = useState('');
    const [amount, setAmount] = useState(null);

    const [dialogShow, setDialogShow] = useState(false);
    const [transactionId, setTransactionId] = useState("");

    //END STATE -------------------------------------------------------------------------------

    //FUNCTIONS -------------------------------------------------------------------------------

    //END FUNCTIONS ----------------------------------------------------------------------------

    return ( 
        <React.Fragment>
            <div className="transaction-add-btn-wrapper">
                <Link className="btn btn-primary transaction-add-btn" to='/transactions/new'>add transaction</Link>

            </div>
            <ul>
                {transactions.map(t => (
                    <li>
                        {t.category}
                    </li>
                ))}
            </ul>
            <AppDialog 
                title={'Remove Transaction'}
                message={`Do you want to remove this transaction?`}
                show={dialogShow}
                onClose={() => setDialogShow(false)}
                // onConfirm={handleDeleteTransaction}                    
          />
        </React.Fragment>
     );
}

const mapStateToProps = state => {
    return {
        filteredTransactions: state.transactions.filteredTransactions,
        date: state.dateSlider.date
    }
}


 
export default connect(mapStateToProps)(TransactionsTable);