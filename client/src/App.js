import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([{ title: "", noteText: "" }]);
  const [note, setNote] = useState({ title: "", noteText: "" });

  useEffect(() => {
    fetch("/notes")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonRes) => setNotes(jsonRes));
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  };
  const addNote = (e) => {
    e.preventDefault();
    alert("Note added");
    const newNote = {
      title: note.title,
      noteText: note.noteText,
      id: note._id,
    };
    axios.post("/newnote", newNote);
  };

  const deleteNote = (id) => {
    axios.delete(`/delete/${id}`);
    alert("Note deleted");
  };

  return (
    <div className="App">
      <h1>Add note</h1>
      <form>
        <input onChange={handleChange} name="title" value={note.title}></input>
        <input
          onChange={handleChange}
          name="noteText"
          value={note.noteText}
        ></input>
        <button onClick={addNote}>Add note</button>
      </form>
      {notes.map((note, id) => {
        return (
          <div key={id}>
            <h1>{note.title}</h1>
            <p>{note.noteText}</p>
            <button onClick={() => deleteNote(note._id)}>Delete</button>
            <button>Update</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
