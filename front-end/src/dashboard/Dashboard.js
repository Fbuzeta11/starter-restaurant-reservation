import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import Reservations from "../reservations/Reservations";
import Tables from "../tables/Tables";
import DateChange from "./DateChange";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables(abortController.signal)
      .then(setTables)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  return (
    <main>
      <div className="d-flex flex-column align-items-center">
        <h1 className="m-0">Dashboard</h1>
        <DateChange date={date} />
      </div>
      <ErrorAlert
        error={reservationsError}
        setReservationsError={setReservationsError}
      />
      <div className="d-flex justify-content-around p-4">
        <div>
          <h4 className="mb-2">Reservations for {date}</h4>
          <Reservations
            loadDashboard={loadDashboard}
            reservations={reservations}
            reservationsError={reservationsError}
            setReservationsError={setReservationsError}
          />
        </div>
        <Tables
          loadDashboard={loadDashboard}
          tables={tables}
          setReservationsError={setReservationsError}
        />
      </div>
    </main>
  );
}

export default Dashboard;
