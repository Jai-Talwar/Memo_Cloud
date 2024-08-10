import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

function Noteitem(props) {
  const { note, updatenote, showAlert } = props;
  const { deletenote } = useContext(noteContext);

  return (
    <div className="card my-3">
      <div className="card-body">
        <div className="d-flex align-items-center">
          <h5 className="card-title">{note.title}</h5>
          <i
            className="fa-solid fa-trash mx-2"
            onClick={() => {
              deletenote(note._id);
              showAlert("Note deleted successfully", "success");
            }}
          ></i>

          <i
            className="fa-solid fa-pen-to-square mx-2"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={() => updatenote(note)}
          ></i>
        </div>
        <p className="card-text">{note.description}</p>
      </div>
    </div>
  );
}

export default Noteitem;
