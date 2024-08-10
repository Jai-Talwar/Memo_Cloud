import React from "react";

function Modal(props) {
  //   const { note } = props;
  return (
    <div>
      {/* <button
        className="btn btn-primary"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button> */}

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
              <input type="text" className="form-control" />
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <textarea
              name="decription"
              className="form-control modal-body"
              cols="30"
              rows="10"
            ></textarea>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button type="button" className="btn btn-primary">
                Edit Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
