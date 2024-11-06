import React from "react";

const Alert = (props) => {
  const captailise = (text) => {
    const word = text.toLowerCase();
    return word.charAt(0).toUpperCase() + word.slice(1);
  };
  return (
    <>
      <div >
        {props.alert && (
          <div>
            <div
              className={`alert alert-${props.alert.type} alert-dismissible fade show mb-0`}
              role="alert"
            >
              <strong>{captailise(props.alert.type)}:</strong> {props.alert.msg}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Alert;
