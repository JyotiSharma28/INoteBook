import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = process.env.REACT_APP_BASE_URL;

  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // GET NOTES
  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      if (response.ok) {
        const json = await response.json();
        setNotes(json);
      } else {
        console.error("Error fetching notes:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // ADD NOTE
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (response.ok) {
        const note = await response.json();
        setNotes([...notes, note]);
      } else {
        console.error("Error adding note:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // DELETE NOTE
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      if (response.ok) {
        const json = await response.json();
        console.log(json);
        const newNotes = notes.filter((note) => note._id !== id);
        setNotes(newNotes);
      } else {
        console.error("Error deleting note:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // EDIT NOTE
  const editNote = async (id, title, description, tag) => {
    try {
      console.log("inside edit note...");
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (response.ok) {
        const json = await response.json();
        console.log(json);

        const updatedNotes = notes.map((note) =>
          note._id === id ? { ...note, title, description, tag } : note
        );

        setNotes(updatedNotes);
      } else {
        console.error("Error editing note:", response.statusText);
      }
    } catch (error) {
      console.error("Error editing note:", error);
    }
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        getNotes,
        addNote,
        deleteNote,
        editNote,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
