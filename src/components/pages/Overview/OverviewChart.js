import React from 'react';
import Chart from 'react-apexcharts';

const OverviewChart = props => {

    const { chartData, chartType, tableData, type, width } = props;

    return ( 
        <div className="overview-chart card">
            <div className={`overview-chart-header ${type === 'Expense'? "chart-expense": "chart-income"}`}>
                {type === 'Expense'? 'Expense': 'Income'}
            </div>
            <Chart 
                series={chartData.series} 
                options={chartData.options} 
                type={chartType} 
                width={width}/>
                
            <div className="overview-table-wrapper">
                <table className="table tab-table">
                    <tbody> 
                        {
                            tableData.sort().map(td => (
                                <tr key={td.category}>
                                    <td className="chart-tabledata-percentage">{td.percentage.toFixed(1)} %</td>
                                    <td className="chart-tabledata-category">{td.category}</td>
                                    <td className="chart-tabledata-value">$ {td.amount.toFixed(2)}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
     );
}
 
export default OverviewChart;