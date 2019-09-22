import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faChartPie, faExchangeAlt, faBoxes } from '@fortawesome/free-solid-svg-icons';
import { Link, withRouter } from 'react-router-dom'; 

const Sidebar = props => {

    //Gets page route to apply style

        const path = props.location.pathname.split('/');
 
    return ( 
        <div className="sidebar">
            
            <ul className="sidebar-list">
                <li className="sidebar-item">
                    
                    <Link to='/overview' className={`sidebar-link  ${path.includes('overview')? 'selected': null }`}>
                        <span className="sidebar-icon"><Icon icon={faChartPie}/></span>
                        <span className="sidebar-link-text">Overview</span>
                    </Link>
                </li>
                <li className="sidebar-item">
                    <Link to='/transactions' className={`sidebar-link  ${path.includes('transactions')? 'selected': null }`}>
                        <span className="sidebar-icon"><Icon icon={faExchangeAlt}/></span>
                        <span className="sidebar-link-text">Transactions</span>
                    </Link>
                </li>
                <li className="sidebar-item">
                    <Link to='/categories' className={`sidebar-link  ${path.includes('categories')? 'selected': null }`}>
                    <span className="sidebar-icon"><Icon icon={faBoxes}/></span>
                        <span className="sidebar-link-text">Categories</span>
                    </Link>
                    
                </li>
            </ul>
        </div>
     );
}
 
export default withRouter(Sidebar);