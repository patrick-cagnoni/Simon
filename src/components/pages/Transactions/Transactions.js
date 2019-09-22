import React from 'react';
import TransactionsContent from './TransactionsContent';
import TransactionsHeader from './TransactionsHeader';
import NewTransaction from './NewTransaction';
import EditTransaction from './EditTransaction';
import { Route, Switch } from 'react-router-dom';

const Transactions = () => {

    return ( 
        <React.Fragment>
            <Switch>

                <Route 
                    exact path="/transactions/" 
                    render={() => (
                    <React.Fragment>
                        <TransactionsHeader />
                        <TransactionsContent />
                    </React.Fragment>)}
                /> 
                <Route exact path="/transactions/edit/:id" component={EditTransaction}/> 
                <Route exact path="/transactions/new" component={NewTransaction}/>
            </Switch>
            
        </React.Fragment>
     );
}

export default Transactions;