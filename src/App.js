import { useState, useEffect } from 'react';

function App() {
  const [content, setContent] = useState(
    'lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, quisquam.'
  );
  const [track, setTrack] = useState(0);
  const [tempState, setTempState] = useState([]);
  const [undoRedoStatus, setUndoRedoStatus] = useState({
    undoDisabled: true,
    redoDisabled: true,
  });

  // first time store content to tempState
  useEffect(() => {
    setContent(content);
    setTempState([content]);
    setUndoRedoStatus({
      undoDisabled: true,
      redoDisabled: true,
    });
  }, []);

  // changing undo redo states

  const handleChange = (event) => {
    setContent(event.target.value);
    setUndoRedoStatus({
      undoDisabled: false,
      redoDisabled: true,
    });
  };
  console.log('=====================');
  console.log(content, tempState, undoRedoStatus, track);
  console.log('=====================');

  const onBlur = (event) => {
    const value = event.target.value;
    if (content === tempState[tempState.length - 1]) return;
    setTempState([...tempState, value]);
    setTrack(tempState.length);
    console.log('gg', tempState.length);
  };

  const redo = () => {
    if (track === tempState.length) return;
    setTrack(track + 1);
    setContent(tempState[track + 1]);
    setUndoRedoStatus((prevState) => ({
      ...prevState,
      undoDisabled: false,
    }));

    if (track === tempState.length - 2) {
      setUndoRedoStatus((prevState) => ({
        ...prevState,
        redoDisabled: true,
      }));
    }
  };
  const undo = () => {
    if (track === 0) {
      return;
    }
    setTrack(track - 1);
    console.log('from this com', undoRedoStatus);
    if (0 === track - 1) {
      setUndoRedoStatus({
        ...undoRedoStatus,
        undoDisabled: true,
        redoDisabled: false,
      });
    } else {
      setUndoRedoStatus((prevState) => ({
        ...prevState,
        redoDisabled: false,
      }));
    }

    setContent(tempState[track - 1]);
  };
  return (
    <div className='App'>
      <button onClick={undo} disabled={undoRedoStatus.undoDisabled}>
        undo
      </button>
      <button onClick={redo} disabled={undoRedoStatus.redoDisabled}>
        redo
      </button>
      <br />
      <textarea
        value={content}
        onChange={handleChange}
        onBlur={onBlur}
        id='w3review'
        name='w3review'
        rows='4'
        cols='50'
      ></textarea>
    </div>
  );
}

export default App;
