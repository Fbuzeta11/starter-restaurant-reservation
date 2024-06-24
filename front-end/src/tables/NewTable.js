import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import TableForm from "./TableForm";

function NewTable() {
  const history = useHistory();
  const initialForm = {
    table_name: "",
    capacity: "",
  };
  const [formData, setFormData] = useState(initialForm);
  const [formErrors, setFormErrors] = useState(null);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    const abortController = new AbortController();
    try {
      event.preventDefault();

      //validation for table form data throws error if does not meet business rules
      if (formData.table_name.length < 2) {
        throw new Error("Table name must be 2 or more characters.");
      }
      if (formData.capacity < 1) {
        throw new Error("Table capacity must be at least 1.");
      }

      const response = await createTable(formData, abortController.signal);
      setFormData(initialForm);
      if (response) {
        history.push("/dashboard");
      }
    } catch (error) {
      setFormErrors(error);
    }
  };

  return (
    <div>
      <h1>New Table</h1>
      <ErrorAlert error={formErrors} />
      <TableForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formData={formData}
      />
    </div>
  );
}

export default NewTable;
