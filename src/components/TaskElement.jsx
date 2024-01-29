import React, { useContext, useEffect} from "react";

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
        addTaskInfo.setUpdate(true)
        addTaskInfo.updateRef.current = true
    }
    
    useEffect(()=>{
        while(addTaskInfo.updateRef.current===true){
            addTaskInfo.storedItems = JSON.parse(localStorage.getItem("taskList"))
            addTaskInfo.setUpdate(false)
            addTaskInfo.updateRef.current = false
        }

    }, [addTaskInfo, addTaskInfo.storedItems])

    return(
        <div className="taskElement">
            <input type="checkbox" name={props.inputName} onClick={deleteTask}></input>
            <p>{props.taskName}</p>
        </div>
    )
}

export default TaskElement