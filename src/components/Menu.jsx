import React, { useContext } from "react";
import TasksContext from "./TasksContext";
import MenuContext from "./MenuContext";


function Menu(){
    const tasksInfo = useContext(TasksContext)
    const menuInfo = useContext(MenuContext)

    const handleClickTimer = event =>{
        menuInfo.setIsActiveTasks(false)
        menuInfo.setIsActiveTimer(true)
        tasksInfo.setShowTasks(false)
        tasksInfo.showTasksRef.current = false
    }
    const handleClickTasks = event =>{
        menuInfo.setIsActiveTimer(false)
        menuInfo.setIsActiveTasks(true)
        tasksInfo.setShowTasks(true)
        tasksInfo.showTasksRef.current = true
    }

    return(
        <div className="headerMenu">
            <div className={menuInfo.isActiveTimer ? 'isActive' : ''} onClick={handleClickTimer}>Timer</div>
            <div className={menuInfo.isActiveTasks ? 'isActive' : ''} onClick={handleClickTasks}>Tasks</div>
        </div>
    )
}

export default Menu;