import './App.css';
import Timer from './components/Timer.js';
import React, { useState, useEffect } from 'react';
import Settings from './components/Settings';

function App() {
  let [minutesPomodoro, setMinutesPomodoro] = useState(50);
  let [minutesBreak, setMinutesBreak] = useState(10);
  let [showModal, setShowModal] = useState(false);
  let [soundNumber, setSoundNumber] = useState(0);
  let [timerActive, setTimerActive] = useState('START');
  let [workingTime, setWorkingTime] = useState(true);

  useEffect(() => {
    console.log('loading up the timmer component');
  }, [minutesPomodoro, minutesBreak]);

  const stopTimer = () => {
    console.log('stopping the timer');
  };

  // changing background color depending on workingTime
  workingTime
    ? (document.body.style = 'background: rgb(184, 87, 87)')
    : (document.body.style = 'background: rgb(96, 124, 176)');

  // selecting our fontColor variable from our style sheet
  const rootSelector = document.querySelector(':root');
  // checking what the value of our variable is
  // const color = getComputedStyle(rootSelector).getPropertyValue('--fontColor');
  // updating our variable
  // rootSelector.style.setProperty('--fontColor', 'rgb(205, 205, 205')
  workingTime
    ? rootSelector.style.setProperty('--fontColor', 'rgb(205, 205, 199')
    : rootSelector.style.setProperty('--fontColor', 'rgb(40,40,40');

  return (
    <div>
      <Timer
        minutesPomodoro={minutesPomodoro}
        minutesBreak={minutesBreak}
        soundNumber={soundNumber}
        timerActive={timerActive}
        setTimerActive={setTimerActive}
        setWorkingTime={setWorkingTime}
        workingTime={workingTime}
      />
      {workingTime ? (
        <h1 className="info-text">working time</h1>
      ) : (
        <h1 className="info-text">relaxing time</h1>
      )}

      <p onClick={() => setShowModal(!showModal)} className="buttons">
        SETTINGS
      </p>
      {showModal ? (
        <div className="modal main-container">
          <Settings
            setShowModal={setShowModal}
            showModal={showModal}
            minutesPomodoro={minutesPomodoro}
            minutesBreak={minutesBreak}
            soundNumber={soundNumber}
            setMinutesPomodoro={setMinutesPomodoro}
            setMinutesBreak={setMinutesBreak}
            setSoundNumber={setSoundNumber}
            stopTimer={stopTimer}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
