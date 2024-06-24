import React from "react";
import Reservation from "./Reservation";
import { updateReservationStatus } from "../utils/api";
import { useHistory } from "react-router-dom";

function Reservations({ loadDashboard, reservations }) {
  const history = useHistory();
  const handleCancellation = async (id) => {
    const abortController = new AbortController();
    try {
      if (
        window.confirm(
          "Do you want to cancel this reservation?\nThis cannot be undone."
        )
      ) {
        await updateReservationStatus(id, "cancelled", abortController.signal);
        if (!loadDashboard) {
          history.go(0);
        } else {
          await loadDashboard();
        }
      }
    } catch (error) {
      console.error(error);
    }
    return () => abortController.abort();
  };

  const rows = reservations.map((reservation) => (
    <Reservation
      key={reservation.reservation_id}
      reservation={reservation}
      handleCancellation={handleCancellation}
    />
  ));

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className="px-3">#</th>
            <th className="px-3">Name</th>
            <th className="px-3">Phone</th>
            <th className="px-3">Date</th>
            <th className="px-3">Time</th>
            <th className="px-3">People</th>
            <th className="px-3">Status</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

export default Reservations;
