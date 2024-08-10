import React from "react";
import Notes from "./Notes";
import Addnote from "./Addnote";
// import Modal from "./Modal";

function Home(props) {
  return (
    <>
      <div>
        <Addnote showAlert={props.showAlert} />
        <div className="container">
          <h2>Your Notes</h2>
          <Notes showAlert={props.showAlert} />
        </div>
      </div>
    </>
  );
}

export default Home;
