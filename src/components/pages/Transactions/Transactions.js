import React from 'react';
import DateSlider from '../../DateSlider/DateSlider';
import TransactionsTable from './TransactionsTable';
import Transaction from './Transaction';
import {Route, Switch, Redirect} from 'react-router-dom';

const Transactions = () => {

    return ( 
        <React.Fragment>
            <Switch>

                <Route 
                    exact path="/transactions/" 
                    render={() => (
                    <React.Fragment>
                        <DateSlider />
                        <TransactionsTable />
                    </React.Fragment>)}
                /> 
                <Route exact patch="/transactions/new" render={() => <Transaction action="new"/>}/>
            </Switch>
            
        </React.Fragment>
     );
}

export default Transactions;