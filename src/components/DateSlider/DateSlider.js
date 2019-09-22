import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { format, subMonths, addMonths } from 'date-fns'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faChevronRight as Right, faChevronLeft as Left,  } from '@fortawesome/free-solid-svg-icons';

import { CHANGE_DATE } from '../../store/reducers/dateSliderReducer';
import { FILTER_TRANSACTIONS } from '../../store/reducers/transactionsReducer';

const DateSlider = props => {
    
    const { date, changeDate, filterTransactions } = props;

    useEffect(()=>{
        filterTransactions(date)
    },[date])

    function previousMonth(){
        const newDate = subMonths(date, 1);
        changeDate(newDate);
    }

    function nextMonth(){
        const newDate = addMonths(date, 1);
        changeDate(newDate);
    }

    return ( 
        <div className="dateSlider">
            <div className="btn btn-dateslider" onClick={previousMonth}><Icon icon={Left} className="icon" /></div>
                <div className="date"><h2 >{format(date, 'yyyy MMMM')}</h2></div>
            <div className="btn btn-dateslider" onClick={nextMonth}><Icon icon={Right} className="icon" /></div>
        </div>
     );
}
 
const mapStateToProps = state => {
    return {
        date: state.dateSlider.date
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeDate: date => {
            const action = {
                type: CHANGE_DATE,
                date
            }
            dispatch(action);
        },
        filterTransactions: date => {
            const action = {
                type: FILTER_TRANSACTIONS,
                date
            }
            dispatch(action);
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DateSlider);