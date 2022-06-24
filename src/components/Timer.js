import React, { useState } from 'react';
import { Howl, Howler } from 'howler';
import Bell from '../audioclips/bell-01.mp3';
import Gong from '../audioclips/gong.mp3';
import Duck from '../audioclips/duck.mp3';

function Timer(props) {
  let [seconds, setSeconds] = useState(0);
  let [minutes, setMinutes] = useState(props.minutesPomodoro || 10);
  let [minutesBreak, setMinutesBreak] = useState(props.minutesBreak || 10);
  let [toggleTakingBreak, setToggleTakingBreak] = useState(false);
  let [toggle, setToggle] = useState(false);
  let [timerActive, setTimerActive] = useState(props.timerActive);
  let [startTimer, setStartTimer] = useState();
  let [workingTime, setWorkingTime] = useState(props.workingTime);

  const { Howl, Howler } = require('howler');
  const audioClips = [Bell, Gong, Duck];

  //COUNTDOWN LOGIC
  let countDown = () => {
    if (seconds === 0 && minutes === 0) {
      playSound(audioClips[props.soundNumber]);
      if (toggleTakingBreak) {
        setToggleTakingBreak((toggleTakingBreak = !toggleTakingBreak));
        setMinutes((minutes = props.minutesPomodoro));

        props.setWorkingTime(true);
      } else if (!toggleTakingBreak) {
        setToggleTakingBreak((toggleTakingBreak = !toggleTakingBreak));
        setMinutes((minutes = props.minutesBreak));

        props.setWorkingTime(false);
      }
    } else if (seconds === 0) {
      setSeconds((seconds = 59));
      setMinutes((minutes = minutes - 1));
    } else if (seconds > 0) {
      setSeconds((seconds = seconds - 1));
    }
  };

  //START-PAUSE action
  const timer = () => {
    if (!toggle) {
      setToggle((toggle = !toggle));
      setTimerActive((timerActive = 'START'));
      setStartTimer(setInterval(countDown, 1000));
    } else {
      clearInterval(startTimer);
      setToggle((toggle = !toggle));
      setTimerActive((timerActive = 'RESUME'));
    }
  };

  //RESET BUTTON
  const reset = () => {
    setSeconds(0);
    setTimerActive((timerActive = 'START'));
    if (!toggleTakingBreak) {
      setMinutes(props.minutesPomodoro || 45);
    } else {
      setMinutes(props.minutesBreak || 5);
    }
  };

  //SKIP
  const skip = () => {
    if (toggleTakingBreak) {
      setMinutes(props.minutesPomodoro || 45);
      setSeconds((seconds = 0));
      setToggleTakingBreak((toggleTakingBreak = !toggleTakingBreak));
      setTimerActive((timerActive = 'START'));

      props.setWorkingTime(true);
    } else {
      setMinutes(props.minutesBreak || 5);
      setSeconds((seconds = 0));
      setToggleTakingBreak((toggleTakingBreak = !toggleTakingBreak));
      setTimerActive((timerActive = 'START'));

      props.setWorkingTime(false);
    }
  };
  //AUDIO EFFECT PLAYER
  const playSound = (src) => {
    const sound = new Howl({
      src,
    });

    sound.play();
  };

  Howler.volume(0.5);

  return (
    <div>
      <div className="main-container">
        {seconds.toString().length === 1 ? (
          <h3 className="timer-numbers">{`${minutes}:0${seconds}`}</h3>
        ) : (
          <h3 className="timer-numbers">{`${minutes}:${seconds}`}</h3>
        )}

        {toggle ? (
          <div>
            <p className="buttons" onClick={timer}>
              PAUSE
            </p>
          </div>
        ) : (
          <div>
            <p className="buttons" onClick={timer}>
              {timerActive}
            </p>
            <p className="buttons" onClick={reset}>
              RESET
            </p>
            <p className="buttons" onClick={skip}>
              SKIP
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Timer;
