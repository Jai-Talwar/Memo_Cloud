import React from "react";
export default function Alert(props) {
  const capital = (word) => {
    if (word === "danger") {
      word = "Error";
    }
    var letter = word.toLowerCase();
    return letter.charAt(0).toUpperCase() + letter.slice(1);
  };
  return (
    props.alert && (
      <div
        className={`alert alert-${props.alert.type} alert-dismissible fade show`}
        role="alert"
      >
        <strong>{capital(props.alert.type)}</strong>: {props.alert.msg}
      </div>
    )
  );
}
