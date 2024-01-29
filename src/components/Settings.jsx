import React, { useContext } from "react";
import TimeSettingsDiv from "./TimeSettingsDiv";
import ClockContext from "./ClockContext";
import SettingsContext from "./SettingsContext";
import AppContext from "./AppContext";


function Settings(){
    const appInfo = useContext(AppContext)
    const clockInfo = useContext(ClockContext)
    const settingsInfo = useContext(SettingsContext)

    const focusTimeClickMinus = event =>{
        let newValue = clockInfo.focusTime-1
        clockInfo.setFocusTime(newValue)
    }

    const focusTimeClickPlus = event =>{
        let newValue = clockInfo.focusTime+1
        clockInfo.setFocusTime(newValue)
    }

    const breakTimeClickMinus = event =>{
        let newValue = clockInfo.breakTime-1
        clockInfo.setBreakTime(newValue)
    }
    const breakTimeClickPlus = event =>{
        let newValue = clockInfo.breakTime+1
        clockInfo.setBreakTime(newValue)
    }
    const lBreakTimeClickMinus = event =>{
        let newValue = clockInfo.longBreakTime-1
        clockInfo.setLongBreakTime(newValue)
    }
    const lBreakTimeClickPlus = event =>{
        let newValue = clockInfo.longBreakTime+1
        clockInfo.setLongBreakTime(newValue)
    }

    function saveTimes(){
        localStorage.setItem("pomodorlyFocusTime", clockInfo.focusTime)
        localStorage.setItem("pomodorlyBreakTime", clockInfo.breakTime)
        localStorage.setItem("pomodorlyLBreakTime", clockInfo.longBreakTime)
    }

    function displayClock() { 
        let newValue = false
        settingsInfo.setShowSettings(newValue)
        appInfo.setIsActiveTasks(false)
        appInfo.setIsActiveTimer(true)
        saveTimes()
    }

    
    const body = document.querySelector("body")
    const dataTheme = body.getAttribute('data-theme')


    function themeToggle(){
        if(dataTheme === 'dark'){
            body.setAttribute('data-theme', '')
            appInfo.setCurrentTheme('Light')
            localStorage.setItem("pomodorlyTheme", "Light")
        }
        else{
            body.setAttribute('data-theme', 'dark')
            appInfo.setCurrentTheme('Dark')
            localStorage.setItem("pomodorlyTheme", "Dark")
        }
    }

    window.addEventListener('keydown', event=>{
        if(settingsInfo.showSettings===true && appInfo.isActiveTimer===true && event.key==="Escape"){
            saveTimes()
            settingsInfo.setShowSettings(false)
            
        }
    })

    return(
        <div className="timeSettings">
        <h1>Settings</h1>
        <TimeSettingsDiv 
            time={clockInfo.focusTime}
            type='Focus'
            clickFuncMinus={focusTimeClickMinus}
            clickFuncPlus={focusTimeClickPlus}
        />
        <TimeSettingsDiv 
            time={clockInfo.breakTime}
            type='Break'
            clickFuncMinus={breakTimeClickMinus}
            clickFuncPlus={breakTimeClickPlus}
        />
        <TimeSettingsDiv 
            time={clockInfo.longBreakTime}
            type='Long Break'
            clickFuncMinus={lBreakTimeClickMinus}
            clickFuncPlus={lBreakTimeClickPlus}
        />

        <div className="themeBtn" onClick={themeToggle}>{appInfo.currentTheme} Theme</div>
        <div className="exitBtn" onClick={displayClock}>Go Back</div>
        </div>
    )
}

export default Settings