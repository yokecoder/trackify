import React , { useState,useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import WeeklyStatsView from './stats_cal';
import CheckCircleWh from "/src/assets/check_circle_wh.svg"
import DeleteWh from "/src/assets/delete_wh.svg"
import CancelWh from "/src/assets/cancel_wh.svg"
import ArrowRightWh from "/src/assets/arrow_right_wh.svg"
import ArrowDownWh from "/src/assets/arr_down_wh.svg"
import TrashWh from "../assets/trash_wh.svg"
import checkWh from "../assets/check_wh.svg"
import closeWh from "../assets/close_wh.svg"


function NavCard(props){
  const navigate = useNavigate()
  const gotoRoute = () => {

    navigate(props.route)
  }

  return (
    <>
      <div onClick={gotoRoute} className="nav--card">
        <div className="nav--title">
          { props.title }
        </div>
        <div className="nav-sub-title">
          { props.subTitle }
        </div>
        
      </div>
      
    </>
    )
}



function HabitCard({id, habit, desc, onCompleteFn, onSkipFn, delFun, status="pending", goal = 1,  goalType = "times", expand = false }){
  
  const [isExpanded, setExpanded] = useState(false);
  const expandCard = () => {setExpanded(true)}
  const closeCard = () => {setExpanded(false)}
  
  
  return ( isExpanded  ?  
    <div key={id} className="habit-card" >
      <div className="hab-cd-title" onClick={closeCard} > 
        <span className="habit-title">{ habit }</span>
        <img className='' src={ArrowDownWh} />
      </div>
      { desc ?  <p className="habit-desc" >{ desc }</p> :  null }
      <span className="habit-goal" > Goal: { String(goal) + " " + goalType } / day</span>
      <span className="habit-status"> Status: <span className={status} > { status } for today</span> </span>
      <WeeklyStatsView id={id}/>
    </div>
    
    : 
  
    <div key={id} className="habit-card-shrink" >
      <div className="hab-cd-title" onClick={expandCard}>
        <span className="habit-title">{ habit }</span>
        <img className='' src={ArrowRightWh} /> 
      </div>
      <div className='min-act-ico'>
        { status == "pending" ? (
          <>
          <span className="act-ico" onClick = { () => { onCompleteFn(id); } } > <img src={CheckCircleWh}   /> </span>
          <span className="act-ico" onClick = { () => { onSkipFn(id);  } }> <img src={CancelWh} /> </span>
          <span className="act-ico" onClick={() => {delFun(id)} } > <img src={DeleteWh} /> </span>
          </>
        ) 
        : status == "completed" ?  (
          <>
          <div className="status-ico"> 
            <img className="st-act-ico" src={CheckCircleWh} />
            <span className="status-text completed" >Completed </span> 
          </div> 
          </>
          )
        : status == "skipped" ? (
          <>
            <div className="status-ico">
              <img className="st-act-ico" src={CancelWh} /> 
              <span className="status-text skipped" > Skipped </span> 
            </div>
    
          </>
        ) : ''
          
        }
      </div> 
    </div>
    
    )
  
}

function TaskCard({id, title="task", Status = false ,delFn, updateStFn }){
    //const [taskTitle, setTaskTitle] = useState(props.title)
    return (
    <>
        <div key={id} className="taskcard-wrapper">
            <div className="checkbox-wrapper" onClick={updateStFn}  >
                <input type="checkbox" name={title}  checked={Status} onClick={() => { updateStFn } }/>
                <label className="task-title"  htmlFor={title}>{title}</label>
            </div>
            <div className="task-actions">
                <img src={TrashWh} className="min-act-ico" onClick = {delFn} />
            </div>
        </div>
         
    </>
    )
}
function TaskInpCard({titleTxt, show = true, addFn ,remFn, changeFn}){
    //const [taskTitle, setTaskTitle] = useState(titleTxt)
    const Style = {
        display: show ? "flex": "none" 
    }
    
    
    
    return (
    <>
        <div style={Style} className="taskcard-wrapper">
        
            <img src={closeWh} className="min-act-ico" onClick={ remFn } />
            <input className="task-input" placeholder="add task" value={titleTxt} onChange= {changeFn } />
            <img src={checkWh} className="min-act-ico" onClick = { addFn }/>
            
        </div>
         
    </>
    )
}





function CardContainer(props){
  return (
    <div className= { props.cls } >
      { props.children }
    </div>
    )
}

export default CardContainer;
export { NavCard , HabitCard, TaskCard , TaskInpCard};