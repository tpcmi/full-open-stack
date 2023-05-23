import { useState, useEffect } from "react";
import axios from 'axios'
import Note from "./components/Note";

const App = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("");
    const [showAll, setShowAll] = useState(true);

    useEffect(() => {
        console.log('effect');
        axios.get('http://localhost:3001/notes').then(res => {
            console.log('promise fullfilled');
            setNotes(res.data)
        })
    }, [])
    
    console.log('render',notes.length,'notes');

    const notesToShow = showAll
        ? notes
        : notes.filter((note) => note.important);

    const addNote = (event) => {
        // 防止提交时页面默认刷新
        event.preventDefault();
        console.log("button clicked", event.target);
        const noteObject = {
            content: newNote,
            important: Math.random() < 0.5,
            id: notes.length + 1,
        };
        // 返回一个新的数组
        setNotes(notes.concat(noteObject));
        setNewNote("");
    };

    const handleNoteChange = (event) => {
        console.log(event.target.value);
        setNewNote(event.target.value);
    };

    return (
        <div>
            <h1>Notes</h1>
            <div>
                <button onClick={()=>setShowAll(!showAll)}>
                    show { showAll ? 'important': 'all'}
                </button>
            </div>
            <ul>
                {notesToShow.map((note) => (
                    <Note key={note.id} note={note} />
                ))}
            </ul>

            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange} />
                <button type="submit">save</button>
            </form>
        </div>
    );
};

export default App;
