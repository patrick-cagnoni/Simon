import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import DateSlider from '../../DateSlider/DateSlider';
import TransactionsTable from './TransactionsTable';

import { LOAD_TRANSACTIONS, FILTER_TRANSACTIONS } from '../../../store/reducers/transactionsReducer';


const Transactions = props => {

    const {transactions, loadTransactions, filterTransactions, date} = props;

    // EFFECT ----------------------------------------------------------------------------
    useEffect(()=>{
      
        const transactions = JSON.parse(localStorage.getItem('transactions'));
        if(transactions){
    
          loadTransactions(transactions);
        }
          
    }, [])
    
    useEffect(()=> {
        
        localStorage.setItem('transactions', JSON.stringify(transactions));
        filterTransactions(date);
        }, [transactions])

    // END EFFECT -------------------------------------------------------------------------

    return ( 
        <React.Fragment>

            <DateSlider />
            <TransactionsTable />
            
        </React.Fragment>
     );
}

const mapStateToProps = state => {
    return {
        transactions: state.transactions.transactions,
        date: state.dateSlider.date
    }
  }

  const mapDispatchToProps = dispatch => {
    return {

      loadTransactions: transactions => {
        const action ={
          type: LOAD_TRANSACTIONS,
          transactions
        } 
        dispatch(action)
      },
      
      filterTransactions: date => {
        const action = {
            type: FILTER_TRANSACTIONS,
            date
        }
        dispatch(action);
      }
    }
  }
 
export default connect(mapStateToProps, mapDispatchToProps)(Transactions);