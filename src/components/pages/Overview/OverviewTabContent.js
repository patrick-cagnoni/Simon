import React from 'react';

import Chart from 'react-apexcharts';


const OverviewTabContent = props => {

    const { chartData, tableData } = props;

    return (
        <div className="tab-content">
            <div className="tab-graph">
                <Chart series={chartData.series} options={chartData.options} type="donut" width="350"/>
            </div>
            <div className="tab-table-wrapper">
                <table className="table tab-table">
                    <tbody>
                        {
                            tableData.map(td => (
                                <tr key={td.category}>
                                    <td className="tab-tabledata-percentage">{td.percentage.toFixed(1)} %</td>
                                    <td className="tab-tabledata-category">{td.category}</td>
                                    <td className="tab-tabledata-value">$ {td.amount.toFixed(2)}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
 
export default OverviewTabContent;