import React, { useState, useEffect } from 'react';
import { DialogBox } from "../comps/dialogs";
import CardContainer, { HabitCard } from "../comps/cards";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Habits() {
  const [habitsList, setHabitsList] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [currDate, setCurrDate] = useState(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${day}/${month}/${year}`;
  });
  const [currentDay, setCurrentDay] = useState(new Date().toDateString())
  
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [Id, setId] = useState(habitsList.length);
  const [Title, setTitle] = useState("");
  const [Desc, setDesc] = useState("");
  const [Goal, setGoal] = useState(1);
  const [GoalType, setGoalType] = useState("times");
  const [Status, setStatus] = useState("pending");

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescChange = (e) => setDesc(e.target.value);
  const handleGoalChange = (e) => setGoal(e.target.value);
  const handleGoalType = (e) => {
    setGoalType(e.target.value);
    if (e.target.value === "mins") {
      setGoal(30);
    } else if (e.target.value === "times") {
      setGoal(1);
    }
  };

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => {
    setTitle("");
    setDesc("");
    setGoal(1);
    setDialogOpen(false);
  };
  
  const resetStatus = () => {
      const prevData = JSON.parse(localStorage.getItem("habitslist"));
      prevData.forEach((habit) => habit.Status = "pending");
      setHabitsList(prevData);
      localStorage.setItem("habitslist", JSON.stringify(prevData));
  };
  
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('habitslist'));
    const storedAnalytics = JSON.parse(localStorage.getItem('habitAnalytics'));
    if (stored) setHabitsList(stored);
    if (storedAnalytics) setAnalytics(storedAnalytics);
  }, []);

  
  
  
  useEffect(() => {
    const checkDateChange = () => {
      let newDay = new Date().toDateString()
      if (newDay !== currentDay){
        resetStatus();
        setCurrentDay(newDay)
      }
    }
    setInterval(checkDateChange, 2000)
    //clearInterval(IntervalId)  
  }, [currentDay]);

  const addHabit = () => {
    // function to add habit and analytics data as a new one to list and localstorage 
    if (Title) {
      const newHabit = { Id, Title, Desc, Goal, GoalType, Status, dateAdded: currDate };
      //const newAnalyticsData = { id: Id, currDate, Status };
      const updatedList = [...habitsList, newHabit].map((habit, _id) => ({ ...habit, Id: _id }));
      //const updatedAnalytics = [...analytics, newAnalyticsData]
      setHabitsList(updatedList);
      localStorage.setItem("habitslist", JSON.stringify(updatedList));
      //setAnalytics(updatedAnalytics);
      //localStorage.setItem("habitAnalytics", JSON.stringify(updatedAnalytics));
      closeDialog();
      toast('habit added')
      
    } else {
      toast("habit title can't be Empty!!");
    }
  };

  const deleteHabit = (id) => {
    // function to delete an existing habit
    // reset ids of remaining habits matching to arrays index 
    const updatedList = habitsList.filter(habit => habit.Id !== id).map((habit, _id) => ({ ...habit, Id: _id }));
    const updatedAnalytics = analytics.filter(ad => ad.id !== id).map((a, _id) => ({ ...a, id: _id }));
    setHabitsList(updatedList);
    localStorage.setItem("habitslist", JSON.stringify(updatedList));
    setAnalytics(updatedAnalytics);
    localStorage.setItem("habitAnalytics", JSON.stringify(updatedAnalytics));
    toast("Habit Deleted ")
    
  };

  const onComplete = (id) => {
    let preData = JSON.parse(localStorage.getItem("habitslist"));
    if (preData && id < preData.length) {
      preData[id].Status = "completed";
      setHabitsList(preData);
      localStorage.setItem("habitslist", JSON.stringify(preData));
    } else {
      console.error("Invalid index or habits list is empty.");
    }
    const newAnalytics = { id, currDate, Status: "completed" };
    const updatedAnalytics = [...analytics, newAnalytics];
    setAnalytics(updatedAnalytics);
    localStorage.setItem("habitAnalytics", JSON.stringify(updatedAnalytics));
    toast("Habit Completed for today")
    
  };

  const onSkip = (id) => {
    let preData = JSON.parse(localStorage.getItem("habitslist"));
    if (preData && id < preData.length) {
      preData[id].Status = "skipped";
      setHabitsList(preData);
      localStorage.setItem("habitslist", JSON.stringify(preData));
    } else {
      console.error("Invalid index or habits list is empty.");
    }
    const newAnalytics = { id, currDate, Status: "skipped" };
    const updatedAnalytics = [...analytics, newAnalytics];
    setAnalytics(updatedAnalytics);
    localStorage.setItem("habitAnalytics", JSON.stringify(updatedAnalytics));
    toast("Habit Skipped for today")
    
  };


  return (
    <>
       <ToastContainer
        position="top-center"
        autoClose={500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        theme="dark"
      />
      <DialogBox isOpen={isDialogOpen}>
        <div className="cent-dbox">
          <input className="ip-box" type="text" placeholder="Habit" value={Title} onChange={handleTitleChange} required />
          <input className="ip-box" type="text" placeholder="Description" value={Desc} onChange={handleDescChange} required />
          <div className="goal-opts">
            <input className="goal-opt-input" type="number" value={Goal} onChange={handleGoalChange} required />
            <select className="goal-opt-slt" value={GoalType} onChange={handleGoalType}>
              <option value="times">times</option>
              <option value="mins">mins</option>
            </select>
          </div>
        </div>
        <div className="dl-optBtns">
          <span className='dl-cls-btn' onClick={closeDialog}>Close</span>
          <span className='dl-add-btn' onClick={addHabit}>Add</span>
        </div>
      </DialogBox>
       <span className="DateTime">Today, {String(Date()).slice(0, 15)}</span>
      <CardContainer cls="card-cont-top">
        
        {habitsList && habitsList.length > 0 ?
          habitsList.map(habit => (
            <HabitCard 
              key={habit.Id} 
              id={habit.Id} 
              habit={habit.Title} 
              desc={habit.Desc} 
              goal={habit.Goal} 
              goalType={habit.GoalType} 
              status={habit.Status} 
              delFun={deleteHabit} 
              onCompleteFn={onComplete} 
              onSkipFn={onSkip} 
            />
          )) :
          <div className="empty-msg">You are not following any habits currently! <br /> Add a New Habit</div>
        }
      </CardContainer>

      <div className="btm-act-btns">
        <button onClick={openDialog} className="new-rec-btn">New Habit</button>
        <button onClick={resetStatus} className="reset-st-btn">Reset</button>
      </div>
     
    </>
  );
}

export default Habits;