import { BarChart } from '@mui/x-charts/BarChart';

const chartSetting = {
  yAxis: [
    {
      label: 'People',
      width: 60,
    },
  ],
  height: 300,
};


export default function TrendsGraph({avg_data}: {avg_data?: Record<string, number>}) {

    if(! avg_data){
        return <div className="flex justify-center items-center">
                <p>Loading Trends</p>
            </div>
    }

    const labels: string[] = [
        "1am", "2am", "3am", "4am", "5am", "6am", "7am", 
        "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", 
        "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", 
        "10pm", "11pm", "12am"
    ];

    let values:number[] = []
    for(let i in labels){
        values.push(avg_data[labels[i]] ?? 0)
    }


    return (

        <BarChart
      xAxis={[{ scaleType: 'band', data: labels }]}
            // Pass the numbers directly to the series
            series={[{ data: values, label: 'Average People' }]}
      {...chartSetting}
    />

    );
}
