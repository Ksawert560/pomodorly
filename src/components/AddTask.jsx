import React, { useContext } from "react";
import AddTaskContext from "./AddtaskContext";

function AddTask(){
    const addTaskInfo = useContext(AddTaskContext)

    function exit(){
        let newValue = false
        addTaskInfo.setShowAddTask(newValue)
    }
    function save(){
        let task = document.getElementById("taskInput")
        addTaskInfo.storedItems.push(task.value)
        localStorage.setItem("taskList", JSON.stringify(addTaskInfo.storedItems))
        exit()
    }

    //listeners
    window.addEventListener('keydown', event =>{
        if(event.key === "Escape"){
            exit()
        }
    })
    function checkForEnter(event){
        if(event.code === "Enter"){
            save()
        }
    }

    return(
        <div className="addTaskContainer">
            <h1 className="span2">Create New Task</h1>
            <input className="span2" id="taskInput" type="text" name="task" placeholder="Type someting" onKeyDown={checkForEnter} autoFocus></input>
            <div className="addTaskBtn" onClick={exit}>Cancel</div>
            <div className="addTaskBtn" onClick={save}>Save</div>
        </div>
    )
}

export default AddTask