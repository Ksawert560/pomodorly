import React, { useRef, useState } from "react";
import TaskElement from "./TaskElement";
import AddTask from "./AddTask"
import AddTaskContext from "./AddtaskContext"


function Tasks(){
    let storedItems = []

    if(localStorage.getItem("taskList")){
        storedItems=JSON.parse(localStorage.getItem("taskList"))
    }

    const [update, setUpdate] = useState(false)
    const updateRef = useRef(update)




    const [showAddTask, setShowAddTask] = useState(false)

    function handleClick(){
        let newValue = true
        setShowAddTask(newValue)
    }

    let taskDiv = []
    storedItems.forEach(task=>{
        taskDiv.push(<TaskElement taskName={task} inputName={task}/>)
    })


    window.addEventListener('keydown', event=>{
        if(event.ctrlKey && event.altKey && event.key===","){
            setShowAddTask(true)
        }
    })

    return(

        <AddTaskContext.Provider value={{
            showAddTask,
            setShowAddTask,
            storedItems,
            setUpdate,
            updateRef,
        }}>
            {showAddTask ? <AddTask/> : 
            <div className="tasksContainer">
                <div className="taskList">
                    {taskDiv}
                </div>
                <div className="addTaskBtn" onClick={handleClick}>Add Task</div>
            </div>
            }
        </AddTaskContext.Provider>


    )
}

export default Tasks