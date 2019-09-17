import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import Appbar from './Appbar/Appbar';
import Sidebar from './Sidebar/Sidebar';
import Content from './Content/Content';

import { SET_USER } from '../store/reducers/mainReducer';
import { LOAD_TRANSACTIONS, FILTER_TRANSACTIONS } from '../store/reducers/transactionsReducer';

function App(props) {

  const {
    setUserData, 
    transactions, 
    loadTransactions, 
    filterTransactions, 
    date
  } = props;

  useEffect(() => {
      // setUserData({name:{first:'john', last:'doe'}})
      fetch('https://randomuser.me/api/')
        .then(res => res.json()) 
        .then(response => setUserData(response.results[0]))
        .catch(e => console.log('error fetching data', e) )
      
      const transactions = JSON.parse(localStorage.getItem('transactions'));
      if(transactions){
  
        loadTransactions(transactions);
      }
  },[])

  useEffect(()=> {
        
    localStorage.setItem('transactions', JSON.stringify(transactions));
    filterTransactions(date);
    }, [transactions])

  return (
    <div className="app-grid">
      <Sidebar />
      <div className="content-grid">
        <Appbar />
        <Content />
      </div>
    </div>
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
    },
    setUserData: user => {
      const action ={
        type: SET_USER,
        user
      }
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
