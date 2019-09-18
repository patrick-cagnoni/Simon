import React,{useState} from 'react';
import { connect } from 'react-redux';
import DateSlider from '../../DateSlider/DateSlider';
import OverviewTabContent from './OverviewTabContent';


const Overview = props => {

    const [tab, setTab] = useState('Expense');

    const { transactions } = props;

        const totalByType = calculateTotalByType(transactions);
        const totalByCategory = calculateTotalByCategory(transactions.filter(t => t.type === tab));
        const chartData = {
            options:{
                labels: Object.keys(totalByCategory),
                legend: {show:false}
            },
            series: Object.values(totalByCategory)
        }
        const tableData = (totalByCategory) => {
            let data =[];
            for(let key in totalByCategory){
                const amount = totalByCategory[key];
                const total = Object.values(totalByCategory).reduce((acc, cur)=> acc + cur);
                const percentage =  amount * 100 / total;
                const category = key;
                data.push(
                    {
                        percentage,
                        category,
                        amount  
                    }
                )
            }
            return data;
        }


    function calculateTotalByCategory(transactions){
        let obj = {};

        transactions.forEach(t => {
            if(obj[t.category]){
                obj[t.category] = obj[t.category] + parseFloat(t.amount);
            }
            else{
                obj[t.category] = parseFloat(t.amount);
            }
        })
        return obj;
    }

    function calculateTotalByType(transactions){
        let expense = 0;
        let income = 0;

        transactions.forEach(t => {
            if(t.type === 'Expense'){
                expense = expense + parseFloat(t.amount);
            }
            else {
                income = income + parseFloat(t.amount);
            }
        });

        return { expense, income };
    }

    return ( 
        <div className="overview">
            <DateSlider />
            <div className="overview-content card">
                <div className="overview-tabs">
                    <div className="overview-tab tab-expense">
                        <div 
                            className={`overview-tab-title text-danger mr-5 ${tab === 'Expense'? 'selected':null}`}
                            onClick={() => setTab('Expense')}
                        >Expense | $ {totalByType.expense.toFixed(2)}</div>
                    </div>
                    <div className="overview-tab tab-income">
                        <div 
                            className={`overview-tab-title text-success ${tab === 'Income'? 'selected': null}`}
                            onClick={() => setTab('Income')}
                        >Income | $ {totalByType.income.toFixed(2)}</div>
                    </div>
                </div>
                {transactions.length > 0?
                    <div className="overview-tab-content">
                        <OverviewTabContent chartData={chartData} tableData={tableData(totalByCategory)}/>
                    </div>
                :
                <div className="no-data"><h1 className="text-center">No data available</h1></div>
            }
            </div>
        </div>
        
     );
}
 
const mapStateToProps = state =>{
    return {
        transactions: state.transactions.filteredTransactions
    }
}
export default connect(mapStateToProps)(Overview);