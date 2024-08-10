import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import { useNavigate } from "react-router-dom";

function Notes(props) {
  const context = useContext(noteContext);
  const Router = useNavigate(null);
  const { notes, getnotes, editnote } = context;
  const [note, setnote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "default",
  });

  const handlechange = (e) => {
    setnote((prevNote) => ({
      ...prevNote,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      getnotes();
    } else {
      Router("/login");
    }
  }, []);

  const ref = useRef(null);
  const closeref = useRef(null);

  function updatenote(currnote) {
    setnote({
      id: currnote._id,
      etitle: currnote.title,
      edescription: currnote.description,
      etag: currnote.tag,
    });
    ref.current.click();
  }

  const handleclose = () => {
    editnote(note.id, note.etitle, note.edescription, note.etag);
    props.showAlert("Updated Successfully", "success");
    closeref.current.click();
  };

  return (
    <>
      <div>
        <button
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          ref={ref}
        >
          Launch demo modal
        </button>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Note
                </h5>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">
                      Title
                    </label>
                    <input
                      name="etitle"
                      id="etitle"
                      value={note.etitle}
                      type="text"
                      className="form-control"
                      aria-describedby="emailHelp"
                      onChange={handlechange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">
                      Description
                    </label>
                    <input
                      type="text"
                      value={note.edescription}
                      name="edescription"
                      id="edescription"
                      className="form-control"
                      onChange={handlechange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="etag" className="form-label">
                      Tag
                    </label>
                    <input
                      value={note.etag}
                      type="text"
                      id="etag"
                      name="etag"
                      className="form-control"
                      onChange={handlechange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  ref={closeref}
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleclose}
                >
                  Edit Note
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        {notes.map((item) => (
          <div className="col-md-3" key={item._id}>
            <Noteitem
              note={item}
              showAlert={props.showAlert}
              updatenote={updatenote}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Notes;
