import React from "react";
const Field = ({name, label, value, onChange, placeholder, type = "text"}) =>
    (
        <div className="col mb-3">
            <label htmlFor="nameWithTitle" className="form-label">{label}</label>
            <input
                value={value}
                onChange={onChange}
                type={type}
                placeholder={placeholder}
                name={name}
                id={name}
                className="form-control"

            />
        </div>
    );
  


export default Field;