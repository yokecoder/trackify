import { useState, useEffect } from "react";

function WeeklyStatView({ id }) {
  
    // Setting the Dates of the Current Week 
    const [weekDates, setWeekDates] = useState(() => {
        // Obtaining Date today
        const currentDate = new Date();
        // Adjusting to get Monday as the start of the week
        const firstDayOfWeek = currentDate.getDate() - currentDate.getDay();
        // Initial Datas
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const monthsOfYear = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        // List to temporarily store dates of week 
        const weekDates = []
        for (let i = 0; i < 7; i++) {
            
            const date = new Date(currentDate);
            date.setDate(firstDayOfWeek + i)
            const Date_ =  date.getDate()
            const dayStr = daysOfWeek[date.getDay()];
            const monStr = monthsOfYear[date.getMonth()];
            const fDate = `${Date_}/${date.getMonth() + 1}/${date.getFullYear()}`
            weekDates.push({ Date_, dayStr, monStr,fDate, Status: "pending" })
        }
        return weekDates;
    });
    //Filter the collected data store in a nested list
    let faData  =[];
    let aData = []
    if(JSON.parse(localStorage.getItem("habitAnalytics"))) {
      aData = JSON.parse(localStorage.getItem("habitAnalytics"))
    }
    aData.filter((data) => {
      if (data.id == id) {
        faData.push([data.currDate, data.Status])
      }
    })
    
    //map the analytics data to week Dates
    for (let wd in weekDates) {
      for (let i = 0; i < faData.length; i++ ){
        //console.log(weekDates[wd].fDate, faData[i][0], )
        if (weekDates[wd].fDate == faData[i][0]){
          weekDates[wd].Status = faData[i][1]
        }
      }
    }66
    return (
    <>
    <div className="weekly-stat-wrapper" >
    {weekDates.map((week, index) => (
        <div key={index} className="weekly-stats" style={{backgroundColor: week.Status === 'completed' ? 'green' : week.Status === 'skipped' ? 'red' :'orange' }}>
          <span>{week.dayStr}</span>
          <span>{week.Date_}</span>
          <span>{week.monStr}</span>
        </div>
    ))}
    
    </div> 
    </>
    );
}

export default WeeklyStatView;