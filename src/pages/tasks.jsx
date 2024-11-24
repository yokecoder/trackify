import React , {useState, useEffect} from 'react';
import CardContainer, { TaskCard, TaskInpCard  } from "../comps/cards"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Tasks() {
    /*TODO: write crud operations for adding removing tasks */
    const [taskInput, showTaskInput] = useState(false)
    const [titTxt, setTitleText] = useState("")
    const [tasks, setTasks] = useState([])
    //const [Status, setStatus] = useState(false)
    
    
    const addTask = () => {
        if (titTxt !== ""){
        const updatedTasks = [...tasks, {id:tasks.length,  titTxt, sts:false}]
        setTasks(updatedTasks)
        localStorage.setItem("tasksList", JSON.stringify(updatedTasks))
        setTitleText("")
        toast("New Task Added ")
        }
        else {
            toast("input can't be empty ")
        }
        
    }
    
    const remTask = (id) => {
        //function to delete a task 
        //alert(`task of ${id} removed`)
        const updatedTasks = tasks.filter(task => task.id !== id)
        
        updatedTasks.map((task, id) => {
            task.id = id
        })
        
        setTasks(updatedTasks)
        localStorage.setItem("tasksList", JSON.stringify(updatedTasks))
        toast("Task Deleted")
    }
    
    const UpdateTaskStatus = (id) => {
        //function to update  status of task 
        const preTasks = JSON.parse(localStorage.getItem("tasksList"))
        if (preTasks && id < preTasks.length) {
            if (!preTasks[id].sts){
                preTasks[id].sts = true;
            }
            else {
                preTasks[id].sts = false;
            }
        }
        setTasks(preTasks)
        localStorage.setItem("tasksList", JSON.stringify(preTasks))
        toast("task status updated")
    }
    
    
    useEffect(() => {
        const prevTasks = JSON.parse(localStorage.getItem("tasksList"))
        if (prevTasks) {
            setTasks(prevTasks)
        }
    }, [])
    
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
            <CardContainer cls="card-cont-top">
                <div className="add-task-btn-wrapper" onClick = { () => showTaskInput(true) }   >+ Add Task</div>
                <TaskInpCard titleTxt={titTxt} show = {taskInput}  remFn = {() =>  showTaskInput(false)} addFn = { () => addTask() } changeFn={(e) => setTitleText(e.target.value) }/>
                {tasks.map((task, id) => (
                    <TaskCard id={id} title={task.titTxt} Status={task.sts} delFn={()=> remTask(id)} updateStFn={() => UpdateTaskStatus(id)} />
                ))}
                
            </CardContainer>
        </>
    )
}

export default Tasks;
