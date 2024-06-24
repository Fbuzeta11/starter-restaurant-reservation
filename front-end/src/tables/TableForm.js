import React from "react";
import { useHistory } from "react-router-dom";

function TableForm({ handleChange, handleSubmit, formData }) {
  const history = useHistory();
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="table_name" className="d-flex flex-column py-3">
        Table Name
        <input
          className="my-2"
          type="text"
          id="table_name"
          name="table_name"
          placeholder="Table Name"
          onChange={handleChange}
          value={formData.table_name}
          required
        />
      </label>
      <label htmlFor="capacity" className="d-flex flex-column py-3">
        Capacity
        <input
          className="my-2"
          type="number"
          id="capacity"
          name="capacity"
          min="1"
          onChange={handleChange}
          value={formData.capacity}
          required
        />
      </label>
      <div>
        <button type="button" onClick={() => history.go(-1)}>
          Cancel
        </button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default TableForm;
