import React from 'react'
import {Line} from 'react-chartjs-2';

const StoreStatChart = ({PinSInfo,state,productSales}) => {
    return (
        <>
        {PinSInfo?.length >2 && <Line
            data={state}
    
            maintainAspectRatio
            options={{
              title:{
                display:true,
                text:'Product Sales',
                fontSize:20
              },
              legend:{
                display:true,
                position:'bottom'
              },
              scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true,
                        min: 0,
                       max:productSales?.sort((a,b)=>a-b)[productSales?.length - 1] + 2
                    }
                  }],
                  xAxes: [{
                    ticks: {
                     fontSize: 12
                    }
                   }]
               },
               responsive: true,
              maintainAspectRatio: true,
            }}
          />} 
          </>
    )
}

export default StoreStatChart
