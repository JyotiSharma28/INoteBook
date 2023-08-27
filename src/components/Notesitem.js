import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

export default function Notesitems(props) {
  const context = useContext(NoteContext);
  const { deleteNote } = context;

  const { note, updateNote } = props;

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">
            {note.title}
          </h5>
          <p className="card-text">
            {note.description}
          </p>
          <p className="card-text">
            {note.tag}
          </p>
          <i
            className="fa fa-trash-o"
            onClick={() => {
              deleteNote(note._id);
              props.showAlert("Deleted successfully", "success");
            }}
          />
          <i
            className="fa fa-edit"
            style={{ marginLeft: "10px" }}
            onClick={() => updateNote(note)}
          />
        </div>
      </div>
    </div>
  );
}
