import React from 'react';

import Chart from 'react-apexcharts';


const OverviewTab = props => {

    const { transactions } = props;

   const state = {
        options: {
            labels:['cat-1','cat-2','cat-3',],
            legend: {show:false}
        },
        series: [
            11, 23, 56
        ],
  }
    const tableData = [
        {
            percentage: 13,
            category: 'food',
            value: 100
        }
    ]
    
    return (
        <div className="tab-content">
            <div className="tab-graph">
                <Chart series={state.series} options={state.options} type="donut" width="350"/>
            </div>
            <div className="tab-table-wrapper">
                <table className="table tab-table">
                    <tbody>
                        {
                            tableData.map(td => (
                                <tr>
                                    <td className="tab-tabledata-percentage">{td.percentage} %</td>
                                    <td className="tab-tabledata-category">{td.category}</td>
                                    <td className="tab-tabledata-value">$ {td.value}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
 
export default OverviewTab;