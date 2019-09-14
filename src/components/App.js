import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import Appbar from './Appbar/Appbar';
import Sidebar from './Sidebar/Sidebar';
import Content from './Content/Content';

import { SET_USER } from '../store/reducers/mainReducer';


function App(props) {

  const {setUserData} = props;

  useEffect(() => {
      // setUserData({name:{first:'john', last:'doe'}})
      fetch('https://randomuser.me/api/')
        .then(res => res.json())
        .then(response => setUserData(response.results[0]))
        .catch(e => console.log('error fetching data', e) )
  },[])

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

const mapDispatchToProps = dispatch => {
  return {
    setUserData: user => {
      const action ={
        type: SET_USER,
        user
      }
      dispatch(action)
    }
  }
}

export default connect(null, mapDispatchToProps)(App);
