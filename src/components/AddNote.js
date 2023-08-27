import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";

function AddNote(props) {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleclick = e => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("Added successfully", "success");
  };

  const onChange = e => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h2>Add Note</h2>
      <form>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            aria-describedby="emailHelp"
            placeholder="Enter title"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            placeholder="Description"
            onChange={onChange}
            minLength={5}
            rows={3}
            style={{ resize: "vertical" }}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Tag</label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            placeholder="tag"
            value={note.tag}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>

        <button
          disabled={note.title.length < 5 || note.description.length < 5}
          type="submit"
          className="btn btn-primary"
          onClick={handleclick}
        >
          Add Note
        </button>
      </form>
    </div>
  );
}
export default AddNote;
