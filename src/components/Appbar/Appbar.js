import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Appbar = props => {

    const { user } = props;

    return ( 
        <nav className="navbar navbar-expand-sm">
            <div className="navbar-brand">
                <Link 
                    to="/" 
                    className="site-name">
                        <span style={{fontSize: '1.6rem'}}>SIMON</span> 
                </Link>
            </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
    
            <div className="collapse navbar-collapse justify-content-end" id="navbarsExample03">
                <img src={user? user.picture.thumbnail: ""} alt="user" className="rounded-circle"></img>
                <ul className="navbar-nav mr-3">
                    <li className="nav-item dropdown ">
                        <Link 
                            className="nav-link dropdown-toggle text-capitalize text-dark" 
                            to="" 
                            id="user" 
                            data-toggle="dropdown" 
                            aria-haspopup="true" 
                            aria-expanded="false">
                            {user? `${user.name.first} ${user.name.last}`: 'Guest' }
                        </Link>
                        <div className="dropdown-menu" aria-labelledby="dropdown03">
                            <Link  className="dropdown-item disable-link" to="/">Profile</Link>
                            <Link  className="dropdown-item disable-link" to="/">Sign Out</Link>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
     );
}

const mapStateToProps = state => {
    return {
        user: state.main.user
    }
}
export default connect(mapStateToProps)(Appbar);