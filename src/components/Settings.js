import { useEffect } from 'react';

function Settings(props) {
  const saveChanges = () => {
    console.log('clicked');
    props.stopTimer();
    props.setShowModal(!props.showModal);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      props.setShowModal(!props.showModal);
    }
  };

  const handleChangeSound = (e) => {
    props.setSoundNumber(parseInt(e.target.value));
  };
  const handleChangePreset = (e) => {
    if (e.target.value === 'long') {
      props.setMinutesBreak(15);
      props.setMinutesPomodoro(45);
    } else if (e.target.value === 'short') {
      props.setMinutesBreak(5);
      props.setMinutesPomodoro(55);
    }
  };

  return (
    <div>
      <form>
        <label className="buttons-inverted">POMODORO DURATION</label>
        <input
          name="minutesPomodoro"
          value={props.minutesPomodoro}
          onChange={(e) => props.setMinutesPomodoro(parseInt(e.target.value))}
        />
        <br />
        <label className="buttons-inverted ">BREAK DURATION</label>
        <input
          name="minutesBreak"
          value={props.minutesBreak}
          onChange={(e) => props.setMinutesBreak(parseInt(e.target.value))}
        />
        <br />
        {/* <label className="buttons-inverted">AUTOSTART</label> */}
        {/* <input type="checkbox"></input> */}
        <br />
        <label className="buttons-inverted">SOUND</label>
        <select onChange={handleChangeSound} value={props.soundNumber}>
          <option value="0">Bell</option>
          <option value="1">Gong</option>
          <option value="2">Duck</option>
        </select>
        <br />
        <label className="buttons-inverted">PRESETS</label>
        <select onChange={handleChangePreset}>
          <option value="">select</option>
          <option value="long">Long Break</option>
          <option value="short">Short Break</option>
        </select>
        <br />
      </form>
      <button onClick={saveChanges}>SAVE CHANGES</button>
    </div>
  );
}

export default Settings;
