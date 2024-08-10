// import React, { useContext, useState } from "react";
// import noteContext from "../context/notes/noteContext";

// const Addnote = () => {
//   let context = useContext(noteContext);
//   let { Addnote } = context;
//   const [note, setnote] = useState({
//     title: "",
//     description: "",
//     tag: "",
//   });
//   const handleclick = (e) => {
//     e.preventDefault();
//     Addnote(note.title, note.description, note.tag);
//   };
//   const onchange = (e) => {
//     setnote({ ...note, [e.target.name]: e.target.value });
//   };
//   return (
//     <div>
//       <div className="container">
//         <h2>Add Notes</h2>
//         <form>
//           <div className="mb-3">
//             <label htmlFor="title" className="form-label">
//               Title
//             </label>
//             <input
//               name="title"
//               id="title"
//               type="text"
//               className="form-control"
//               aria-describedby="emailHelp"
//               onChange={onchange}
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="description" className="form-label">
//               Description
//             </label>
//             <input
//               type="text"
//               name="description"
//               id="description"
//               className="form-control"
//               onChange={onchange}
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="tag" className="form-label">
//               Tag
//             </label>
//             <input
//               type="text"
//               name="tag"
//               className="form-control"
//               onChange={onchange}
//             />
//           </div>
//           <button
//             disabled={note.title.length < 3 || note.description.length < 5}
//             type="submit"
//             className="btn btn-primary"
//             onClick={handleclick}
//           >
//             Add Note
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Addnote;
import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const Addnote = ({ showAlert }) => {
  const context = useContext(noteContext);
  const { Addnote } = context;
  const [note, setnote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleclick = async (e) => {
    e.preventDefault();
    try {
      await Addnote(note.title, note.description, note.tag);
      setnote({ title: "", description: "", tag: "" });
      showAlert("Note added successfully", "success");
    } catch (error) {
      showAlert("Failed to add note", "danger");
    }
  };

  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="container">
        <h2>Add Notes</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              name="title"
              id="title"
              type="text"
              className="form-control"
              value={note.title}
              onChange={onchange}
              minLength={3}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              name="description"
              id="description"
              className="form-control"
              value={note.description}
              onChange={onchange}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              name="tag"
              className="form-control"
              value={note.tag}
              onChange={onchange}
            />
          </div>
          <button
            disabled={note.title.length < 3 || note.description.length < 5}
            type="submit"
            className="btn btn-primary"
            onClick={handleclick}
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addnote;
