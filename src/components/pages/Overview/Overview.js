import React from 'react';
import { connect } from 'react-redux';
import DateSlider from '../../DateSlider/DateSlider';
import { isSameMonth } from 'date-fns';
import OverviewChart from './OverviewChart';

const Overview = props => {

    const { transactions, date } = props;

    //filter transactions by selected month
    const filteredTransactions = transactions.filter(t => (
        isSameMonth(new Date(t.date), new Date(date))
    ));  

    function generateChartData(type){
        const totalByCategory = calculateTotalByCategory(filteredTransactions.filter(t => t.type === type));
        const chartData = {
            options:{
                labels: Object.keys(totalByCategory),
                legend: {show:false}
            },
            series: Object.values(totalByCategory)
        }
        return chartData;
    }

    function generateTableData(type) {
        let data =[];
        const totalByCategory = calculateTotalByCategory(filteredTransactions.filter(t => t.type === type));

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

    return ( 
        <div className="overview">
            <div className="page-header">
                <h4 className="page-title">OVERVIEW</h4>
                <DateSlider />
            </div>
            {filteredTransactions.length > 0?
            <div className="overview-content">
                    <OverviewChart 
                        chartData={generateChartData('Expense')} 
                        chartType={"donut"} 
                        tableData={generateTableData('Expense')}
                        type={"Expense"}
                        width="300"
                         />
                    <OverviewChart 
                        chartData={generateChartData('Income')} 
                        chartType={"donut"} 
                        tableData={generateTableData('Income') } 
                        type={"Income"}
                        width="300"
                    />
            </div>
                :
            <div className="no-data"><h1 className="text-center">No data available</h1></div>
            }
        </div>
        
     );
}
 
const mapStateToProps = state =>{
    return {
        transactions: state.transactions.transactions,
        date: state.dateSlider.date
    }
}
export default connect(mapStateToProps)(Overview);