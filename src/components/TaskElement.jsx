import React, { useContext } from "react";

import AddTaskContext from "./AddtaskContext";

function TaskElement(props){
    let filteredArray = []
    const addTaskInfo = useContext(AddTaskContext)

    function deleteTask(event){
        const taskName = event.target.name;
        let taskList = [];
        if(localStorage.getItem('taskList')) taskList=JSON.parse(localStorage.getItem('taskList'));
        filteredArray = taskList.filter(task=>task!==taskName);
        localStorage.setItem('taskList', JSON.stringify(filteredArray));
        let newValue = true
        addTaskInfo.setUpdate(newValue)
        addTaskInfo.updateRef.current = true
    }
    

    return(
        <div className="taskElement">
            <input type="checkbox" name={props.inputName} onClick={deleteTask}></input>
            <p>{props.taskName}</p>
        </div>
    )
}

export default TaskElement