import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const [notes, setnotes] = useState([]);

  const host = "http://localhost:9000";
  const authToken = localStorage.getItem("authToken");

  async function getnotes() {
    const url = `${host}/api/notes/fetchallnotes`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setnotes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching notes:", error);
      setnotes([]); // Ensure notes is an empty array on error
    }
  }

  async function Addnote(title, description, tag = "personal") {
    const note = { title, description, tag };
    const url = `${host}/api/notes/createnote`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
      body: JSON.stringify(note),
    };
    const response = await fetch(url, options);
    const newNote = await response.json();
    setnotes([...notes, newNote]);
  }

  async function deletenote(id) {
    const url = `${host}/api/notes/deletenote/${id}`;
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
    };
    await fetch(url, options);
    setnotes(notes.filter((note) => note._id !== id));
  }

  const editnote = async (id, title, description, tag) => {
    const url = `${host}/api/notes/updatenote/${id}`;
    const options = {
      method: "PUT",
      headers: {
        "auth-token": authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, tag }),
    };
    const response = await fetch(url, options);
    const updatedNote = await response.json();

    setnotes(notes.map((note) => (note._id === id ? updatedNote : note)));
  };

  return (
    <noteContext.Provider
      value={{ notes, Addnote, deletenote, editnote, getnotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
