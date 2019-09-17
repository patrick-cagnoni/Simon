import React from 'react';

import DateSlider from '../../DateSlider/DateSlider';
import OverviewTab from './OverviewTab';

const Overview = () => {

    const total = 230;

    return ( 
        <div className="overview">
            <DateSlider />
            <div className="overview-content card">
                <div className="overview-tabs">
                    <div className="overview-tab tab-expense">
                        <div className="overview-tab-title text-danger selected mr-5">Expense | $ {total}</div>
                    </div>
                    <div className="overview-tab tab-income">
                        <div className="overview-tab-title text-success">Income | $ {total}</div>
                    </div>
                </div>
                <div className="overview-tab-content">
                    <OverviewTab />
                </div>
            </div>
        </div>
        
     );
}
 
export default Overview;