import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faChartPie, faExchangeAlt, faBoxes } from '@fortawesome/free-solid-svg-icons';
import { Link, withRouter } from 'react-router-dom';

const Sidebar = props => {

    //Gets page route to apply style
    function getPage(){

        const path = props.location.pathname;
        const pathArr = path.split('/');
        const page = pathArr[pathArr.length - 1]
        return page;
    }

    return ( 
        <div className="sidebar">
            <div className="sidebar-brand">
                <Link to="/" className="site-name text-light"><span style={{fontSize: '1.6rem'}}>SIMON</span> <br/> <span>Simple Money Manager</span></Link>
            </div>
            <ul className="sidebar-list">
                <li className="sidebar-item">
                    
                    <Link to='/overview' className={`sidebar-link  ${getPage() === 'overview'? 'selected': null }`}>
                        <span className="sidebar-icon mr-3"><Icon icon={faChartPie}/></span>
                        Overview
                    </Link>
                </li>
                <li className="sidebar-item">
                    <Link to='/transactions' className={`sidebar-link  ${getPage() === 'transactions'? 'selected': null }`}>
                        <span className="sidebar-icon mr-3"><Icon icon={faExchangeAlt}/></span>
                        Transactions
                    </Link>
                </li>
                <li className="sidebar-item">
                    <Link to='/categories' className={`sidebar-link  ${getPage() === 'categories'? 'selected': null }`}>
                    <span className="sidebar-icon mr-3"><Icon icon={faBoxes}/></span>
                        Categories
                    </Link>
                    
                </li>
            </ul>
        </div>
     );
}
 
export default withRouter(Sidebar);