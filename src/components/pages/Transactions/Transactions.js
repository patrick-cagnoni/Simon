import React from 'react';
import DateSlider from '../../DateSlider/DateSlider';
import TransactionsTable from './TransactionsTable';

const Transactions = () => {

    return ( 
        <React.Fragment>

            <DateSlider />
            <TransactionsTable />
            
        </React.Fragment>
     );
}

export default Transactions;