import React, {useContext, useEffect, useRef, useState} from "react";
import ClockContext from "./ClockContext";
import SettingsContext from "./SettingsContext";
import AudioFile from "../sounds/digital-alarm.mp3"


let alarmSound = new Audio(AudioFile)

function Clock(){
    const clockInfo = useContext(ClockContext)
    const settingsInfo = useContext(SettingsContext)

    const [isPaused, setIsPaused] = useState(true)
    const [mode, setMode] = useState('focus')
    const [secondsLeft, setSecondsLeft] = useState(clockInfo.focusTime*60)

    const secondsLeftRef = useRef(secondsLeft)
    const isPausedRef = useRef(isPaused)
    const modeRef = useRef(mode)

    function displaySettings(){
        let newValue = true
        settingsInfo.setShowSettings(newValue)
    }
    let counter = 0
    function changeMode(){
        if(modeRef.current === 'focus') counter++
        const nextMode = modeRef.current === 'focus' ? counter%4===0 ? 'long break' : 'break' : 'focus'
        const nextSeconds = (nextMode === 'focus'
            ? clockInfo.focusTime*60
            : nextMode === 'long break'
            ? clockInfo.longBreakTime*60
            : clockInfo.breakTime*60)
        setMode(nextMode)
        modeRef.current = nextMode

        document.title = modeRef.current + " time"


        setSecondsLeft(nextSeconds)
        secondsLeftRef.current = nextSeconds
        stopClick()
        setOpacity(1)
        opacityRef.current = 1
        playSound()
    }

    function tick(){
        secondsLeftRef.current--
        setSecondsLeft(secondsLeftRef.current)

        let minutesTitle = Math.floor(secondsLeftRef.current/60)
        let secondsTitle =  + secondsLeftRef.current%60 < 10 ? "0" + secondsLeftRef.current%60 : secondsLeftRef.current%60

        document.title = minutesTitle + ":" + secondsTitle + " | " + modeRef.current

    }
    function startClick(){
        setIsPaused(false)
        isPausedRef.current = false
    }
    function stopClick(){
        setIsPaused(true)
        isPausedRef.current = true
    }

    function initTimer(){
        setSecondsLeft(clockInfo.focusTime*60)
    }


    const [opacity, setOpacity] = useState(1)
    const opacityRef = useRef(opacity)
    useEffect(()=>{
        initTimer()


        const interval = setInterval(()=>{
            let step = 0
            if(mode === 'focus'){
                step = 100/(clockInfo.focusTime*60)

            }
            else if(mode === 'break'){
                step = 100/(clockInfo.breakTime*60)
            }
            else if(mode === 'long break'){
                step = 100/(clockInfo.longBreakTime*60)
            }

            if (isPausedRef.current){
                return;
            }
            if(secondsLeftRef.current===0){
                return changeMode()
            }
            step = step/100
            setOpacity(opacity-step)

            opacityRef.current = opacityRef.current - step
            
            tick()
        },10)
        return () => clearInterval(interval)
    }, [clockInfo])


    const minutes = Math.floor(secondsLeftRef.current/60)
    const seconds = secondsLeftRef.current%60 < 10 ? "0" + secondsLeftRef.current%60 : secondsLeftRef.current%60
   

    function playSound(){
        alarmSound.play()
        setTimeout(()=>{ alarmSound.pause()}, 2000)
    }

    return(
        <div className="clock">
            <div className="clockBackground">
                <span className="time">
                    {minutes + ':' + seconds}
                </span>
                <div 
                    id="clockAccent"
                    className={mode === 'focus' ? 'clockAccentFocus' : 'clockAccentBreak' }
                    style={{opacity: opacityRef.current}}
                ></div>
            </div>

            <div className="controls">
                <div className="startBtn" onClick={startClick}>Start</div>
                <div className="stopBtn" onClick={stopClick}>Stop</div>
            </div>



            <div className="settingsBtn" onClick={displaySettings}>
                Settings
            </div>
        </div>
        
    )
}

export default Clock;