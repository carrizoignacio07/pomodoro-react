import './App.css'
import { useState } from 'react'

export const App = () => {
  const [session, setSession] = useState(25)
  const [seconds, setSeconds] = useState("00")
  const [sessionLength, setSessionLength] = useState(25)
  const [breakTime, setBreakTime] = useState(5)
  const [isRunning, setIsRunning] = useState(false)
  const [isBreakTime, setIsBreakTime] = useState(false)
  let minutesInterval;
  let secondsInterval;

  const handleClick = () => {
    if (session === 0) {
      setSession(breakTime)
      setIsBreakTime(true)
    } else {
      setSession(sessionLength)
      setIsBreakTime(false)
    }
  }

  const handleSessionLengthChange = (value) => {
    if (value < 1) return;
    setSessionLength(value);
    setSession(value);
  };

  const handlePause = () => {
    if (isRunning) {
      let minutesAux = clearInterval(minutes);
      let secondsAux = clearInterval(secondsInterval);
      setIsRunning(false)
      console.log('Interval cleared:', minutesAux, secondsAux);
    } else {
      minutes = setInterval(() => {
        secondsInterval = setInterval(() => {
          if (seconds === "00") {
            clearInterval(secondsInterval)
            setSeconds(59)
          }
          seconds--
          console.log('Seconds:', seconds);
        }, 1000)
        setSession((prevSession) => {
          if (prevSession === 0) {
            clearInterval(minutes)
            handleClick()
            return prevSession
          }
          return prevSession - 1
        })
      }, 60000)
      console.log('Interval started:', minutes);
      setIsRunning(true)
    }
  }

  const handleStart = () => {
    if (isRunning) return null;
    minutesInterval = setInterval(() => {
      secondsInterval = setInterval(() => {
        console.log('Seconds:', seconds);
        setSeconds((prevSeconds) => {
          if (session === 0) clearInterval(secondsInterval);
          if (prevSeconds === "00" || prevSeconds === 0) return 59;
          if (typeof prevSeconds === "number" && prevSeconds <= 10) return `0${prevSeconds - 1}`;
          return prevSeconds - 1
        })
      }, 1000)
      console.log('Minutes:', session);
      setSession((prevSession) => {
        if (prevSession === "00" || prevSession === 0) clearInterval(minutesInterval);
        if (typeof prevSession === "number" && prevSession <= 10) return `0${prevSession - 1}`;
        return prevSession - 1
      })
    }, 60000)
    setIsRunning(true)
  }

  const handleReset = () => {
    clearInterval(minutes);
    clearInterval(secondsInterval);
    setSessionLength(25)
    setSeconds("00")
    setBreakTime(5)
    setSession(25)
    setIsRunning(false)
    setIsBreakTime(false)
  }

  return (
    <>
      <h1>Pomodoro</h1>
      <div className="container">
        <button onClick={() => {
          handleSessionLengthChange(sessionLength - 1)
        }}>-</button>
        <span>Session length: {sessionLength}</span>
        <button onClick={() => {
          handleSessionLengthChange(sessionLength + 1)
        }}>+</button>
      </div>
      <div className="container">
        <span>Session: {session}:{seconds}</span>
        <button onClick={handleStart}>Start</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div className="container">
        <button onClick={() => breakTime > 0 ? setBreakTime(breakTime - 1) : null}>-</button>
        <span>Break time: {breakTime}</span>
        <button onClick={() => { setBreakTime(breakTime + 1) }}>+</button>
      </div>
    </>
  )
}