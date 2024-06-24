import React from "react";
import { useHistory } from "react-router-dom";
import { today, previous, next } from "../utils/date-time";

function DateChange({ date }) {
  const history = useHistory();
  return (
    <div className="btn-group d-flex" role="group">
      <button
        className="btn btn-secondary mr-2"
        onClick={() => history.push(`/dashboard?date=${previous(date)}`)}
      >
        Previous
      </button>
      <button
        className="btn btn-secondary"
        onClick={() => history.push(`/dashboard?date=${today()}`)}
      >
        &ensp;Today&ensp;
      </button>
      <button
        className="btn btn-secondary ml-2"
        onClick={() => history.push(`/dashboard?date=${next(date)}`)}
      >
        &emsp;Next&emsp;
      </button>
    </div>
  );
}

export default DateChange;
