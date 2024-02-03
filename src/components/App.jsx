import React, { useEffect, useRef, useState } from "react";
import Menu from "./Menu";
import Clock from "./Clock";
import ClockContext from "./ClockContext";
import Tasks from "./Tasks";
import TasksContext from "./TasksContext";
import SettingsContext from "./SettingsContext";
import Settings from "./Settings";
import AppContext from "./AppContext";
import MenuContext from "./MenuContext";

function App(){

    const [showTasks, setShowTasks] = useState(false)
    const showTasksRef = useRef(showTasks)
    const [showSettings, setShowSettings] = useState(false)

    // load time setting from local storage if exists else use stock value
    const [focusTime, setFocusTime] = useState(parseInt(localStorage.getItem("pomodorlyFocusTime")) ? parseInt(localStorage.getItem("pomodorlyFocusTime")) : 25)
    const [breakTime, setBreakTime] = useState(parseInt(localStorage.getItem("pomodorlyBreakTime")) ? parseInt(localStorage.getItem("pomodorlyBreakTime")) : 5)
    const [longBreakTime, setLongBreakTime] = useState(parseInt(localStorage.getItem("pomodorlyLBreakTime")) ? parseInt(localStorage.getItem("pomodorlyLBreakTime")) : 15)

    //load theme settings from local storage else use Light theme
    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem("pomodorlyTheme") ? localStorage.getItem("pomodorlyTheme"): "Light")
    const body = document.querySelector("body")

    //change theme of an app on load
    useEffect(()=>{
        if(currentTheme === "Dark"){
            body.setAttribute('data-theme', 'dark')
            setCurrentTheme('Dark')
        }
        else{
            body.setAttribute('data-theme', '')
            setCurrentTheme('Light')
        }
    }, [])


    const [isActiveTimer, setIsActiveTimer] = useState(true)
    const [isActiveTasks, setIsActiveTasks] = useState(false)

    //shortcuts listener
    window.addEventListener('keydown', event =>{
        if(event.altKey && event.key === "ArrowRight"){ //show tasks 
            setShowTasks(true)
            showTasksRef.current = true
            setIsActiveTasks(true)
            setIsActiveTimer(false)
        }
        else if(event.altKey && event.key === "ArrowLeft"){ //show timer
            setShowTasks(false)
            showTasksRef.current = false
            setIsActiveTasks(false)
            setIsActiveTimer(true)
        }
        if(event.key==="/" && event.altKey && showTasksRef.current===false){
            setShowSettings(true)
        }
    })


    return(
        <AppContext.Provider value={{
            currentTheme,
            setCurrentTheme,
            isActiveTasks,
            isActiveTimer,
            setIsActiveTasks,
            setIsActiveTimer,
        }}>
            <div className="container">
                <TasksContext.Provider value={{
                    showTasks,
                    showTasksRef,
                    setShowTasks
                }}>
                    <SettingsContext.Provider value={{
                        showSettings,
                        setShowSettings
                    }}>
                        <MenuContext.Provider value={{
                            isActiveTasks,
                            isActiveTimer,
                            setIsActiveTasks,
                            setIsActiveTimer
                        }}>
                            <Menu />
                        </MenuContext.Provider>
                        <ClockContext.Provider value={{
                            focusTime,
                            breakTime,
                            longBreakTime,
                            setFocusTime,
                            setBreakTime,
                            setLongBreakTime
                        }}>
                            {showSettings ? <Settings /> : <Clock />}
                            { showTasks ? <Tasks /> : ""}
                            
                        </ClockContext.Provider>
                    </SettingsContext.Provider>
                </TasksContext.Provider>
            </div>
        </AppContext.Provider>
    )
}

export default App;