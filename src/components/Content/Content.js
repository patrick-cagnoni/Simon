import React from 'react';
import Transactions from '../pages/Transactions/Transactions';
import Categories from '../pages/Categories/Categories';
import Overview from '../pages/Overview/Overview';
import {Route, Switch, Redirect} from 'react-router-dom';

const Content = () => {

    return (
      <div className="content">
        <Switch>
          <Route exact path="/" render={() => <Redirect to='/transactions' />} />
          <Route path="/overview" exact component={Overview} />
          <Route path="/transactions" component={Transactions} />
          <Route path="/categories" component={Categories} />
        </Switch>
      </div>
    );
  }
 
export default Content;